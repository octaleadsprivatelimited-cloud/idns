import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

const AboutPage = () => {
  return (
    <Layout>
      <nav className="container py-3 border-b border-border">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li className="text-foreground font-medium">About Us</li>
        </ol>
      </nav>

      <PageHero
        title={
          <>
            About <span className="text-red-500">I D N S</span>
          </>
        }
        subtitle="Independent Affairs News Spectrum — Breaking news, insightful articles, and deep analysis."
      />

      <section className="container py-12 max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none text-muted-foreground">
          <p>
            I D N S (Independent Affairs News Spectrum) is a digital news platform that shares insightful articles and reporting across 
            various topics like national headlines, world affairs, technology, health, business, science, and more. We aim to 
            keep readers informed with trusted journalism and expert analysis.
          </p>
          <p className="mt-4">
            Our platform delivers reliable coverage and timely updates for readers who value objective reporting. Contact our desk at{" "}
            <a href="mailto:independentaffairsnewsspectrum@gmail.com" className="text-red-600 hover:underline">
              independentaffairsnewsspectrum@gmail.com
            </a>{" "}
            or <a href="tel:+919441442403" className="text-red-600 hover:underline">+91 94414 42403</a>.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
