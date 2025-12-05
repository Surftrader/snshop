import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductListPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
    );
}

export default App
