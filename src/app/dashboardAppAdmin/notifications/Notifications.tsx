import React from "react";

const Notifications = () => {
  // Datos ficticios
  const notifications = [
    { id: 1, message: "New user pending approval", date: "2024-10-02" },
    { id: 2, message: "System update available", date: "2024-10-01" },
  ];

  return (
    
    <div className="bg-white shadow-lg rounded-lg px-4 pb-4 lg:py-4 h-full">
      <h2 className="text-2xl mb-4 font-semibold">Notificaciones</h2>
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
