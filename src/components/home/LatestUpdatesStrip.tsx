import { memo } from "react";
import { Link } from "react-router-dom";
import { Radio, ChevronRight, Zap } from "lucide-react";
import type { PublicArticle } from "@/hooks/usePublicArticles";

interface LatestUpdatesStripProps {
  articles: PublicArticle[];
}

function LatestUpdatesStripComponent({ articles }: LatestUpdatesStripProps) {
  if (!articles.length) return null;

  return (
    <div className="bg-blue-700 text-white border-b border-blue-800 shadow-inner">
      <div className="container max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        {/* Breaking Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-300"></span>
          </span>
          <span className="bg-blue-900/60 px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider flex items-center gap-1 font-sans border border-blue-400/30">
            <Zap className="h-3 w-3 fill-yellow-300 text-yellow-300" />
            BREAKING NEWS
          </span>
        </div>

        {/* Headlines Scroll / Ticker */}
        <div className="flex-1 overflow-x-auto scrollbar-none flex items-center gap-4 text-xs font-semibold whitespace-nowrap">
          {articles.map((article, idx) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="hover:underline flex items-center gap-2 group text-white/95 hover:text-white"
            >
              <span>{article.title}</span>
              {idx < articles.length - 1 && (
                <span className="text-blue-300/50 font-normal">|</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const LatestUpdatesStrip = memo(LatestUpdatesStripComponent);

