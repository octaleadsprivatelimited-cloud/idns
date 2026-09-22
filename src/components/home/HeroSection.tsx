import { Link } from "react-router-dom";
import { Clock, TrendingUp, ChevronRight, Flame } from "lucide-react";
import type { PublicArticle } from "@/hooks/usePublicArticles";

interface HeroSectionProps {
  leadArticle?: PublicArticle;
  secondLead?: PublicArticle;
  topNews: PublicArticle[];
  wireNews: PublicArticle[];
}

const placeholder = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop";

export function HeroSection({ leadArticle, secondLead, topNews, wireNews }: HeroSectionProps) {
  if (!leadArticle) return null;

  return (
    <section className="bg-white py-6 border-b border-gray-200 font-sans">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Times Now 3-Column Layout: Left (Live Wire), Center (Big Lead Story), Right (Opinion/Trends) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Top Stories Wire (3 cols on Desktop) */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-4 divide-y divide-gray-200">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-blue-600">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                LATEST HEADLINES
              </h3>
            </div>

            {wireNews.slice(0, 5).map((article, i) => (
              <div key={article.id} className="pt-3 group">
                {article.category && (
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
                    {article.category.name}
                  </span>
                )}
                <Link
                  to={`/article/${article.id}`}
                  className="font-bold text-[13px] leading-snug text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-3"
                >
                  {article.title}
                </Link>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{article.reading_time || 2}m read</span>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column: Big Lead Story + Secondary Grid (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-5">
            {/* Primary Massive Headline Banner */}
            <article className="group relative overflow-hidden rounded bg-slate-900 shadow-md">
              <Link to={`/article/${leadArticle.id}`} className="block relative">
                <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={leadArticle.featured_image || placeholder}
                    alt={leadArticle.featured_image_alt || leadArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                    loading="eager"
                  />
                </div>
                {/* Gradient shadow overlay for headline */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  {leadArticle.category && (
                    <span className="bg-blue-600 text-white font-extrabold uppercase text-[10px] px-2 py-0.5 rounded tracking-wider inline-block mb-2">
                      {leadArticle.category.name}
                    </span>
                  )}
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-black leading-tight text-white group-hover:text-blue-300 transition-colors font-display line-clamp-3">
                    {leadArticle.title}
                  </h1>
                  {leadArticle.excerpt && (
                    <p className="text-gray-300 text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed hidden sm:block">
                      {leadArticle.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </article>

            {/* Sub-grid: 2 Stories Under Lead */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondLead && (
                <div className="group border-b sm:border-b-0 sm:border-r border-gray-200 pr-0 sm:pr-4 pb-4 sm:pb-0">
                  <Link to={`/article/${secondLead.id}`} className="block">
                    <div className="aspect-[16/10] rounded overflow-hidden mb-2 bg-gray-100">
                      <img
                        src={secondLead.featured_image || placeholder}
                        alt={secondLead.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {secondLead.category && (
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
                        {secondLead.category.name}
                      </span>
                    )}
                    <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {secondLead.title}
                    </h3>
                  </Link>
                </div>
              )}

              {topNews[0] && (
                <div className="group">
                  <Link to={`/article/${topNews[0].id}`} className="block">
                    <div className="aspect-[16/10] rounded overflow-hidden mb-2 bg-gray-100">
                      <img
                        src={topNews[0].featured_image || placeholder}
                        alt={topNews[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {topNews[0].category && (
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
                        {topNews[0].category.name}
                      </span>
                    )}
                    <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {topNews[0].title}
                    </h3>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Trending News & Visual Cards (3 cols) */}
          <div className="lg:col-span-3 order-3 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-blue-600">
              <div className="flex items-center gap-1.5 font-extrabold text-sm uppercase tracking-wider text-slate-900">
                <Flame className="h-4 w-4 text-blue-600 fill-blue-600" />
                <span>TRENDING NOW</span>
              </div>
            </div>

            <div className="space-y-4">
              {topNews.slice(1, 5).map((article, idx) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="flex gap-3 group items-start border-b border-gray-100 pb-3"
                >
                  <span className="font-black text-2xl text-slate-300 group-hover:text-blue-600 transition-colors shrink-0 w-6">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    {article.category && (
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
                        {article.category.name}
                      </span>
                    )}
                    <h4 className="font-bold text-xs leading-snug text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}