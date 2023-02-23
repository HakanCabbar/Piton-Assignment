import Book from '../components/Book'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const BASE_URL = "https://assign-api.piton.com.tr/api/rest"

function Category() {
  const router = useRouter()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data.category))
  }, [])

  return (
    <>
      {categories.map(category => (
        <div key={category.id}>
          <div className="flex justify-center">
            <div className="flex flex-nowrap w-5/6 justify-start">
              <h4 className="text-3xl mt-16 font-['Manrope'] font-bold lg:ml-2 ml-12">
                <span>{category.name}</span>
              </h4>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => router.push(`${category.name}`)}
                className="mr-1 content-end mt-16 font-['Manrope'] text-xl text-[#EF6B4A]"
              >
                View All
              </button>
            </div>
          </div>

          <div className="w-full p-5 flex justify-center flex-wrap">
            <Book categoryId={category.id} limit={4} />
          </div>
        </div>
      ))}
    </>
  )
}

export default Category
