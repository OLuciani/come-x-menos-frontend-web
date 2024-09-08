/* import React from 'react';

const Dashboard = () => {
  return (
    <div>
        <h1 className='mt-5 text-3xl text-center pb-5'>Dashboard</h1>
    </div>
  )
}

export default Dashboard; */



/* import React, { useEffect, useState, useContext } from 'react';
import { getDashboardData, DashboardData } from "@/services/apiCall";
import Header from '../../components/dashboardComponents/headerDashboard';
import Sidebar from '../../components/dashboardComponents/sidebarDashboard';
import { Line, Bar } from 'react-chartjs-2';
import { Context } from "@/context/Context";

const Dashboard: React.FC = () => {
  const { userToken } = useContext(Context);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData(userToken);
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    
    fetchData();
  }, []);

  if (!dashboardData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Descuentos Totales</h2>
            <p>{dashboardData.totalDiscounts}</p>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Usuarios Activos</h2>
            <p>{dashboardData.activeUsers}</p>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Descuentos Canjeados</h2>
            <p>{dashboardData.redeemedDiscounts}</p>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Uso de Descuentos</h2>
            <Line
              data={{
                labels: dashboardData.usageOverTime.labels,
                datasets: [{
                  label: 'Descuentos Canjeados',
                  data: dashboardData.usageOverTime.data,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 2,
                  fill: false,
                }]
              }}
            />
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Descuentos por Tipo de Negocio</h2>
            <Bar
              data={{
                labels: dashboardData.discountsByType.labels,
                datasets: [{
                  label: 'Descuentos',
                  data: dashboardData.discountsByType.data,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                }]
              }}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; */



/* import React, { useEffect, useState } from 'react';
import Header from '../../components/dashboardComponents/headerDashboard';
import Sidebar from '../../components/dashboardComponents/sidebarDashboard';
import { Line, Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { DashboardData } from '@/services/apiCall';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Datos estáticos para visualizar el dashboard
    const staticData: DashboardData = {
      totalDiscounts: 150,
      activeUsers: 75,
      redeemedDiscounts: 50,
      usageOverTime: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        data: [10, 20, 30, 40, 50, 60],
      },
      discountsByType: {
        labels: ['Restaurantes', 'Bares', 'Panaderías', 'Cafeterías'],
        data: [40, 30, 20, 10],
      },
    };

    // Simula la carga de datos
    setTimeout(() => {
      setDashboardData(staticData);
    }, 1000);
  }, []);

  if (!dashboardData) return <div>Loading...</div>;

  const lineChartData: ChartData<'line'> = {
    labels: dashboardData.usageOverTime.labels,
    datasets: [{
      label: 'Descuentos Canjeados',
      data: dashboardData.usageOverTime.data,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false,
    }],
  };

  const barChartData: ChartData<'bar'> = {
    labels: dashboardData.discountsByType.labels,
    datasets: [{
      label: 'Descuentos',
      data: dashboardData.discountsByType.data,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Descuentos Totales</h2>
            <p>{dashboardData.totalDiscounts}</p>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Usuarios Activos</h2>
            <p>{dashboardData.activeUsers}</p>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Descuentos Canjeados</h2>
            <p>{dashboardData.redeemedDiscounts}</p>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Uso de Descuentos</h2>
            <Line data={lineChartData} />
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Descuentos por Tipo de Negocio</h2>
            <Bar data={barChartData} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; */



/* import React, { useEffect, useState } from 'react';
import Header from '../../components/dashboardComponents/headerDashboard';
import Sidebar from '../../components/dashboardComponents/sidebarDashboard';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData } from 'chart.js';
import { DashboardData } from '@/services/apiCall';

// Registro de componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Datos estáticos para visualizar el dashboard
    const staticData: DashboardData = {
      totalDiscounts: 150,
      activeUsers: 75,
      redeemedDiscounts: 50,
      usageOverTime: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        data: [10, 20, 30, 40, 50, 60],
      },
      discountsByType: {
        labels: ['Restaurantes', 'Bares', 'Panaderías', 'Cafeterías'],
        data: [40, 30, 20, 10],
      },
    };

    // Simula la carga de datos
    setTimeout(() => {
      setDashboardData(staticData);
    }, 1000);
  }, []);

  if (!dashboardData) return <div className='text-center text-lg mt-[15%]'>Cargando datos...</div>;

  const lineChartData: ChartData<'line'> = {
    labels: dashboardData.usageOverTime.labels,
    datasets: [{
      label: 'Descuentos Canjeados',
      data: dashboardData.usageOverTime.data,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false,
    }],
  };

  const barChartData: ChartData<'bar'> = {
    labels: dashboardData.discountsByType.labels,
    datasets: [{
      label: 'Descuentos',
      data: dashboardData.discountsByType.data,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Descuentos Totales</h2>
            <p>{dashboardData.totalDiscounts}</p>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Usuarios Activos</h2>
            <p>{dashboardData.activeUsers}</p>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Descuentos Canjeados</h2>
            <p>{dashboardData.redeemedDiscounts}</p>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Uso de Descuentos</h2>
            <Line data={lineChartData} />
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Descuentos por Tipo de Negocio</h2>
            <Bar data={barChartData} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; */



"use client"
import React, { useState, useContext, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { discountsList, DiscountsList } from "@/services/apiCall";
import SidebarDashboard from "@/components/dashboardComponents/sidebarDashboard";
import HeaderDashboard from "@/components/dashboardComponents/headerDashboard";
import Overview from "@/components/dashboardComponents/overview/Overview";
import DashboardDiscounts from "@/components/dashboardComponents/dashboardDiscounts/DashboardDiscounts";
import EffectiveSales from "@/components/dashboardComponents/effectiveSales/EffectiveSales";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { isAfter, format } from "date-fns";

interface ErrorResponse {
  error: string;
}

const Dashboard: React.FC = () => {
  const { userToken, setUserToken, isLoggedIn, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption } = useContext(Context);
  const [section, setSection] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>([]);
  const [totalDiscounts, setTotalDiscounts] = useState<number>(0);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    const cookieBusinessName = Cookies.get("businessName") || "";
    setBusinessName(cookieBusinessName);

    const cookieBusinessType = Cookies.get("businessType") || "";
    setBusinessType(cookieBusinessType);

    setSelectedOption("Mi cuenta");
  }, [setSelectedOption, setBusinessName, setBusinessType, setUserName, setUserRole]);

  

  const renderSection = () => {
    switch (section) {
      case "resumen":
        return <Overview />;
      case "descuentos":
        return <DashboardDiscounts />;
      case "ventas":
        return <EffectiveSales />;
      default:
        return <Overview />;
    }
  };


  const fetchDiscounts = async () => {
    try {
      if (userToken) {
        console.log("Valor de userToken en fetchDiscounts: ", userToken);
        const response = await discountsList();

        if (response === "Token inválido o expirado en discountList") {
          setIsModalOpen(true); 
        }
        if (typeof response !== "string") {
          const now = new Date();
          const validDiscounts = response.filter(
            (discount) =>
              !discount.validityPeriod ||
              !isAfter(
                now,
                new Date(discount.startDateTime).setDate(
                  new Date(discount.startDateTime).getDate() +
                    discount.validityPeriod
                )
              )
          );
          setDiscountsArrayList(validDiscounts);
        } else {
          console.error("Error al obtener descuentos: ", response);
        }
      } else {
        console.error(
          "No se puede obtener descuentos, falta businessId o userToken"
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage =
          axiosError.response?.data.error ||
          "Error en la solicitud de actualización";
        console.error("Error al obtener descuentos: ", errorMessage);
      } else {
        console.error("Error desconocido al obtener descuentos: ", error);
      }
    } 
  };

  useEffect(() => {
    if (userToken) {
      fetchDiscounts();
    }
  }, [userToken]);

  useEffect(() => {
    if (discountsArrayList.length > 0) {
      setTotalDiscounts(discountsArrayList.length);
    } else {
      setTotalDiscounts(0); // En caso de que no haya descuentos, asegurarse de que totalDiscounts sea 0.
    }
  }, [discountsArrayList, setTotalDiscounts]);
  

  /* return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <SidebarDashboard setSection={setSection} />
      <main className="flex-grow p-4 lg:p-8 bg-gray-100">
      
        {renderSection()}
      </main>
    </div>
  );
}; */
return (
  <>
    <TokenExpiredModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />

    <div className="flex flex-col lg:flex-row min-h-screen">
      <header className="w-full bg-[#FFCF91] p-2 flex justify-around fixed lg:hidden">
        <button
          onClick={() => setSection("resumen")}
          className={section === "resumen" ? "text-[#FD7B03] font-bold" : "text-gray-700"}
        >
          Resumen
        </button>
        <button
          onClick={() => setSection("descuentos")}
          className={section === "descuentos" ? "text-[#FD7B03] font-bold" : "text-gray-700"}
        >
          Descuentos
        </button>
        <button
          onClick={() => setSection("ventas")}
          className={section === "ventas" ? "text-[#FD7B03] font-bold" : "text-gray-700"}
        >
          Ventas
        </button>
      </header>

      <div className="hidden lg:block">
        <SidebarDashboard setSection={setSection} />
      </div>
        
      <main className="flex-grow p-4 lg:p-8 bg-gray-100 mt-4 lg:mt-0">
        {renderSection()}
      </main>
    </div>
  </>
);
};

export default Dashboard;

