import Header from "@/components/Header";
import Stats from "@/components/Stats";
import SpecialityMenu from "@/components/SpecialityMenu";
import TopDoctors from "@/components/TopDoctors";
import Features from "@/components/Features";
import Banner from "@/components/Banner";
const page = () => {
  return (
    <div>
      <Header />
      <Stats />
      <SpecialityMenu />
      <TopDoctors />
      <Features />
      <Banner />
    </div>
  );
};

export default page;
