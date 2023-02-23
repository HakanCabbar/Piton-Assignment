import Image from "next/image";
import Banner from '../images/Banner.png';
import Category from "../components/Category";
import Headbar from '../components/headbar';

export default function Home() {
  return (
    <>
      <Headbar />
      <div className="w-5/6 flex m-auto mt-16">
        <div className="relative lg:h-96 h-48 w-full">
          <Image src={Banner} alt="banner" className="absolute h-full w-full" />
          <div className="absolute top-1/2 lg:left-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-left lg:w-[440px] w-96 lg:h-56 h-16 text-elipsis ">
            <h1 className="lg:text-6xl text-3xl lg:leading-[5rem] leading-10 font-extrabold font-[Manrope] text-[#F0B861]">25 % discount</h1>
            <h1 className="lg:text-6xl text-3xl lg:leading-[5rem] leading-10 font-semibold font-[Manrope]">all Paulo Coelho books!</h1>
          </div>
        </div>
      </div>
      <Category />
    </>
  );
}
