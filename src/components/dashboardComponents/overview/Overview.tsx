import React from "react";
import { FaChartLine, FaUsers, FaTags } from "react-icons/fa";

const Overview: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6 h-full">
      <div className="bg-orange-600">
        <h2 className="text-xl lg:text-2xl font-semibold text-[#FFCF91] text-center lg:text-l pl-6 py-4 mb-6">Resumen</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Ventas Totales */}
        <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow-md">
          <FaChartLine className="text-blue-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Ventas Totales</h3>
            <p className="text-gray-700">$1,200</p>
          </div>
        </div>
        
        {/* Usuarios Activos */}
        <div className="flex items-center bg-green-100 p-4 rounded-lg shadow-md">
          <FaUsers className="text-green-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Usuarios Activos</h3>
            <p className="text-gray-700">150</p>
          </div>
        </div>
        
        {/* Descuentos Activos */}
        <div className="flex items-center bg-yellow-100 p-4 rounded-lg shadow-md">
          <FaTags className="text-yellow-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Descuentos Activos</h3>
            <p className="text-gray-700">5</p>
          </div>
        </div>
      </div>

      {/* Sección adicional */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Resumen de Actividad</h3>
        <p className="text-gray-700">
          Este es el resumen de la actividad reciente en tu cuenta. Aquí puedes ver las métricas clave y las estadísticas de rendimiento.
        </p>
        {/* Aquí podrías agregar gráficos o tablas adicionales según sea necesario */}
      </div>
    </div>
  );
};

export default Overview;


