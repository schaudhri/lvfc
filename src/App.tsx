import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { Landing } from "@/pages/Landing";
import { About } from "@/pages/About";
import { Programme } from "@/pages/Programme";
import { ProgrammeSpecific } from "@/pages/ProgrammeSpecific";
import { Coaching } from "@/pages/Coaching";
import { Resources } from "@/pages/Resources";
import { Locations } from "@/pages/Locations";
import { Schedule } from "@/pages/Schedule";
import { Blog } from "@/pages/Blog";
import { BlogPost } from "@/pages/BlogPost";
import { Contact } from "@/pages/Contact";
import { Safeguarding } from "@/pages/Safeguarding";
import { Faqs as FaqsPage } from "@/pages/Faqs";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Defer to the next frame so the target section (if any) has committed
    // and been laid out before we measure/scroll to it.
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) {
        target.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo(0, 0);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/programmes" element={<Programme />} />
          <Route path="/programmes/:slug" element={<ProgrammeSpecific />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/safeguarding" element={<Safeguarding />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/coaching" element={<Coaching />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
