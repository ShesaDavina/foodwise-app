import React from 'react';
import SidebarComp from '../components/SidebarComp';
import FormComp from '../components/FormComp';

const AddFood = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarComp />
      
      <div className="flex-1 p-8">
        <FormComp />
      </div>
    </div>
  );
};

export default AddFood;