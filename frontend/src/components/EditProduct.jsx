import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = ({ token }) => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price: 0,
        stock: 0
    });

    const isLoggedIn = Boolean(token);

    const { id } = useParams();
    const navigate = useNavigate();

    const fetchProduct = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/products/${id}`
            );
            if (!response.ok) {
                throw new Error("Failed to load product.")
            }
            const result = await response.json();
            setFormData(result.product);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

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
            alert("You are not logged in. Please login to edit product.");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/products/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to load product.");
            }

            alert("Product updated successful.")

            navigate('/');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="w-full max-w-xl mx-auto rounded-xl border border-gray-500 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                    Edit Product
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter product title"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label
                            htmlFor="category"
                            className="mb-2 block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <input
                            id="category"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Enter product category"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500"
                        />
                    </div>

                    {/* Price and Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="price"
                                className="mb-2 block text-sm font-medium text-gray-700">
                                Price (৳)
                            </label>
                            <input
                                id="price"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="stock"
                                className="mb-2 block text-sm font-medium text-gray-700">
                                Stock
                            </label>
                            <input
                                id="stock"
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="Enter stock"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                        <button
                            onClick={() => navigate('/')}
                            type="button"
                            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 cursor-pointer"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
