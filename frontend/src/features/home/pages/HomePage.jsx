import HeroSection from "../components/HeroSection";
import PartnerLogosRow from "../components/PartnerLogosRow";
import BookOfTheMonth from "../components/BookOfTheMonth";
import NewReleasesSection from "../components/NewReleasesSection";
import CategoriesSection from "../components/CategoriesSection";
import RecommendedSection from "../components/RecommendedSection";
import ComingSoonSection from "../components/ComingSoonSection";
import NewsletterSection from "../components/NewsletterSection";
import FooterSection from "../components/FooterSection";

import { bookOfTheMonth, newReleases, recommended } from "../data/books";
import { categories } from "../data/categories";
import { comingSoonItems } from "../data/comingSoon";

export default function HomePage() {
  return (
    <main className="library-shell">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:gap-14">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Partner Logos */}
        <PartnerLogosRow />

        {/* 3. Book of the Month */}
        <BookOfTheMonth book={bookOfTheMonth} />

        {/* 4. New Releases */}
        <NewReleasesSection books={newReleases} />

        {/* 5. Explore Categories */}
        <CategoriesSection categories={categories} />

        {/* 6. Recommended For You */}
        <RecommendedSection books={recommended} />

        {/* 7. Coming Soon */}
        <ComingSoonSection items={comingSoonItems} />

        {/* 8. Newsletter */}
        <NewsletterSection />

        {/* 9. Footer */}
        <FooterSection />
      </div>
    </main>
  );
}
