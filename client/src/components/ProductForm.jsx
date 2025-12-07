import React, { useState } from 'react';

function ProductForm() {
  // State for storing form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
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

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Sending data...');
    setIsSuccess(false);

    try {
      // We send a POST request to our backend API
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the request is successful (HTTP 201 Created)
        const result = await response.json();
        setMessage(`Продукт успешно создан! ID: ${result.id}`);
        setIsSuccess(true);
        // Clearing the form after successful creation
        setFormData({ name: '', description: '', price: '', image: '' });
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
            Название продукта:*
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
            Описание:
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
            Цена:*
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
            URL изображения:
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <button type="submit">Save product</button>
      </form>
    </div>
  );
}

export default ProductForm;
