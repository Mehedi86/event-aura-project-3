import EventCategory from "./components/content/EventCategory";
import Banner from "./components/Header/Banner";
import Suggest from "./components/Header/Suggest";

export default function Home() {
  return (
    <div>
      <Banner />
      <Suggest/>
      <EventCategory/>
    </div>
  );
}
