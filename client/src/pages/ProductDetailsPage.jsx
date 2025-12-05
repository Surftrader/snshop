import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProduct(data)

      } catch (err) {
        setError(err.message)
      } finally {
          setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (isLoading) {
    return <div>Loading Product...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Product</h2>
      {product != null ? (
        <div>
          <p>ID: {product.id}</p>
          <p>Name: {product.name}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price} UAH</p>
        </div>
      ) : (
        <p>No product found.</p>
      )}
    </div>
  )
}

export default ProductDetailsPage