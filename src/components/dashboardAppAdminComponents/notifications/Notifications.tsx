import React from "react";

const Notifications = () => {
  // Datos ficticios
  const notifications = [
    { id: 1, message: "New user pending approval", date: "2024-10-02" },
    { id: 2, message: "System update available", date: "2024-10-01" },
  ];

  return (
    
    <div className="bg-white shadow-lg rounded-lg px-4 pb-4 lg:py-4 h-full">
      <div className="bg-orange-600 rounded-t-lg">
        <h2 className="text-xl lg:text-2xl font-semibold text-[#FFCF91] text-center lg:text-l pl-6 py-2 mb-6">
          Notificaciones
        </h2>
      </div>

      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className="p-2 border-b">
            <strong>{notification.message}</strong> - <em>{notification.date}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
