import { Outlet } from 'react-router-dom';
import React from 'react';

function Layout() {
  return (
    <>
      <header style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
          {/* Navigation */}
        <nav>HEADER</nav>
      </header>

      <main style={{ padding: '20px' }}>
        {/* !!! IMPORTANT: Child routes will be rendered here !!! */}
        <Outlet />
      </main>

      <footer>
        <p>© 2025 SNshop</p>
      </footer>
    </>
  );
}

export default Layout
