import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Duration of the loader

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="min-h-screen bg-[#13141f] pt-16">
      {loading && <Loader />}
      {children}
    </div>
  );
};

export default Layout;