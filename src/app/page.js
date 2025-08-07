import EventCategory from "./components/content/EventCategory";
import Example from "./components/content/Example";
import RecentVideos from "./components/content/RecentVideos";
import Stats from "./components/content/Stats";
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
    </div>
  );
}
