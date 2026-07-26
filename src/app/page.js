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
    </div>
  );
};

export default page;
