import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, getFeaturedImageUrl, getPostCategories, stripHtml, formatDate, decodeEntities, type WPPost } from '../lib/wpi';

const BlogSkeleton = () => (
  <div className="bg-white rounded-[10px] border border-gray-100 overflow-hidden shadow-xs flex flex-col animate-pulse">
    <div className="aspect-[16/10] bg-gray-200 rounded-t-[10px]" />
    <div className="p-6 space-y-3 flex-1">
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-5 bg-gray-200 rounded w-full" />
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full mt-2" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
    <div className="px-6 pb-6 pt-2">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
);

interface BlogCardProps {
  post: WPPost;
  onClick: () => void;
}

const BlogCard = ({ post, onClick }: BlogCardProps) => {
  const imageUrl = getFeaturedImageUrl(post, 'liquid-style16-lb');
  const categories = getPostCategories(post);
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 130) + '…';
  const title = stripHtml(post.title.rendered);

  return (
    <article
      className="bg-white rounded-[10px] border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
      onClick={onClick}
    >
      <div className="space-y-0">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 rounded-t-[10px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-t-[10px]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0d3b2e] to-[#006828] flex items-center justify-center">
              <span className="text-white/30 text-4xl font-bold font-montserrat">A</span>
            </div>
          )}
          {/* Category Badge */}
          {categories[0] && (
            <span className="absolute top-3 left-3 bg-[#006828] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {decodeEntities(categories[0].name)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-2">
          <p className="text-xs text-gray-400 font-medium">{formatDate(post.date)}</p>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#006828] transition-colors leading-snug line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed font-normal line-clamp-3">
            {excerpt}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 pt-2">
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#0d3b2e] hover:text-[#006828] transition-colors group/link"
        >
          <span className="w-6 h-0.5 bg-[#0d3b2e] group-hover/link:w-8 group-hover/link:bg-[#006828] transition-all duration-200" />
          <span>CONTINUE READING</span>
        </button>
      </div>
    </article>
  );
};

export const Blogs = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPosts(1, 3)
      .then(({ posts: data }) => {
        if (!cancelled) {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Unable to load posts at the moment.');
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="blog" className="py-20 lg:py-20 bg-white bg-grid-lines">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d3b2e] tracking-tight font-montserrat">
            Latest Insights
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Expert perspectives on electronic manufacturing, PCB assembly, and EMS industry trends.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-12 text-gray-500 text-sm">{error}</div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <BlogSkeleton key={i} />)
            : posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                />
              ))}
        </div>

        {/* View All Button */}
        {!loading && !error && (
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center gap-3 bg-[#0d3b2e] hover:bg-[#006828] text-white font-bold px-8 py-3.5 rounded-[6px] text-sm tracking-wide transition-all duration-200 cursor-pointer hover:shadow-lg"
            >
              View All Articles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
