import React from "react";

const EffectiveSales: React.FC = () => {
  // Datos de ejemplo, en la práctica, estos se obtendrían de una API o contexto
  const salesData = [
    { id: 1, discountTitle: "Descuento en Cafés", salesAmount: 300, date: "2024-08-01" },
    { id: 2, discountTitle: "Descuento en Pasteles", salesAmount: 450, date: "2024-08-02" },
  ];

  return (
    <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-screen">
      <div className="bg-[#FFCF91] rounded-t-lg">
        <h2 className="text-xl lg:text-2xl font-semibold text-[#2C2C2C] text-center px-2 py-4 mb-6">Ventas</h2>
      </div>
      
      <div className="space-y-4">
        {salesData.map((sale) => (
          <div key={sale.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <h3 className="text-lg font-medium">{sale.discountTitle}</h3>
              <p className="text-sm text-gray-600">Fecha: {sale.date}</p>
            </div>
            <p className="text-xl font-semibold">${sale.salesAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EffectiveSales;
