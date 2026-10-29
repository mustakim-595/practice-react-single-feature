import { FilePen, View } from 'lucide-react';
import DeleteProduct from './DeleteProduct';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onDelete, token }) => {
  const { title, category, price, stock, _id } = product;

  const isLoggedIn = Boolean(token);

  return (
    <div className='grid grid-cols-5 border-b border-gray-500/30 px-5 py-3'>
      <h2>
        {title}
      </h2>
      <h3 className='text-center'>
        {category}
      </h3>
      <p className='text-center'>
        {price}
      </p>
      {
        stock > 5 ? (
          <p
            className='w-25 m-auto border border-green-500/50 rounded-2xl bg-green-400/50 py-1 text-sm text-center'
          >
            In Stock
          </p>
        ) : stock === 0 ? (
          <p
            className='w-25 m-auto border border-red-500/50 rounded-2xl bg-red-400/50 py-1 text-sm text-center text-gray-600'
          >
            Out of Stock
          </p>
        ) : (
          <p
            className='w-25 m-auto border border-amber-500/50 rounded-2xl bg-amber-400/50 py-1 text-sm text-center'
          >
            Low Stock
          </p>
        )
      }
      <div className='flex justify-end items-center gap-2'>
        <Link
          to={`/product/${_id}`}
          className='border border-gray-500/50 rounded-md bg-gray-500/10 hover:bg-gray-500/20 cursor-pointer p-2'>
          <View size={18} />
        </Link>

        <Link
          to={`/product/edit/${_id}`}
          className='border border-gray-500/50 rounded-md bg-gray-500/10 hover:bg-gray-500/20 cursor-pointer p-2 text-cyan-600'>
          <FilePen size={18} />
        </Link>

        <DeleteProduct
          productId={_id}
          onDelete={onDelete}
          token={token}
        />

      </div>
    </div >
  )
}

export default ProductCard