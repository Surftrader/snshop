import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <Link to="/products">
        Go to products
      </Link>
    </div>
  )
}

export default HomePage