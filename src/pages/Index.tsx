import { useMemo, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { LatestUpdatesStrip } from "@/components/home/LatestUpdatesStrip";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryArticlesSection } from "@/components/home/CategoryArticlesSection";
import { WebsiteSchema, OrganizationSchema } from "@/components/seo/StructuredData";
import { Helmet } from "react-helmet-async";
import { useLatestArticles } from "@/hooks/usePublicArticles";
import { useCategories } from "@/hooks/useCategories";
import { useCategoryDisplayOrder } from "@/hooks/useCategoryDisplayOrder";
import { sortCategoriesByDisplayOrder } from "@/lib/categoryOrder";
import { Skeleton } from "@/components/ui/skeleton";
import { triggerTranslateForDynamicContent } from "@/components/GoogleTranslate";

const Index = () => {
  const { data: categoriesRaw = [], error: categoriesError } = useCategories();
  const { data: displayOrder = [] } = useCategoryDisplayOrder();
  const categories = useMemo(
    () => sortCategoriesByDisplayOrder(categoriesRaw, displayOrder.length ? displayOrder : undefined),
    [categoriesRaw, displayOrder]
  );
  
  // Fetch latest 15 articles to populate Times Now lead, top wire, and trending widgets
  const { data: latestArticles, isLoading: latestLoading, error: latestError } = useLatestArticles(15);

  const hasError = latestError || categoriesError;

  useEffect(() => {
    if (!latestLoading) triggerTranslateForDynamicContent();
  }, [latestLoading]);

  // Times Now layout segmentation
  const leadArticle = latestArticles?.[0];
  const secondLead = latestArticles?.[1];
  const wireNews = useMemo(() => (latestArticles ? latestArticles.slice(2, 7) : []), [latestArticles]);
  const topNews = useMemo(() => (latestArticles ? latestArticles.slice(7, 13) : []), [latestArticles]);

  return (
    <Layout>
      <Helmet>
        <title>I D N S: Breaking News, India News, World & Live Updates</title>
        <meta
          name="description"
          content="Get all the latest breaking news from India, World, Politics, Sports, Tech, Business and Lifestyle on I D N S (Independent Affairs News Spectrum)."
        />
        <meta property="og:title" content="I D N S: Breaking News, India News & Live Updates" />
        <meta
          property="og:description"
          content="Get all the latest breaking news from India, World, Politics, Sports, Tech, Business and Lifestyle on I D N S."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://9knowledge.com" />
        <link rel="canonical" href="https://9knowledge.com" />
      </Helmet>
      <WebsiteSchema />
      <OrganizationSchema />

      {/* Breaking / Live News Ticker Strip */}
      {latestArticles && latestArticles.length > 0 && (
        <LatestUpdatesStrip articles={latestArticles.slice(0, 6)} />
      )}

      {/* Times Now Hero 3-Column Section */}
      {latestLoading ? (
        <section className="bg-white py-8 border-b">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-3 space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="lg:col-span-6 space-y-4">
                <Skeleton className="h-[360px] w-full rounded" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-32 w-full rounded" />
                  <Skeleton className="h-32 w-full rounded" />
                </div>
              </div>
              <div className="lg:col-span-3 space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </div>
        </section>
      ) : leadArticle ? (
        <HeroSection
          leadArticle={leadArticle}
          secondLead={secondLead}
          topNews={topNews}
          wireNews={wireNews}
        />
      ) : null}

      {/* Category Sections: News, World, Entertainment, Tech, Sports, etc. */}
      <div className="bg-[#f9fafb] divide-y divide-gray-200">
        {categories && categories.length > 0 && categories.map((category) => (
          <CategoryArticlesSection
            key={category.id}
            category={category}
            alwaysShow={false}
          />
        ))}
      </div>

      {hasError && !latestLoading && (
        <div className="container max-w-4xl mx-auto py-16 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Content</h2>
            <p className="text-sm text-gray-600">
              {latestError?.message || categoriesError?.message || "Failed to load content."}
            </p>
          </div>
        </div>
      )}

      {!hasError && (!latestArticles || latestArticles.length === 0) && !latestLoading && (
        <div className="container max-w-4xl mx-auto py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Articles Available</h2>
          <p className="text-gray-500">Check back shortly for breaking updates.</p>
        </div>
      )}
    </Layout>
  );
};

export default Index;

