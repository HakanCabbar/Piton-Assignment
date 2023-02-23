import axios from "axios";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

const BASE_URL = "https://assign-api.piton.com.tr/api/rest"

function Book({ categoryId }) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/products/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.product.slice(0, 4)); // limit to 4 products
      });
  }, [categoryId]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const urls = await Promise.all(products.map(async (product) => {
        const response = await axios.post(`${BASE_URL}/cover_image`, {
          fileName: product.cover,
        });
        return response.data.action_product_image.url;
      }));
      setPhotoUrls(urls);
    };

    if (products.length > 0) {
      fetchPhotos();
    }
  }, [products]);

  return (
    <>
      {products.map((product, index) => (
        <div key={product.id} className="lg:w-80 w-96 h-52 bg-[#f4f4ff] border-2 border-[#0909371A] flex flex-row m-2" onClick={() => {
          setSelectedProductId(product.id);
          router.push({
            pathname: '/bookDetails',
            query: { productId: product.id }
          })
        }}>
          <div className="w-1/2 p-3">
            <img src={photoUrls[index]}  className="w-36 h-48" alt="Book cover" />
          </div>
          <div className="w-1/2 grid">
            <div className="row-end-3">
              <label className="font-['Manrope'] text-xl font-semibold">{product.name}</label>
              <br />
              <label className="font-['Manrope]  text-base font-semibold text-[#09093799]">{product.author}</label>
            </div>
            <div className="row-start-6">
              <label className="font-['Manrope'] text-2xl  inline-block font-bold text-[#6251DD]">{product.price} $</label>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Book;
