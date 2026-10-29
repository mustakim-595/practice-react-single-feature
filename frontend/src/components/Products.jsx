import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import ProductFilterBar from './ProductFilterBar';
import Header from './Header';
import Footer from './Footer';

const Products = ({ token, setToken }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filtering State
  const [category, setCategory] = useState("");

  // Pagination State 
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;

  // Sort by Price State
  const [sort, setSort] = useState("");

  // Sort by Stock State
  const [sortByStock, setSortByStock] = useState("");

  // Search Product State
  const [search, setSearch] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/products?page=${currentPage}&limit=${limit}&category=${category}&sort=${sort}&sort_by_stock=${sortByStock}&search=${search}`
      );

      if (!response.ok) {
        throw new Error("Failed to load products.!");
      };

      const result = await response.json();

      setTotalProducts(result.totalProducts || 0);
      setTotalPages(result.totalPages || 0);
      setProducts(result.products || []);

    } catch (error) {
      console.log(error)
      setError(error.message || "Failed to load products.");
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, category, sort, sortByStock, search]);

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const onDelete = (id) => {
    setProducts(pre =>
      pre.filter(
        product => product._id !== id
      )
    )
  }

  return (
    <div>
      <Header
        onChangeSearch={setSearch}
        token={token}
        setToken={setToken}
      />
      <main>
        <div className='w-full max-w-6xl m-auto  rounded-xl min-h-screen'>

          <div className='mt-5'>
            <ProductFilterBar
              category={category}
              onChangeCategory={setCategory}
              onCurrentPage={setCurrentPage}
              sort={sort}
              onChangeSort={setSort}
              sortByStock={sortByStock}
              onChangeSortByStock={setSortByStock}
              token={token}
            />
          </div>

          <div className='grid grid-cols-5 py-3 px-5 text-shadow-md font-medium bg-slate-200 mt-5 rounded-xl border border-slate-500/30'>
            <h3> Name </h3>
            <h3 className='text-center'> Category </h3>
            <h3 className='text-center'> Price </h3>
            <h3 className='text-center'> Stock </h3>
            <h3 className='text-end'> Actions </h3>
          </div>

          <div className='border border-slate-500/30 rounded-xl overflow-hidden shadow-md mt-2'>
            {
              loading ? (
                <div
                  className='w-full h-50 flex justify-center items-center'
                >
                  <h2> Loading products..</h2>
                </div>
              ) : error ? (
                <div
                  className='w-full h-50 flex justify-center items-center'
                >
                  <h2> {error} </h2>
                </div>
              ) : products.length === 0 ? (
                <div
                  className='w-full h-50 flex justify-center items-center'
                >
                  <h2> No products found.</h2>
                </div>
              ) : (
                products.map(product => <ProductCard
                  key={product._id}
                  product={product}
                  onDelete={onDelete}
                  token={token}
                />)
              )
            }
          </div>
        </div>

        {/* Pagination */}
        {
          totalProducts > limit && (
            <div
              className='flex justify-center items-center gap-3 my-10'
            >
              <button
                type='button'
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className='w-25 bg-cyan-400 hover:bg-cyan-400/80 p-2 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-cyan-400'
              >
                {"<"} Previous
              </button>
              {
                pages.map(page =>
                  <button
                    type='button'
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`border border-cyan-400 rounded-xl cursor-pointer py-2 px-4 ${currentPage === page && "bg-cyan-400"
                      }`}
                  >
                    {page}
                  </button>
                )
              }
              <button
                type='button'
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className='w-25 bg-cyan-400 hover:bg-cyan-400/80 p-2 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-cyan-400'
              >
                Next {">"}
              </button>
            </div>
          )
        }
      </main>
      <Footer />
    </div>
  )
}

export default Products