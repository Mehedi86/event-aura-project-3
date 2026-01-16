import EventCategory from "./components/content/EventCategory";
import Example from "./components/content/Example";
import RecentNews from "./components/content/RecentNews";
import RecentVideos from "./components/content/RecentVideos";
import Stats from "./components/content/Stats";
import Testimonials from "./components/content/Testimonials";
import Banner from "./components/Header/Banner";
import Suggest from "./components/Header/Suggest";

export default function Home() {
  return (
    <div>
      <Banner />
      <Suggest/>
      <EventCategory/>
      <Stats/>
      <RecentVideos/>
      <Example/>
      <RecentNews/>
      <Testimonials/>
    </div>
  );
}
