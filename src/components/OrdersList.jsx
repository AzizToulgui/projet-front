import { useEffect, useState } from "react"
import "./ordersList.css"
import axios from "axios";
import { useState } from "react"
import { ChevronDown, ChevronUp, Phone, Mail, DollarSign, Package } from "lucide-react"

const OrderItem = ({
  order,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className={`order-item ${isExpanded ? "expanded" : ""}`}>
      <div className="order-summary" onClick={onToggle}>
        <div className="client-info">
          <span className="client-name">{order.clientName}</span>
          <div className="contact-details">
            <span>
              <Phone size={14} /> {order.phone}
            </span>
            <span>
              <Mail size={14} /> {order.email}
            </span>
          </div>
        </div>
        <div className="order-meta">
          <span className="total-price">
            <DollarSign size={14} /> {order.totalPrice.toFixed(2)}
          </span>
          <span className="product-count">
            <Package size={14} /> {order.products.length}
          </span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      {isExpanded && (
        <div className="order-details">
          <h4>Products:</h4>
          <ul>
            {order.products.map((product) => (
              <li key={product.id} className="product-item">
                <img
                  src={product.img || "/placeholder.svg?height=50&width=50"}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <span className="product-name">{product.name}</span>
                  <span className="product-ref">Ref: {product.ref}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const OrdersList = () => {
  const [orders, setOrders] = useState([
    {
      clientName: "John Doe",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      address: "123 Main St, Anytown, USA",
      totalPrice: 11,
      products: [
        {
          id: 1,
          name: "Product A",
          ref: "REF-A001",
          img: "/placeholder.svg?height=50&width=50",
        },
        {
          id: 2,
          name: "Product B",
          ref: "REF-B002",
          img: "/placeholder.svg?height=50&width=50",
        },
      ],
      id: 1,
    },
    {
      clientName: "Jane Smith",
      phone: "+1 (555) 987-6543",
      email: "jane.smith@example.com",
      address: "456 Elm St, Othertown, USA",
      totalPrice: 25.5,
      products: [
        {
          id: 3,
          name: "Product C",
          ref: "REF-C003",
          img: "/placeholder.svg?height=50&width=50",
        },
      ],
      id: 2,
    },
    {
      clientName: "Bob Johnson",
      phone: "+1 (555) 246-8135",
      email: "bob.johnson@example.com",
      address: "789 Oak St, Somewhere, USA",
      totalPrice: 37.75,
      products: [
        {
          id: 4,
          name: "Product D",
          ref: "REF-D004",
          img: "/placeholder.svg?height=50&width=50",
        },
        {
          id: 5,
          name: "Product E",
          ref: "REF-E005",
          img: "/placeholder.svg?height=50&width=50",
        },
        {
          id: 6,
          name: "Product F",
          ref: "REF-F006",
          img: "/placeholder.svg?height=50&width=50",
        },
      ],
      id: 3,
    },
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


  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  return (
    <div className="orders-list">
      <h2>Orders List</h2>
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          isExpanded={expandedOrderId === order.id}
          onToggle={() => toggleOrderExpansion(order.id)}
        />
      ))}
    </div>
  )
}

export default OrdersList


