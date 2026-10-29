import { Route, Routes } from "react-router-dom"
import Products from "./components/Products"
import CreateProduct from "./components/CreateProduct"
import ProductDetails from "./components/ProductDetails"
import EditProduct from "./components/EditProduct"
import Register from "./components/Register"
import Login from "./components/Login"
import { useState } from "react"

function App() {

  const [token, setToken] = useState(null);

  return (
    <Routes>
      <Route
        path="/"
        element={<Products token={token} setToken={setToken} />}
      />
      <Route
        path="/create-product"
        element={<CreateProduct token={token} />}
      />
      <Route
        path="/product/:id"
        element={<ProductDetails token={token} />}
      />
      <Route
        path="/product/edit/:id"
        element={<EditProduct token={token} />}
      />

      <Route
        path="register"
        element={<Register token={token} />}
      />

      <Route
        path="login"
        element={<Login setToken={setToken} />}
      />

    </Routes>
  )
}

export default App
