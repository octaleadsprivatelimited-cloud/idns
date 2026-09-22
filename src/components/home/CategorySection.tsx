import { memo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Clock } from "lucide-react";
import type { PublicArticle } from "@/hooks/usePublicArticles";

interface CategorySectionProps {
  category: {
    id: string;
    name: string;
    slug: string;
    color?: string | null;
  };
  articles: PublicArticle[];
}

const placeholderImage = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=320&fit=crop";

function CategorySectionComponent({ category, articles }: CategorySectionProps) {
  if (articles.length === 0) return null;

  const lead = articles[0];
  const others = articles.slice(1, 5);

  return (
    <section className="py-8 border-b border-gray-200 bg-white font-sans">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header with Vibrant Blue Flag */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-blue-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-blue-600 inline-block rounded-sm"></span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight font-display">
              <Link to={`/category/${category.slug}`} className="hover:text-blue-600 transition-colors">
                {category.name}
              </Link>
            </h2>
          </div>
          <Link
            to={`/category/${category.slug}`}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            VIEW ALL <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Times Now Category Layout: Featured Card on Left + 3-4 Grid Items on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Big Featured Item */}
          {lead && (
            <div className="lg:col-span-5 group">
              <Link to={`/article/${lead.id}`} className="block">
                <div className="aspect-[16/10] overflow-hidden rounded mb-3 bg-gray-100 shadow-sm">
                  <img
                    src={lead.featured_image || placeholderImage}
                    alt={lead.featured_image_alt || lead.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-extrabold text-base md:text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-snug font-display line-clamp-2">
                  {lead.title}
                </h3>
                {lead.excerpt && (
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {lead.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{lead.reading_time || 2}m read</span>
                </div>
              </Link>
            </div>
          )}

          {/* Right Sub-grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {others.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="group flex gap-3 items-start p-2 rounded hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100"
              >
                <div className="w-24 sm:w-28 aspect-[4/3] rounded overflow-hidden shrink-0 bg-gray-100 shadow-xs">
                  <img
                    src={article.featured_image || placeholderImage}
                    alt={article.featured_image_alt || article.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-3 group-hover:text-blue-600 transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{article.reading_time || 2}m read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const CategorySection = memo(CategorySectionComponent);
