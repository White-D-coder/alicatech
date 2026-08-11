export const Blogs = () => {
  const posts = [
    {
      id: 1,
      title: 'Who is the best EMS Provider in India ?',
      excerpt: 'In this post I will show you who is the best EMS',
      image: '/blog-1.png',
      href: '#blog-1',
    },
    {
      id: 2,
      title: 'What is EMS?',
      excerpt: 'If you are a product company, OEM, or startup building an electronic',
      image: '/blog-2.png',
      href: '#blog-2',
    },
    {
      id: 3,
      title: 'How to Choose a PCB Assembly partner? (Checklist)',
      excerpt: 'Most RFQs for PCB assembly are decided on price and lead time',
      image: '/blog-3.png',
      href: '#blog-3',
    },
  ];

  return (
    <section id="blog" className="py-20 lg:py-20 bg-white bg-grid-lines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d3b2e] tracking-tight">
            Blogs
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            As a partner of corporates, Alica has more than 9,000 partners of all sizes and all potential of session.
          </p>
        </div>

        {/* 3 Blog Cards Grid - 10px border radius */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-[10px] border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Image Container - 10px top border radius */}
                <div className="relative aspect-16/10 overflow-hidden bg-gray-100 rounded-t-[10px]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-t-[10px]"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-[#006828] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Continue Reading Link */}
              <div className="px-6 pb-6 pt-2">
                <a
                  href={post.href}
                  className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-[#0d3b2e] hover:text-[#006828] transition-colors group/link"
                >
                  <span className="w-6 h-0.5 bg-[#0d3b2e] group-hover/link:w-8 transition-all duration-200" />
                  <span>CONTINUE READING</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
