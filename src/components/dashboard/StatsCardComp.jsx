import React from "react";

function StatsCardComp({ title, value, icon, gradientFrom, gradientTo, iconBgColor }) {
  return (
    <div 
      className={`rounded-2xl shadow-md overflow-hidden bg-gradient-to-b ${gradientFrom} ${gradientTo}`}
    >
      <div className="p-4 sm:p-5">
        {/* Icon dalam lingkaran di kiri atas */}
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${iconBgColor} flex items-center justify-center mb-3 sm:mb-4`}>
          <span className="text-base sm:text-xl">{icon}</span>
        </div>
        
        {/* Title */}
        <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">{title}</p>
        
        {/* Value */}
        <p className="text-2xl sm:text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default StatsCardComp;