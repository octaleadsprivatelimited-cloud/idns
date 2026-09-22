import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Radio, ChevronDown, Flame, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/search/SearchModal";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { useCategories } from "@/hooks/useCategories";
import { useCategoryDisplayOrder } from "@/hooks/useCategoryDisplayOrder";
import { sortCategoriesByDisplayOrder } from "@/lib/categoryOrder";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: categoriesRaw = [] } = useCategories();
  const { data: displayOrder = [] } = useCategoryDisplayOrder();
  
  const categories = useMemo(
    () => sortCategoriesByDisplayOrder(categoriesRaw, displayOrder.length ? displayOrder : undefined),
    [categoriesRaw, displayOrder]
  );

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const toggleMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  }, []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
        setIsMenuOpen(false);
      }
      if (e.key === "Escape" && isMenuOpen) {
        e.preventDefault();
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const todayStr = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const trendingTopics = [
    "Asian Games 2026",
    "Breaking News",
    "Mahindra Thar OG",
    "Stock Markets",
    "Elections",
    "AI News",
    "Health",
  ];

  return (
    <>
      {/* Topmost Brand & Date Bar (Times Now Top Tier) - Light & Clean */}
      <div className="bg-slate-100 text-slate-600 text-[11px] font-sans border-b border-slate-200 hidden md:block">
        <div className="container max-w-7xl mx-auto flex items-center justify-between h-8 px-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-800 tracking-wide uppercase text-[10px]">
              EDITION: <span className="text-blue-700 font-bold">INDIA</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">{todayStr}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-slate-800 font-medium hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1">
                <Radio className="h-3 w-3 text-blue-600" /> LIVE TV
              </span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <Globe className="h-3 w-3 text-blue-600" />
              <GoogleTranslate />
            </div>
          </div>
        </div>
      </div>

      {/* Main Times Now Navigation Bar - White Background */}
      <header className="sticky top-0 z-[100] w-full transition-all duration-200 bg-white text-slate-900 shadow-sm border-b border-slate-200">
        {/* Main Logo & Action Bar */}
        <div className="container max-w-7xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-800 hover:bg-slate-100 hover:text-blue-600 md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6 text-slate-800" /> : <Menu className="h-6 w-6 text-slate-800" />}
            </Button>

            {/* Times Now Style Iconic Badge Logo with I D N S - Blue Palette */}
            <Link to="/" className="flex items-center gap-2 group select-none">
              <div className="bg-blue-600 text-white px-2.5 py-1 rounded font-black tracking-widest text-lg md:text-xl font-sans shadow-sm flex items-center">
                <span>IDNS</span>
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-lg md:text-xl font-black uppercase tracking-wider text-slate-900 group-hover:text-blue-600 transition-colors font-display">
                  I D N S
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  NEWS NETWORK
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 overflow-x-auto scrollbar-none py-1">
            <Link
              to="/"
              className="px-2.5 py-1 text-[13px] font-bold tracking-wide uppercase text-slate-900 hover:text-blue-600 hover:bg-blue-50 rounded transition-all whitespace-nowrap"
            >
              Home
            </Link>
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="px-2.5 py-1 text-[13px] font-bold tracking-wide uppercase text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-all whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons (Live TV, Search, Translate) */}
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <GoogleTranslate />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={openSearch}
              className="h-8 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-blue-600 px-3 flex items-center gap-2 text-xs rounded-full shadow-sm"
            >
              <Search className="h-3.5 w-3.5 text-blue-600" />
              <span className="hidden sm:inline">Search News...</span>
            </Button>
          </div>
        </div>

        {/* Secondary Category / Ticker Bar (Subnav) - Clean White/Light Slate with Blue Accent */}
        <div className="bg-slate-50 border-t border-slate-200 hidden md:block">
          <div className="container max-w-7xl mx-auto flex items-center h-9 px-4 gap-3 text-xs overflow-hidden">
            <div className="flex items-center gap-1 text-blue-600 font-bold uppercase shrink-0 tracking-wider text-[11px]">
              <Flame className="h-3.5 w-3.5 text-blue-600 fill-blue-600" />
              <span>TRENDING:</span>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto scrollbar-none text-slate-700 font-medium whitespace-nowrap py-1">
              {trendingTopics.map((topic, i) => (
                <span
                  key={i}
                  onClick={openSearch}
                  className="hover:text-blue-600 cursor-pointer transition-colors hover:underline"
                >
                  #{topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu - Light/White */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[120] md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden
          />
          <div
            className={cn(
              "absolute top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white text-slate-900 z-[130] overflow-y-auto p-5 shadow-2xl flex flex-col justify-between"
            )}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 text-white px-2 py-0.5 rounded font-black text-lg">
                    IDNS
                  </div>
                  <span className="font-black text-slate-900 text-base tracking-wider uppercase font-display">
                    I D N S NEWS
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMenu}
                  className="text-slate-500 hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-4">
                <Button
                  onClick={() => {
                    closeMenu();
                    openSearch();
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-left justify-start text-xs text-slate-700 gap-2 border border-slate-200"
                >
                  <Search className="h-4 w-4 text-blue-600" />
                  Search articles, topics...
                </Button>
              </div>

              <nav className="space-y-1">
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-2 py-1">
                  CATEGORIES
                </div>
                <Link
                  to="/"
                  className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                  onClick={closeMenu}
                >
                  TOP STORIES / HOME
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    {category.name}
                  </Link>
                ))}

                <div className="border-t border-slate-200 my-4" />

                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1">
                  COMPANY & LEGAL
                </div>
                {[
                  { to: "/about", label: "About Us" },
                  { to: "/contact", label: "Contact Us" },
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms & Conditions" },
                  { to: "/disclaimer", label: "Disclaimer" },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="block px-3 py-1.5 text-xs text-slate-600 hover:text-blue-600 transition-colors"
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-400 text-center">
              © {new Date().getFullYear()} I D N S News Network
            </div>
          </div>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
