import { Link } from "react-router-dom";
import { Mail, ChevronRight, Globe, Radio, ShieldCheck } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useSettings } from "@/hooks/useSettings";

export function Footer() {
  const { data: categories = [] } = useCategories();
  const { data: settings } = useSettings();

  return (
    <footer className="bg-white text-slate-600 border-t-4 border-blue-600 font-sans shadow-inner">
      {/* Upper Network / Partner Strip */}
      <div className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white px-3 py-1 rounded font-black tracking-widest text-lg shadow-sm">
              IDNS
            </div>
            <div>
              <span className="text-slate-900 font-bold text-lg tracking-wider uppercase font-display block">
                I D N S NETWORK
              </span>
              <span className="text-xs text-slate-500">
                India's Trusted Digital News & Independent Affairs Platform
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-700">
            <span className="text-blue-600 font-bold flex items-center gap-1">
              <Radio className="h-3.5 w-3.5" /> CHANNELS:
            </span>
            <span className="hover:text-blue-600 cursor-pointer">NOW NEWS</span>
            <span>•</span>
            <span className="hover:text-blue-600 cursor-pointer">TECH WIRE</span>
            <span>•</span>
            <span className="hover:text-blue-600 cursor-pointer">BUSINESS TODAY</span>
            <span>•</span>
            <span className="hover:text-blue-600 cursor-pointer">LIFESTYLE NOW</span>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer (Clean White/Slate Theme) */}
      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-xs">
          {/* Col 1: Categories */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider text-sm border-l-2 border-blue-600 pl-2">
              TOP CATEGORIES
            </h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1 text-slate-600"
                  >
                    <ChevronRight className="h-3 w-3 text-blue-600" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: More Sections */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider text-sm border-l-2 border-blue-600 pl-2">
              TRENDING SECTIONS
            </h4>
            <ul className="space-y-2">
              {categories.slice(6, 12).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1 text-slate-600"
                  >
                    <ChevronRight className="h-3 w-3 text-blue-600" />
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1 text-slate-600">
                  <ChevronRight className="h-3 w-3 text-blue-600" />
                  National Headlines
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1 text-slate-600">
                  <ChevronRight className="h-3 w-3 text-blue-600" />
                  Live Wire
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider text-sm border-l-2 border-blue-600 pl-2">
              QUICK ACCESS
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors text-slate-600">
                  Latest News
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors text-slate-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition-colors text-slate-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/sitemap.xml" className="hover:text-blue-600 transition-colors text-slate-600">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policy */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider text-sm border-l-2 border-blue-600 pl-2">
              COMPLIANCE
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-blue-600 transition-colors text-slate-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600 transition-colors text-slate-600">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-blue-600 transition-colors text-slate-600">
                  Disclaimer
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Grievance Redressal</span>
              </li>
            </ul>
          </div>

          {/* Col 5 & 6: Network Description & Contact */}
          <div className="col-span-2 space-y-3">
            <h4 className="text-slate-900 font-bold uppercase tracking-wider text-sm border-l-2 border-blue-600 pl-2">
              ABOUT I D N S
            </h4>
            <p className="text-[12px] leading-relaxed text-slate-600">
              I D N S (Independent Affairs News Spectrum) is India’s fast-growing general news & knowledge network. Delivering breaking news, deep analytics, politics, tech, entertainment, business, and expert opinions around the clock.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="mailto:independentaffairsnewsspectrum@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs border border-blue-200 transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-blue-600" />
                independentaffairsnewsspectrum@gmail.com
              </a>
              <a
                href="tel:+919441442403"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs border border-blue-200 transition-colors"
              >
                +91 94414 42403
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-900">I D N S</strong> Media Group. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-blue-600">Terms of Use</Link>
            <span>•</span>
            <span>Independent Affairs News Spectrum</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
