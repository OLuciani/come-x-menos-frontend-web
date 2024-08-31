import React from "react";

const EffectiveSales: React.FC = () => {
  // Datos de ejemplo, en la práctica, estos se obtendrían de una API o contexto
  const salesData = [
    { id: 1, discountTitle: "Descuento en Cafés", salesAmount: 300, date: "2024-08-01" },
    { id: 2, discountTitle: "Descuento en Pasteles", salesAmount: 450, date: "2024-08-02" },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6 h-full">
      <h2 className="text-xl lg:text-2xl font-semibold mb-4">Ventas Efectivas por Descuentos</h2>
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
