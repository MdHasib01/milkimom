import Header from '../components/Header';
import CountdownBar from '../components/CountdownBar';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import Benefits from '../components/Benefits';
import EligibilityCheck from '../components/EligibilityCheck';
import Comparison from '../components/Comparison';
import Pricing from '../components/Pricing';
import AntiFormula from '../components/AntiFormula';
import MicroCommitment from '../components/MicroCommitment';
import Authority from '../components/Authority';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';
import ObjectionNormalization from '../components/ObjectionNormalization';
import SatisfactionGuarantee from '../components/SatisfactionGuarantee';
import FutureLetter from '../components/FutureLetter';
import ExitIntent from '../components/ExitIntent';
import Footer from '../components/Footer';
import FloatingSuccessFeed from '../components/FloatingSuccessFeed';
import FloatingActions from '../components/FloatingActions';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-magenta selection:text-white pt-[42px] sm:pt-[46px] overflow-x-hidden w-full max-w-[100vw]">
      <CountdownBar />
      <Header />
      <Hero />
      <TrustBadges />
      <div id="benefits"><Benefits /></div>
      <EligibilityCheck />
      <Comparison />
      <Pricing />
      <AntiFormula />
      <MicroCommitment />
      <Authority />
      <div id="reviews"><SocialProof /></div>
      <div id="faq"><FAQ /></div>
      <ObjectionNormalization />
      <SatisfactionGuarantee />
      <FutureLetter />
      
      {/* Overlays and Floating */}
      <Footer />
      
      <ExitIntent />
      <FloatingSuccessFeed />
      <FloatingActions />
    </div>
  );
}
