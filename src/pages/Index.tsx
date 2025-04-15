
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the landing page
    navigate('/');
  }, [navigate]);
  
  return null; // Nothing to render, as we're redirecting
};

export default Index;
