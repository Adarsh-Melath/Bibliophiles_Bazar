import ReadingProgressBar from '../components/ReadingProgressBar';
import { FloatingElements } from '../components/FloatingElements';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { PublishersSection } from '../components/PublishersSection';
import { BookOfTheMonth } from '../components/BookOfTheMonth';
import { NewReleases } from '../components/NewReleases'
import { CategorySlider } from '../components/CategorySlider'
import { RecommendedForYou } from '../components/RecommendedForYou'
import { ComingSoon } from '../components/ComingSoon'
import { Newsletter } from '../components/Newsletter'
import { Footer } from '../components/Footer'
import PageTransition from '../../../components/ui/PageTransition';

export default function App() {
    return (
        <div className="min-h-screen bg-paper font-body text-shelf selection:bg-burgundy/10 selection:text-shelf relative">
            <ReadingProgressBar />
            <FloatingElements />
            <Navbar />

            <PageTransition>
                <main>
                    <HeroSection />
                    <PublishersSection />
                    <BookOfTheMonth />
                    <NewReleases />
                    <CategorySlider />
                    <RecommendedForYou />
                    <ComingSoon />
                    <Newsletter />
                </main>
            </PageTransition>

            <Footer />
        </div>);

}