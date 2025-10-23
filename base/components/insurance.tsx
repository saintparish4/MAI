import React from 'react';

const InsuranceSection = () => {
  const handleInsuranceClick = (insuranceName: string) => {
    console.log(`Filtering by insurance: ${insuranceName}`);
    // TODO: Implement filtering logic
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            {/* Main Heading */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Find an in-network doctor from over 1,000 insurance plans
            </h2>
            
            {/* Sub-heading */}
            <p className="text-lg text-gray-700">
              Add your insurance to see in-network primary care doctors
            </p>
          </div>
          
          {/* See all link - right aligned */}
          <a 
            href="#" 
            className="text-blue-600 hover:underline text-base whitespace-nowrap mt-2"
          >
            See all (1,000+)
          </a>
        </div>
        
        {/* Insurance Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          {/* Aetna */}
          <button 
            onClick={() => handleInsuranceClick('Aetna')}
            className="flex flex-col items-center justify-center gap-3 px-6 py-8 border border-gray-300 rounded-lg bg-white shadow-sm h-32 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">♥</span>
            </div>
            <span className="text-purple-600 font-semibold text-lg text-center">aetna</span>
          </button>
          
          {/* Cigna */}
          <button 
            onClick={() => handleInsuranceClick('Cigna')}
            className="flex flex-col items-center justify-center gap-3 px-6 py-8 border border-gray-300 rounded-lg bg-white shadow-sm h-32 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🌳</span>
            </div>
            <span className="text-blue-600 font-semibold text-lg text-center">Cigna</span>
          </button>
          
          {/* United Healthcare */}
          <button 
            onClick={() => handleInsuranceClick('United Healthcare')}
            className="flex flex-col items-center justify-center gap-3 px-6 py-8 border border-gray-300 rounded-lg bg-white shadow-sm h-32 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">U</span>
            </div>
            <span className="text-blue-600 font-semibold text-lg text-center">United Healthcare</span>
          </button>
          
          {/* Medicare */}
          <button 
            onClick={() => handleInsuranceClick('Medicare')}
            className="flex flex-col items-center justify-center gap-3 px-6 py-8 border border-gray-300 rounded-lg bg-white shadow-sm h-32 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🦅</span>
            </div>
            <span className="text-blue-600 font-semibold text-lg text-center">Medicare</span>
          </button>
          
          {/* BlueCross BlueShield */}
          <button 
            onClick={() => handleInsuranceClick('BlueCross BlueShield')}
            className="flex flex-col items-center justify-center gap-2 px-6 py-8 border border-gray-300 rounded-lg bg-white shadow-sm h-32 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
                <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
              </div>
            </div>
            <span className="text-blue-600 font-semibold text-lg text-center">BlueCross BlueShield</span>
            <span className="text-xs text-gray-600 font-medium text-center">CHECK LOCAL PLAN FOR COVERAGE</span>
          </button>
        </div>
        
        {/* Call to Action Button - Center Aligned */}
        <div className="text-center">
          <button className="px-12 py-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium text-lg hover:bg-gray-50 hover:border-gray-400 transition-colors">
            Add your insurance coverage
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSection;
