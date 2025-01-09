import React from "react";

const ActivityLogs = () => {
  // Datos ficticios
  const logs = [
    { id: 1, activity: "User John Doe logged in", date: "2024-10-02 10:00" },
    {
      id: 2,
      activity: "Admin Jane Smith approved user",
      date: "2024-10-02 12:00",
    },
  ];

  return (
    <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-screen">
      <div className="bg-[#FFCF91] rounded-t-lg">
        <h2 className="text-xl lg:text-2xl font-bold text-[#2C2C2C] text-center px-2 py-2 mb-6">
          Registros de actividad
        </h2>
      </div>

      <ul>
        {logs.map((log) => (
          <li key={log.id} className="p-2 border-b">
            {log.activity} - <em>{log.date}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLogs;
