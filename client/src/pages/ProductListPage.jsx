import React, { useState, useEffect } from 'react'

function ProductListPage() {
  // State for storing the list of products (initially an empty array)
  const [products, setProducts] = useState([])
  // Status for monitoring the download process
  const [isLoading, setIsLoading] = useState(true)
  // State for error handling if the request fails
  const [error, setError] = useState(null)

  // useEffect will be executed once after the first render of the component
  useEffect(() => {
    // Asynchronous function for receiving data
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProducts(data)

      } catch (err) {
        setError(err.message)
      } finally {
          setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // --- Conditional rendering ---

  if (isLoading) {
    return <div>Loading Products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Product List</h2>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} — ${product.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  )
}

export default ProductListPage