import { useEffect, useState } from "react";
import instance from "../axios.config";
import ProductCard from "../components/ProductCard";


function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await instance.get("/product/get");
    console.log(response.data);
    setProducts(response.data.products);
  }
  return (
    <>
      <div className="  min-h-screen  grid grid-cols-3 p-4 place-items-center">
        {products.length > 0 &&
          products.map((product) => {
            return <ProductCard product={product} key={product.uid} />;
          })}
      </div>
    </>
  );
}

export default Home;