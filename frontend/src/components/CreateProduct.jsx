
import { X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateProduct = ({ token }) => {

  const isLoggedIn = Boolean(token);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    stock: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("You must be logged in to create a product.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(response.message || "Failed to create product")
      }

      alert(result.message);

      setFormData({
        title: "",
        category: "",
        price: "",
        stock: ""
      });

      navigate("/");

    } catch (error) {
      console.log(error.message || "Failed to create product.");
    };

  };

  return (

    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">

      {/* Create Product Form */}
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                Create New Product
              </h1>
              <Link
                to={'/'}
                className="w-10 h-10 border border-red-500/30 p-2 rounded-full flex justify-center items-center bg-red-500/20 hover:bg-red-500/25"
              >
                <X />
              </Link>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Fill in the details below to add a new product.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Product Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Category
              </label>

              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter product category"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            {/* Price & Stock - Horizontal Layout */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Price (TK)
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="stock"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Stock
                </label>

                <input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-400 px-5 py-3.5  font-semibold shadow-sm transition hover:bg-cyan-400/80 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 active:scale-[0.99] cursor-pointer"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
