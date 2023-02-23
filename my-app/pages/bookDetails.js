import Image from "next/image";
import back from "../images/Vector.png";
import like from "../images/HEART.png";
import redlike from '../images/redlike.png'
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Headbar from "@/components/headbar";

const BASE_URL = "https://assign-api.piton.com.tr/api/rest";

export default function BookDetails() {
  const [userid, setUserid] = useState("");
  const [token, setToken] = useState("");
  const [book, setBook] = useState({});
  const [photo, setPhoto] = useState("");
  const [photourl, setPhotoUrl] = useState(like)
  const [likestatus, setLikeStatus] = useState(false)

  const router = useRouter();
  const productId = router.query?.productId;

  useEffect(() => {
    if (likestatus) {
      setPhotoUrl(redlike);
    }
  }, [likestatus]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/product/${productId}`)
      .then((response) => {
        const product = response.data.product_by_pk;
        setBook(product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productId]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (book.cover) {
        const response = await axios.post(`${BASE_URL}/cover_image`, {
          fileName: `${book.cover}`,
        });
        const url = response.data.action_product_image.url;
        setPhoto(url);
      }
    };
    fetchPhotos();
  }, [book]);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserid(id);
  }, []);

  useEffect(() => {
    const tok = localStorage.getItem("token");
    setToken(tok);
  }, []);

  useEffect(() => {
    const status = localStorage.getItem("likeStatus");
    if (status !== null) {
      setLikeStatus(status === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likeStatus", likestatus);
  }, [likestatus]);

  const likeUnlike = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = likestatus
        ? await axios.post(
            `${BASE_URL}/unlike`,
            { user_id: `${userid}`, product_id: `${productId}` },
            config
          )
        : await axios.post(
            `${BASE_URL}/like`,
            { user_id: `${userid}`, product_id: `${productId}` },
            config
          );
      setLikeStatus(!likestatus);
      setPhotoUrl(likestatus ? like : redlike);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategory = () => {
    const categoryMap = {
      "1": "/Best Seller",
      "2": "/Classics",
      "3": "/Children",
      "4": "/Philosophy"
    };
    
    const categoryUrl = categoryMap[book.category_id];
    if (categoryUrl) {
      router.push(categoryUrl);
    }
  };

  if (!productId) {
    return <div>Loading...</div>;
  } 
    return (
<>
  <Headbar />
  <div className="flex justify-center w-11/12 lg:ml-20 ml-8">
    <button onClick={getCategory}>
      <Image alt="back" src={back} className="w-3 h-5 mt-16 mr-2" />
    </button>
    <div className="flex flex-nowrap w-full">
      <h4 className="text-2xl text-left tracking-normal mt-16 font-['Manrope'] font-bold">Book Details</h4>
    </div>
  </div>
  <div className="flex lg:flex-nowrap flex-wrap justify-center">
    <div className="lg:w-2/6 w-5/6 lg:ml-20 sm:t-8 flex justify-center">
      <div className="lg:w-[420px] w-96 lg:h-[570px] h-[450px] bg-[#f4f4ff] border-solid border-2 rounded border-[#0909371A] flex flex-col items-center justify-center pt-4 m-8">
        <div>
          <img src={photo} alt="photo" className="lg:w-[350px] w-64 lg:h-[500px] h-76 drop-shadow-[0px 4px 8px rgba(98, 81, 221, 0.2)]" />
        </div>
      </div>
    </div>
    <div className="w-full h-44 lg:ml-12 ml-4 mt-24">
      <div className="flex justify-center">
        <div className="flex flex-nowrap w-full justify-start">
          <h4 className="text-5xl font-['Manrope'] font-bold">{book.name}</h4>
        </div>
        <div className="flex">
          <button className="w-16 h-16 bg-[#f4f4ff] rounded-full justify-center items-center flex lg:mr-28 mr-10" onClick={likeUnlike}>
            <Image src={photourl} alt="like" className="justify-center w-10" />
          </button>
        </div>
      </div>
      <br />
      <h2 className="text-3xl font-['Manrope'] font-semibold text-[#00000099]">{book.author}</h2>
      <br />
      <br />
      <h3 className="text-2xl text-['#090937'] font-bold font-['Manrope']">Summary</h3>
      <br />
      <div className="flex lg:justify-start justify-center">
         <p className="text-xl text-[#09093799] font-normal items-center break-all w-10/12 text-center font-['Manrope']">{book.description}</p>
      </div>
      <br />
      <div className="flex lg:justify-end sm:justify-center w-full ">
        <button className="bg-[#EF6B4A] w-96 h-16 text-slate-100 lg:mt-28 lg:mb-12 mt-12 mb-12 lg:mr-28 m-auto rounded text-lg">
          <label className="mr-48 font-['Manrope'] text-xl font-bold pl-2">{book.price} $</label>
          <label className="font-['Manrope'] text-xl font-bold pr-2">Buy Now</label>
        </button>
      </div>
    </div>
  </div>
</>
    )
  }
  