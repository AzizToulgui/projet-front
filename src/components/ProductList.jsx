import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList({ token }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4444/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)   
       setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4444/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setProducts(products.filter(product => product.id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToOrder = (product) => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(product);
    localStorage.setItem("orders", JSON.stringify(orders));
    alert(`${product.name} added to orders!`);
  };

  return (
    <div className="product-list">
      <h2>My Products</h2>
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>{product.ref}</p>
          {product.img && <img src={`http://localhost:4444/${product.img}`} alt={product.name} />}
          <button onClick={() => handleDelete(product.id)}>Delete</button>
          <button onClick={() => handleAddToOrder(product)}>Add to Order</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;