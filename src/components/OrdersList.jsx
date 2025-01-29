import { useEffect, useState } from "react"
import "./ordersList.css"
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([
  ])


  const fetchorders = async () => {
    try {
      const { data } = await axios.get("http://localhost:4444/orders");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };


  useEffect(()=>{
    fetchorders()
  } , [])


  const [expandedOrderId, setExpandedOrderId] = useState(null)

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  return (
    <div className="orders-list">
      <h1>Orders List</h1>
      {orders.map((order) => (
        <div key={order.id} className="order-item">
          <div className="order-summary" onClick={() => toggleOrderExpansion(order.id)}>
            <span>{order.clientName}</span>
            <span>{order.phone}</span>
            <span>{order.email}</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
          {expandedOrderId === order.id && (
            <div className="order-details">
              <h3>Products:</h3>
              <div className="products-list">
                {order.products.map((product) => (
                  <div key={product.id} className="product-item">
                    <img src={product.img || "/placeholder.svg"} alt={product.name} className="product-image" />
                    <div className="product-info">
                      <p>
                        <strong>Name:</strong> {product.name}
                      </p>
                      <p>
                        <strong>Reference:</strong> {product.ref}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default OrdersList

