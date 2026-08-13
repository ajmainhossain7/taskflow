import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function MarketingLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
