import React, { useState } from "react";
import axios from "axios";

function CreateProduct({ token }) {
  const [name, setName] = useState("");
  const [ref, setRef] = useState("");
  const [img, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("ref", ref);
    if (img) {
      formData.append("img", img);
    }

    try {
      const response = await axios.post("http://localhost:4444/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        setName("");
        setRef("");
        setImg(null);
        alert("New product added successfully");
        // You might want to trigger a refresh of the ProductList here
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-product-form" encType="multipart/form-data">
      <h2>Create New Product</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input
        type="text"
        placeholder="Product reference"
        value={ref}
        onChange={(e) => setRef(e.target.value)}
        required
      />
      <input type="file" name="img" onChange={(e) => setImg(e.target.files[0])} accept="image/*" />
      <button type="submit">Create Product</button>
    </form>
  );
}

export default CreateProduct;