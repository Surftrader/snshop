import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductForm from './components/ProductForm';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductListPage />} />
            <Route path="products/:id" element={<ProductDetailsPage />} />
            <Route path="products/add" element={<ProductForm />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
    );
}

export default App
