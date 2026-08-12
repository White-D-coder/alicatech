import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getPosts, getFeaturedImageUrl, getPostCategories,
  stripHtml, formatDate, decodeEntities, POSTS_PER_PAGE, type WPPost,
  getCategoryBySlug, getTagBySlug,
} from '../lib/wpi';

// ─── Skeleton card ────────────────────────────────────────────────────────────

const CardSkeleton = () => (
  <div className="bg-white rounded-[10px] border border-gray-100 overflow-hidden flex flex-col animate-pulse">
    <div className="aspect-[16/9] bg-gray-200 rounded-t-[10px]" />
    <div className="p-6 flex-1 space-y-3">
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      <div className="h-5 bg-gray-200 rounded w-full" />
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

// ─── Post card ────────────────────────────────────────────────────────────────

const PostCard = ({ post, onClick }: { post: WPPost; onClick: () => void }) => {
  const navigate = useNavigate();
  const imageUrl = getFeaturedImageUrl(post, 'liquid-style16-lb');
  const categories = getPostCategories(post);
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 140) + '…';

  return (
    <article
      onClick={onClick}
      className="group bg-white rounded-[10px] border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 rounded-t-[10px]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0d3b2e] to-[#006828] flex items-center justify-center">
            <span className="text-white/20 text-5xl font-bold font-montserrat">A</span>
          </div>
        )}
        {categories[0] && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/category/${categories[0].slug}`);
            }}
            className="absolute top-3 left-3 bg-[#006828] hover:bg-[#0d3b2e] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors cursor-pointer z-10"
          >
            {decodeEntities(categories[0].name)}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
          <span>{formatDate(post.date)}</span>
        </div>
        <h2 className="text-lg font-bold text-[#0d3b2e] group-hover:text-[#006828] transition-colors leading-snug line-clamp-2 font-montserrat">
          {title}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{excerpt}</p>
        <div className="pt-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#0d3b2e] group-hover:text-[#006828] transition-colors group/link">
            <span className="w-6 h-0.5 bg-current group-hover/link:w-8 transition-all duration-200" />
            READ ARTICLE
          </span>
        </div>
      </div>
    </article>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

export const BlogsPage = () => {
  const navigate = useNavigate();
  const { categorySlug, tagSlug } = useParams<{ categorySlug?: string; tagSlug?: string }>();
  const [activeFilter, setActiveFilter] = useState<{ id: number; name: string; type: 'category' | 'tag' } | null>(null);

  const [posts, setPosts] = useState<WPPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);       // initial load
  const [loadingMore, setLoadingMore] = useState(false); // load more spinner
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const readableSlug = (categorySlug || tagSlug || '')
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const bannerName = activeFilter ? decodeEntities(activeFilter.name) : readableSlug;
  const bannerTitle = categorySlug
    ? `${bannerName || 'Category'} Articles`
    : tagSlug
      ? `Articles Tagged ${bannerName ? `#${bannerName}` : ''}`.trim()
      : 'Blogs & Insights';
  const bannerDescription = categorySlug
    ? `Explore expert perspectives and updates in ${bannerName || 'this category'}.`
    : tagSlug
      ? `Browse articles connected to ${bannerName ? `#${bannerName}` : 'this topic'}.`
      : 'Expert perspectives on PCB assembly, EMS, and electronic manufacturing.';
  const articleCountLabel = activeFilter
    ? `${total} ${activeFilter.type === 'category' ? 'category' : 'tagged'} articles`
    : `${total} articles published`;

  // Update SEO title
  useEffect(() => {
    if (activeFilter) {
      document.title = `${decodeEntities(activeFilter.name)} Articles | Alica Technologies LLP`;
    } else if (categorySlug || tagSlug) {
      document.title = `${readableSlug || 'Articles'} | Alica Technologies LLP`;
    } else {
      document.title = 'Latest Blogs & News | Alica Technologies LLP';
    }
  }, [activeFilter, categorySlug, tagSlug, readableSlug]);

  // Resolve category/tag slug to ID & Name
  useEffect(() => {
    let active = true;
    const resolveFilter = async () => {
      if (categorySlug) {
        setLoading(true);
        setError(null);
        try {
          const cat = await getCategoryBySlug(categorySlug);
          if (!active) return;
          if (cat) {
            setActiveFilter({ id: cat.id, name: cat.name, type: 'category' });
          } else {
            setError('Category not found');
            setLoading(false);
          }
        } catch {
          if (active) {
            setError('Error loading category details');
            setLoading(false);
          }
        }
      } else if (tagSlug) {
        setLoading(true);
        setError(null);
        try {
          const tag = await getTagBySlug(tagSlug);
          if (!active) return;
          if (tag) {
            setActiveFilter({ id: tag.id, name: tag.name, type: 'tag' });
          } else {
            setError('Tag not found');
            setLoading(false);
          }
        } catch {
          if (active) {
            setError('Error loading tag details');
            setLoading(false);
          }
        }
      } else {
        setActiveFilter(null);
      }
    };

    resolveFilter();

    return () => {
      active = false;
    };
  }, [categorySlug, tagSlug]);

  // Fetch a given page and either set or append
  const fetchPage = useCallback(async (pageNum: number, append: boolean) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    if (append) setLoadingMore(true);
    else { setLoading(true); setError(null); }

    try {
      const options: { categories?: number; tags?: number } = {};
      if (activeFilter) {
        if (activeFilter.type === 'category') {
          options.categories = activeFilter.id;
        } else if (activeFilter.type === 'tag') {
          options.tags = activeFilter.id;
        }
      }

      const { posts: data, totalPages: tp, total: t } = await getPosts(
        pageNum,
        POSTS_PER_PAGE,
        options,
        ctrl.signal
      );
      if (ctrl.signal.aborted) return;
      setPosts((prev) => (append ? [...prev, ...data] : data));
      setTotalPages(tp);
      setTotal(t);
      setPage(pageNum);
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setError('Unable to load posts. Please try again.');
    } finally {
      if (!ctrl.signal.aborted) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, [activeFilter]);

  // Fetch page 1 when activeFilter changes (or when it resets to null)
  useEffect(() => {
    if (categorySlug && (!activeFilter || activeFilter.type !== 'category')) return;
    if (tagSlug && (!activeFilter || activeFilter.type !== 'tag')) return;

    setPosts([]);
    setPage(1);
    fetchPage(1, false);

    return () => abortRef.current?.abort();
  }, [activeFilter, categorySlug, tagSlug, fetchPage]);

  const hasMore = page < totalPages;

  return (
    <div className="bg-white min-h-screen">
      <section
        className="relative pt-12 sm:pt-16 pb-16 px-4 flex flex-col items-center justify-between overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/SMT-PCB-Assembly-1.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-6xl font-bold font-montserrat tracking-wider text-white">
              {bannerTitle}
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto font-normal">
              {bannerDescription}
            </p>
            {!loading && total > 0 && (
              <p className="text-white/60 text-sm">{articleCountLabel}</p>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-6">{error}</p>
              <button
                onClick={() => fetchPage(1, false)}
                className="bg-[#006828] text-white px-6 py-2.5 rounded-[6px] text-sm font-bold hover:bg-[#0d3b2e] transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading && posts.length === 0
                  ? Array.from({ length: POSTS_PER_PAGE }).map((_, i) => <CardSkeleton key={i} />)
                  : posts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onClick={() => navigate(`/${post.slug}`)}
                      />
                    ))}

                {/* Inline skeleton rows while loading more */}
                {loadingMore &&
                  Array.from({ length: POSTS_PER_PAGE }).map((_, i) => <CardSkeleton key={`more-${i}`} />)}
              </div>

              {/* Load More */}
              {!loading && hasMore && (
                <div className="mt-14 flex flex-col items-center gap-3">
                  <button
                    onClick={() => fetchPage(page + 1, true)}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-3 bg-[#0d3b2e] hover:bg-[#006828] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-10 py-3.5 rounded-[6px] text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-lg"
                  >
                    {loadingMore ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Loading…
                      </>
                    ) : (
                      <>
                        Load More Articles
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-400">
                    Showing {posts.length} of {total} articles
                  </p>
                </div>
              )}

              {/* All loaded */}
              {!loading && !hasMore && posts.length > 0 && (
                <p className="mt-12 text-center text-xs text-gray-400">
                  You've read it all — {total} articles total.
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};
