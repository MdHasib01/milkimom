import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Success() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-magenta selection:text-white pt-[42px] sm:pt-[46px] flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Order Successful!</h1>
          <p className="text-gray-600">Thank you for your purchase.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
