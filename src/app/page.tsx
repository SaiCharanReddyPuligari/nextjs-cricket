import FeaturedCourses from "@/components/FeaturedCourses";
import HomeSection from "@/components/HomeSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials"
import Instructors from "@/components/Instructors"
import Image from "next/image";
import UpcomingWebinars from "@/components/UpcomingWebinars";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HomeSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <Testimonials/>
      <UpcomingWebinars/>
      <Instructors/>
      <Footer/>
    </main>
  );
}
