import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import ProductList from "./components/ProductList"
import CreateProduct from "./components/CreateProduct"
import Orders from "./components/Orders"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>My Product App</h1>
          <nav>
            <Link to="/">Products</Link>
            <Link to="/orders">Orders</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <CreateProduct />
                  <ProductList />
                </>
              }
            />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

