import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { useLocation } from 'react-router-dom';

const Loading = () => {
  const { navigate } = useAppContext();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nexturl = query.get('next');

  useEffect(() => {
    if (nexturl) {
      const timer = setTimeout(() => {
        navigate(`/${nexturl}`);
      }, 3000); // redirect after 3s
      return () => clearTimeout(timer);
    }
  }, [nexturl, navigate]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary'></div>
    </div>
  );
};

export default Loading;

