import React, { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders") || "[]"));
    fetchProducts();
  }, []);

  const handleAddToOrder = (ref) => {
    const product = products.find((e) => e.ref === ref);
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(product);
    localStorage.setItem("orders", JSON.stringify(orders));
    setOrders(orders);
    alert(`${product.name} added to orders!`);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4444/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Order submitted:", {
      clientName,
      phoneNumber,
      email,
      address,
      orders,
    });
    // Clear the form and orders after submission
    setClientName("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
    setOrders([]);
    localStorage.removeItem("orders");
    alert("Order submitted successfully!");
  };

  return (
    <div className="orders">
      <h2>My Orders</h2>

      <form onSubmit={handleSubmit} className="client-form">
        <h3>Client Information</h3>
        <div className="form-group">
          <label htmlFor="clientName">Name:</label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <br />
        <select
          onChange={(e) => {
            handleAddToOrder(e.target.value);
          }}
        >
          <option disabled>pick products</option>
          {products.map((e) => {
            return <option value={e.ref}>{e.name}</option>;
          })}
        </select>
        <br />
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <h3>{order.name}</h3>
            <p>{order.ref}</p>
            {order.image && (
              <img
                src={`http://localhost:4444/uploads/${order.image}`}
                alt={order.name}
              />
            )}
          </div>
        ))}

        <br />
        <button type="submit" className="submit-order">
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default Orders;
