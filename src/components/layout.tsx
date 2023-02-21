import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#141a17] text-white px-2 py-2">
      <Navbar />
      <section>{children}</section>
      <Footer />
    </main>
  );
};

export default layout;
