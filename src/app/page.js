import Banner from "@/components/Banner";
import Features from "@/components/Features";
import Header from "@/components/Header";
import SpecialityMenu from "@/components/SpecialityMenu";
import Stats from "@/components/Stats";
import TopDoctors from "@/components/TopDoctors";

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
