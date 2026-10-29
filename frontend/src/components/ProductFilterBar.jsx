
import {
    Package,
    LayoutGrid,
    ArrowUpDown,
    Boxes,
    ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProductFilterBar = ({
    category,
    onChangeCategory,
    onCurrentPage,
    sort,
    onChangeSort,
    sortByStock,
    onChangeSortByStock,
    token
}) => {

    const isLoggedIn = Boolean(token);

    const handleFilter = (e) => {
        onChangeCategory(e.target.value);
        onCurrentPage(1);
    }

    const handleSortByStock = (e) => {
        onChangeSortByStock(e.target.value);
        onCurrentPage(1);
    }
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            {/* Heading */}
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-cyan-600">
                        <Package size={23} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900">
                            Product Management
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage, organize and monitor your products
                        </p>
                    </div>
                </div>

                <Link
                    to={'/create-product'}
                    className="bg-cyan-400 py-3 px-4 rounded-xl hover:bg-cyan-400/80 cursor-pointer">
                    + Add Product
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-5 border-t border-slate-100 pt-5 md:flex-row md:flex-wrap md:items-center">

                {/* Category Filter */}
                <div className="relative flex-1 md:min-w-48">
                    <LayoutGrid
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                        value={category}
                        onChange={handleFilter}
                        className="h-11 w-full appearance-none rounded-xl border border-slate-400 bg-white pl-10 pr-10 text-sm text-slate-700 outline-none transition hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 cursor-pointer"
                    >
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="book">Book</option>
                        <option value="programming">Programming</option>
                        <option value="home">Home & Living</option>
                    </select>

                    <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                </div>

                {/* Price Sorting */}
                <div className="relative flex-1 md:min-w-48">
                    <ArrowUpDown
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                        value={sort}
                        onChange={(e) => onChangeSort(e.target.value)}
                        className="h-11 w-full appearance-none rounded-xl border border-slate-400 bg-white pl-10 pr-10 text-sm text-slate-700 outline-none transition hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 cursor-pointer"
                    >
                        <option value="">Sort by Price</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>

                    <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                </div>

                {/* Stock Filter */}
                <div className="relative flex-1 md:min-w-48">
                    <Boxes
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                        value={sortByStock}
                        onChange={handleSortByStock}
                        className="h-11 w-full appearance-none rounded-xl border border-slate-400 bg-white pl-10 pr-10 text-sm text-slate-700 outline-none transition hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-50 cursor-pointer"
                    >
                        <option value="">All Stock Status</option>
                        <option value="in-stock">In Stock</option>
                        <option value="low-stock">Low Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                    </select>

                    <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                </div>

            </div>
        </div>
    );
};

export default ProductFilterBar;
