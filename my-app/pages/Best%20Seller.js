import Image from "next/image";
import Headbar from "@/components/headbar";
import back from '../images/Vector.png'
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const BASE_URL = "https://assign-api.piton.com.tr/api/rest";

export default function BestSeller() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/products/1`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.product);
      });
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      const urls = await Promise.all(
        products.map(async (product) => {
          const response = await axios.post(`${BASE_URL}/cover_image`, {
            fileName: product.cover
          });
          return response.data.action_product_image.url;
        })
      );
      setPhotos(urls);
    };
    if (products.length > 0) {
      fetchPhotos();
    }
  }, [products]);

  return (
    <>
      <Headbar />
      <div className="flex justify-center w-11/12 lg:ml-20 ml-10">
        <button onClick={() => router.push("./home")}>
          <Image src={back} alt="back" width={3} height={5} className="w-3 h-5 mt-16 mr-2" />
        </button>
        <div className="flex flex-nowrap w-full">
          <h4 className="text-2xl text-left tracking-normal mt-16 font-['Manrope'] font-bold">Best Seller</h4>
        </div>
      </div>

      <div className="w-full p-5 flex flex-wrap justify-center items-center">
        {products.map((product, index) => (
          <div key={product.id} onClick={() => {
            setProductId(product.id);
            router.push({
              pathname: '/bookDetails',
              query: { productId: product.id }
            });
          }} className="w-72 h-96 bg-[#f4f4ff] border-solid border-2 rounded border-[#0909371A] flex flex-col items-center pt-4 m-8">
            <div>
              <img src={photos[index]} className="w-48 h-72 drop-shadow-[0px 4px 8px rgba(98, 81, 221, 0.2)]" />
            </div>

            <div className="flex justify-center flex-nowrap">
              <div className="mr-8">
                <label className="text-l font-['Manrope'] font-semibold ">{product.name}</label>
                <br />
                <label className="text-l font-['Manrope'] font-semibold text-[#09093799] ">{product.author}</label>
              </div>
              <div className="flex justify-end">
                <label className="content-end font-['Manrope'] text-l text-[#6251DD] font-bold mt-6">{product.price} $</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
