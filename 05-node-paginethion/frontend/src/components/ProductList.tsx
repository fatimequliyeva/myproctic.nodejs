import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // hər səhifədə 8 məhsul göstərək
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts(page, limit);
      setProducts(data.data);
      setTotal(data.total);
    };
    fetchData();
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📦 Məhsullar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600">{p.brand}</p>
            <p className="text-blue-600 font-bold">{p.price} AZN</p>
            <p className="text-sm text-gray-500">
              Kateqoriya: {p.category} | Stock: {p.stock}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-md ${
            page === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
