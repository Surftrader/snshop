import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProductForm() {
  const navigate = useNavigate()
  // State for storing form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Handler for changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Sending data...');
    setIsSuccess(false);

    const dataToSend = new FormData();

    const productDtoJson = JSON.stringify({
        ...formData,
        price: parseFloat(formData.price)
    });

    const productBlob = new Blob([productDtoJson], {
        type: 'application/json'
    });

    dataToSend.append('product', productBlob);

    if (selectedFile) {
        dataToSend.append('file', selectedFile, selectedFile.name);
    }

    try {
      // We send a POST request to our backend API
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        body: dataToSend,
      });

      if (response.ok) {
        // If the request is successful (HTTP 201 Created)
        setMessage(`Product successfully created! Redirect...!`);
        setIsSuccess(true);
        setTimeout(() => {
            navigate('/products');
            }, 1000);
      } else {
        // If there is a validation error (400 Bad Request) or other error
        const errorData = await response.json();
        console.error('Error creating product:', errorData);
        setMessage(`Error: ${JSON.stringify(errorData)}`);
        setIsSuccess(false);
      }
    } catch (error) {
      // Ошибка сети
      console.error('Network error:', error);
      setMessage('A network error occurred. Please make sure the backend is running.');
      setIsSuccess(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Добавить новый продукт</h2>

      {/* Status message */}
      {message && (
        <div style={{ color: isSuccess ? 'green' : 'red', marginBottom: '10px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Product name:*
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Price:*
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Upload image:
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
          {/* Показываем имя выбранного файла */}
          {selectedFile && <p style={{fontSize: '0.9em', color: '#555'}}>Selected file: **{selectedFile.name}**</p>}
        </div>
        <br />
        <button type="submit">Save product</button>
      </form>
    </div>
  );
}

export default ProductForm;
