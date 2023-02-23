import Image from "next/image";
import logo from "../images/Logo.png";
import like from "../images/HEART.png";
import basket from "../images/Basket.png";
import out from "../images/Logout.png";
import profile from "../images/profile.png";
import { useRouter } from "next/router";

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

function Headbar() {
  const router = useRouter();

  return (
    <div className="w-full bg-[#fffff] lg:h-36 h-28  shadow-md flex items-center justify-center">
      <Image
        alt="logo"
        src={logo}
        className="lg:w-[100px] w-20 ml-32 mr-4"
        onClick={() => router.push("/home")}
      />
      <input
        className="lg:ml-32 md:ml-30 lg:w-full md:w-full sm:w-full lg:mr-40 mr-8  h-2/5 pl-5 bg-[#f4f4ff]"
        placeholder="Search"
      />
      <div className="flex justify-center text-center mr-28">
        <button className="lg:w-12 w-6 lg:h-10 h-6 bg-[#f4f4ff]">
          <Image alt="profile" src={profile} className="w-8 m-auto" />
        </button>
        <button className="lg:ml-4 ml-2 lg:mr-4 mr-2 lg:w-12 w-6 lg:h-10 h-6 bg-[#f4f4ff] border-collapse">
          <Image alt="like" src={like} className="w-8 m-auto" />
        </button>
        <button className="lg:w-12 w-4 lg:h-10 h-6 bg-[#f4f4ff]">
          <Image alt="basket" src={basket} className="w-8 m-auto" />
        </button>
        <button
          className="lg:w-12 w-4 lg:h-10 h-6 ml-4"
          onClick={() => {
            router.push("./login");
            logout();
          }}
        >
          <Image alt="logout" src={out} className="w-8 m-auto" />
        </button>
      </div>
    </div>
  );
}

export default Headbar;
