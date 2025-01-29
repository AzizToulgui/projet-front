import React, { useState } from "react"

function CreateProduct({ token }) {
  const [name, setName] = useState("")
  const [ref, setRef] = useState("")
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("ref", ref)
    if (image) {
      formData.append("image", image)
    }

    try {
      const response = await fetch("http://localhost:4444/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
      const data = await response.json()
      if (data.msg === "New product added successfully") {
        setName("")
        setRef("")
        setImage(null)
      }
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="create-product-form">
      <h2>Create New Product</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input
        type="text"
        placeholder="Product reference"
        value={ref}
        onChange={(e) => setRef(e.target.value)}
        required
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
      <button type="submit">Create Product</button>
    </form>
  )
}

export default CreateProduct

