import { AccordionFaq } from "../components/AccordionFaq";
import ButtonBackToTop from "../components/ButtonBackToTop";
import FirstFooter from "../components/FirstFooter";
import Footer from "../components/Footer";
import HeaderBand from "../components/HeaderBand";
import MobileNavBar from "../components/mobNavbar/index";
import Navbar from "../components/navbar/index";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <main className="">
        <HeaderBand />
        <Navbar />
        <MobileNavBar />
        {children}
        <AccordionFaq />
        <FirstFooter />
        <ButtonBackToTop />
        <Footer />
      </main>
    </div>
  );
};

export default ShopLayout;
