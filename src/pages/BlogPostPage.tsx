import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPostBySlug, getPosts, getFeaturedImageUrl,
  getPostCategories, getPostTags, stripHtml,
  formatDate, decodeEntities, type WPPost,
} from '../lib/wpi';

// ─── Content processor ────────────────────────────────────────────────────────

interface ProcessedContent {
  html: string;
  faqs: { q: string; a: string }[];
}

function processContent(raw: string): ProcessedContent {
  // 1. Fix http → https for WordPress media
  let html = raw.replace(/http:\/\/alicatechnologies\.com\//g, 'https://alicatechnologies.com/');

  // 2. Remove embedded JSON-LD scripts (we inject our own)
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '');

  // 3. Remove Getty Images embed widgets (they require external JS that won't run in React)
  //    These produce "Embed from Getty Images" anchor text with a JS widget
  html = html.replace(/<a[^>]*class="gie-[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');
  html = html.replace(/<script[^>]*>\s*window\.gie[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script[^>]*embed-cdn\.gettyimages\.com[^>]*><\/script>/gi, '');
  html = html.replace(/<script[^>]*gettyimages\.com[\s\S]*?<\/script>/gi, '');

  // 4. Extract & remove FAQ section using DOMParser
  const faqs: { q: string; a: string }[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Find "Frequently asked questions" heading (any level, case-insensitive)
  const faqHeading = Array.from(doc.querySelectorAll('h2, h3')).find((el) =>
    /frequently asked questions/i.test(el.textContent || ''),
  );

  if (faqHeading) {
    const toRemove: Element[] = [faqHeading];
    let node: Element | null = faqHeading.nextElementSibling;

    while (node) {
      // Stop at the next major heading
      if (node.tagName === 'H2') break;

      if (node.tagName === 'H3') {
        const q = node.textContent?.trim() || '';
        const h3El = node;                          // capture before moving node
        const nextEl = node.nextElementSibling;

        toRemove.push(h3El);                        // ← remove the h3 itself

        if (nextEl && nextEl.tagName === 'P') {
          const a = nextEl.innerHTML.trim();
          if (q) faqs.push({ q, a });
          toRemove.push(nextEl);                    // remove the answer <p>
          node = nextEl.nextElementSibling;
        } else {
          if (q) faqs.push({ q, a: '' });
          node = h3El.nextElementSibling;
        }
      } else {
        // Any other element after FAQ heading (p, script remnants, etc.)
        toRemove.push(node);
        node = node.nextElementSibling;
      }
    }

    toRemove.forEach((el) => el?.parentNode?.removeChild(el));
    html = doc.body.innerHTML;
  }

  return { html, faqs };
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const PostSkeleton = () => (
  <div className="animate-pulse min-h-screen">
    <div className="h-[60vh] bg-gray-200 w-full" />
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 space-y-4">
        <div className="h-3 bg-gray-200 rounded w-1/5" />
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`h-3 bg-gray-200 rounded ${i % 4 === 3 ? 'w-4/5' : 'w-full'}`} />
        ))}
      </div>
      <div className="lg:col-span-4 space-y-4">
        <div className="h-28 bg-gray-200 rounded-[10px]" />
        <div className="h-48 bg-gray-200 rounded-[10px]" />
        <div className="h-36 bg-gray-200 rounded-[10px]" />
      </div>
    </div>
  </div>
);

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

const FaqSection = ({ faqs }: { faqs: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(null);
  if (!faqs.length) return null;

  return (
    <div className="mt-12 mb-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-7 rounded-full bg-[#006828]" />
        <h2 className="text-2xl font-bold font-montserrat text-[#0d3b2e] tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="divide-y divide-gray-100 border border-gray-100 rounded-[12px] overflow-hidden shadow-sm">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`transition-colors duration-200 ${isOpen ? 'bg-[#f0fdf4]' : 'bg-white hover:bg-gray-50/80'}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
              >
                <span className="flex items-start gap-3 flex-1 min-w-0">
                  <span
                    className={`mt-0.5 shrink-0 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center transition-all duration-200
                    ${isOpen ? 'bg-[#006828] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-[#006828] group-hover:text-white'}`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`font-semibold text-base leading-snug transition-colors duration-200 font-montserrat
                    ${isOpen ? 'text-[#006828]' : 'text-[#0d3b2e]'}`}
                  >
                    {faq.q}
                  </span>
                </span>
                <span
                  className={`shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
                  ${isOpen ? 'bg-[#006828] rotate-180' : 'bg-gray-100 rotate-0'}`}
                >
                  <svg
                    width="10" height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isOpen ? 'white' : '#6b7280'}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div
                  className="px-6 pb-6 pl-[60px] text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none
                    prose-a:text-[#006828] prose-a:font-semibold prose-strong:text-[#0d3b2e]"
                  dangerouslySetInnerHTML={{ __html: faq.a }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Related Card ─────────────────────────────────────────────────────────────

const RelatedCard = ({ post, onClick }: { post: WPPost; onClick: () => void }) => {
  const imageUrl = getFeaturedImageUrl(post, 'medium');
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 80) + '…';

  return (
    <article
      onClick={onClick}
      className="group flex gap-3 cursor-pointer p-3 rounded-[8px] hover:bg-gray-50 transition-all duration-200"
    >
      <div className="w-16 h-14 shrink-0 rounded-[6px] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img src={imageUrl} alt={title} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0d3b2e] to-[#006828]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-[#0d3b2e] group-hover:text-[#006828] transition-colors leading-snug line-clamp-2 font-montserrat">
          {title}
        </h4>
        <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">{excerpt}</p>
      </div>
    </article>
  );
};

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

const injectSchema = (post: WPPost, faqs: { q: string; a: string }[]) => {
  document.getElementById('wp-article-schema')?.remove();
  const imageUrl = getFeaturedImageUrl(post, 'full');
  const categories = getPostCategories(post);

  const graph: object[] = [{
    '@type': 'Article',
    headline: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt.rendered).slice(0, 300),
    datePublished: post.date,
    dateModified: post.date,
    image: imageUrl ? [imageUrl] : undefined,
    articleSection: categories[0]?.name,
    publisher: {
      '@type': 'Organization',
      name: 'Alica Technologies LLP',
      logo: { '@type': 'ImageObject', url: 'https://alicatechnologies.com/Alica-green.svg' },
    },
    author: { '@type': 'Organization', name: 'Alica Technologies LLP' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${window.location.origin}/${post.slug}` },
  }];

  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: stripHtml(a) },
      })),
    });
  }

  const el = document.createElement('script');
  el.id = 'wp-article-schema';
  el.type = 'application/ld+json';
  el.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  document.head.appendChild(el);
};

const updateMetaTags = (post: WPPost) => {
  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).slice(0, 160) + '...';
  const imageUrl = getFeaturedImageUrl(post, 'full') || 'https://alicatechnologies.com/Alica-green.svg';
  const url = typeof window !== 'undefined' ? `${window.location.origin}/${post.slug}` : '';

  document.title = `${title} | Alica Technologies LLP`;

  const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
    if (typeof document === 'undefined') return;
    const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
    let el = document.querySelector<HTMLMetaElement>(selector);
    if (!el) {
      el = document.createElement('meta');
      if (isProperty) el.setAttribute('property', nameOrProperty);
      else el.setAttribute('name', nameOrProperty);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  setMeta('description', description);
  setMeta('og:title', `${title} | Alica Technologies LLP`, true);
  setMeta('og:description', description, true);
  setMeta('og:image', imageUrl, true);
  setMeta('og:url', url, true);
  setMeta('og:type', 'article', true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', `${title} | Alica Technologies LLP`);
  setMeta('twitter:description', description);
  setMeta('twitter:image', imageUrl);

  if (typeof document !== 'undefined' && url) {
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<WPPost | null>(null);
  const [processed, setProcessed] = useState<ProcessedContent | null>(null);
  const [related, setRelated] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!slug) return;

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setNotFound(false);
    setPost(null);
    setProcessed(null);
    setRelated([]);

    getPostBySlug(slug, ctrl.signal)
      .then(async (data) => {
        if (ctrl.signal.aborted) return;
        if (!data) { setNotFound(true); setLoading(false); return; }

        const result = processContent(data.content.rendered);
        setPost(data);
        setProcessed(result);
        setLoading(false);

        // SEO and Meta tags
        updateMetaTags(data);
        injectSchema(data, result.faqs);

        // Related posts (non-blocking)
        getPosts(1, 4).then(({ posts: all }) => {
          if (!ctrl.signal.aborted) setRelated(all.filter((p) => p.id !== data.id).slice(0, 3));
        }).catch(() => {});
      })
      .catch((err) => {
        if ((err as Error).name === 'AbortError' || ctrl.signal.aborted) return;
        setNotFound(true);
        setLoading(false);
      });

    return () => {
      abortRef.current?.abort();
      document.getElementById('wp-article-schema')?.remove();
    };
  }, [slug]);

  if (loading) return <PostSkeleton />;

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-[#0d3b2e] font-montserrat">404</h1>
          <p className="text-gray-500 text-lg">This article could not be found.</p>
          <button onClick={() => navigate('/blogs')}
            className="mt-4 inline-flex items-center gap-2 bg-[#006828] text-white font-bold px-6 py-3 rounded-[6px] text-sm hover:bg-[#0d3b2e] transition-colors">
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  if (!post || !processed) return null;

  const title = stripHtml(post.title.rendered);
  const imageUrl = getFeaturedImageUrl(post, 'full');
  const categories = getPostCategories(post);
  const tags = getPostTags(post);
  const author = post._embedded?.author?.[0];

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[65vh] flex flex-col justify-end bg-[#0d3b2e] overflow-hidden"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        {/* Multi-layer gradient: strong at bottom for text legibility, gentle at top for navbar */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50" />
        {/* Top-left tinted overlay gives depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d3b2e]/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="bg-[#ffc82e] text-[#0d3b2e] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm hover:bg-white hover:text-[#0d3b2e] transition-all duration-200 cursor-pointer"
              >
                {decodeEntities(cat.name)}
              </button>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat tracking-tight text-white leading-tight max-w-4xl drop-shadow-lg mb-5">
            {title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-white/75 text-sm">
            {author && (
              <span className="flex items-center gap-2">
                {author.avatar_urls?.['48'] && (
                  <img src={author.avatar_urls['48']} alt={author.name}
                    className="w-8 h-8 rounded-full border-2 border-white/40 shadow" />
                )}
                <span className="font-semibold text-white/90">{author.name}</span>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatDate(post.date)}
            </span>
          </div>
        </div>
      </section>

      {/* ── Content + Sidebar ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Left: Article (scrolls freely) ── */}
          <article className="lg:col-span-8 min-w-0">


            {/* WordPress rendered content */}
            <div
              className="wp-content prose prose-lg max-w-none
                prose-headings:font-montserrat prose-headings:text-[#0d3b2e] prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base prose-p:mb-5
                prose-a:text-[#006828] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#0d3b2e] prose-strong:font-bold
                prose-ul:space-y-2 prose-ul:text-gray-700 prose-ul:pl-5
                prose-ol:space-y-2 prose-ol:text-gray-700 prose-ol:pl-5
                prose-li:leading-relaxed
                prose-table:text-sm prose-table:w-full prose-table:border-collapse
                prose-th:bg-[#f0fdf4] prose-th:text-[#0d3b2e] prose-th:font-bold prose-th:px-4 prose-th:py-3 prose-th:border prose-th:border-gray-200 prose-th:text-left
                prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-gray-200 prose-td:align-top
                prose-img:rounded-[10px] prose-img:shadow-md prose-img:w-full prose-img:my-6 prose-img:block
                prose-figure:my-8 prose-figcaption:text-center prose-figcaption:text-xs prose-figcaption:text-gray-400 prose-figcaption:mt-2
                prose-blockquote:border-l-4 prose-blockquote:border-[#006828] prose-blockquote:bg-[#f0fdf4] prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-[6px] prose-blockquote:not-italic prose-blockquote:text-[#0d3b2e]"
              dangerouslySetInnerHTML={{ __html: processed.html }}
            />

            {/* FAQ accordion */}
            <FaqSection faqs={processed.faqs} />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tagged in</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => navigate(`/tags/${tag.slug}`)}
                      className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full hover:bg-[#f0fdf4] hover:text-[#006828] transition-colors cursor-pointer"
                    >
                      #{decodeEntities(tag.name)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-12 bg-gradient-to-br from-[#0d3b2e] to-[#006828] rounded-[10px] p-8 text-white text-center">
              <h3 className="text-xl font-bold font-montserrat mb-2">Looking for a reliable EMS partner?</h3>
              <p className="text-white/80 text-sm mb-5">Get a quote for PCB assembly, turnkey manufacturing, or prototype builds.</p>
              <button onClick={() => navigate('/contact')}
                className="bg-[#ffc82e] hover:bg-[#ffd34f] text-[#0d3b2e] font-bold px-6 py-2.5 rounded-[6px] text-sm tracking-wide transition-all hover:shadow-lg">
                Get in Touch
              </button>
            </div>
          </article>

          {/* ── Right: Sidebar — always visible while scrolling ── */}
          <aside className="lg:col-span-4 lg:self-start lg:sticky lg:top-24 space-y-5">

            {/* Share */}
            <div className="bg-[#f8faf9] rounded-[10px] p-5 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Share this article</p>
              <div className="flex gap-2">
                {[
                  { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, color: '#0a66c2' },
                  { label: 'Twitter', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`, color: '#1d9bf0' },
                  { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + window.location.href)}`, color: '#25d366' },
                ].map(({ label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-bold py-2 rounded-[6px] text-white transition-all hover:opacity-90 hover:shadow-md"
                    style={{ backgroundColor: color }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="bg-white rounded-[10px] border border-gray-100 p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">More Articles</p>
                <div className="space-y-1">
                  {related.map((rp) => (
                    <RelatedCard key={rp.id} post={rp} onClick={() => navigate(`/${rp.slug}`)} />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-[#0d3b2e] rounded-[10px] p-6 text-white space-y-3">
              <h4 className="font-bold text-base font-montserrat">Need a manufacturing quote?</h4>
              <p className="text-white/70 text-xs leading-relaxed">
                Alica Technologies LLP specialises in PCB assembly, testing, and turnkey EMS projects.
              </p>
              <button onClick={() => navigate('/contact')}
                className="w-full bg-[#ffc82e] hover:bg-[#ffd34f] text-[#0d3b2e] font-bold py-2.5 rounded-[6px] text-sm tracking-wide transition-all">
                Contact Us
              </button>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};
