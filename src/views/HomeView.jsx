import React from 'react';
import computerStoreData from '../data'; 
import Cards from '../components/Cards/Cards';

const HomeView = () => {
  return (
    <div className="container mt-4">
      <Cards products={computerStoreData} /> 
    </div>
  );
}

export default HomeView;
