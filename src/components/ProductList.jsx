import React, { useState, useEffect } from "react"

function ProductList({ token }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4444/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4444/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.msg === "Product deleted successfully") {
        fetchProducts()
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const handleAddToOrder = (product) => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    orders.push(product)
    localStorage.setItem("orders", JSON.stringify(orders))
    alert(`${product.name} added to orders!`)
  }

  return (
    <div className="product-list">
      <h2>My Products</h2>
      {products.map((product) => (
        <div key={product._id} className="product-item">
          <h3>{product.name}</h3>
          <p>{product.ref}</p>
          {product.image && <img src={`http://localhost:4444/uploads/${product.image}`} alt={product.name} />}
          <button onClick={() => handleDelete(product._id)}>Delete</button>
          <button onClick={() => handleAddToOrder(product)}>Add to Order</button>
        </div>
      ))}
    </div>
  )
}

export default ProductList

