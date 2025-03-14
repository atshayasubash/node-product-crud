import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setTimeout(() => setProducts(response.data), 500);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.productNo} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{product.productName}</h2>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
