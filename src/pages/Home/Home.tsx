// import HeroSection from '../../components/Home/HeroSection';
// import IntegerationAndValidation from './IntegerationAndValidation';
// import HowItWorks from './HowItWorks';
// import Cta from './CTA';
// import Footer from './Footer';
import { lazy, Suspense } from 'react';
const HeroSection = lazy(() => import('../../components/Home/HeroSection'));

const IntegerationAndValidation = lazy(
  () => import('../../components/Home/IntegerationAndValidation'),
);
const HowItWorks = lazy(() => import('../../components/Home/HowItWorks'));
const Cta = lazy(() => import('../../components/Home/Cta'));
const Footer = lazy(() => import('../../components/Home/Footer'));

export default function Home() {
  return (
    <div className="leading-normal tracking-normal bg-gradient-to-r from-black to-black/50">
      <Suspense fallback={null}>
        <HeroSection />
        <IntegerationAndValidation />
        <HowItWorks />
        <Cta />
        <Footer />
      </Suspense>
    </div>
  );
}
