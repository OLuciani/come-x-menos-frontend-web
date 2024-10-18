import React from "react";

const ActivityLogs = () => {
  // Datos ficticios
  const logs = [
    { id: 1, activity: "User John Doe logged in", date: "2024-10-02 10:00" },
    { id: 2, activity: "Admin Jane Smith approved user", date: "2024-10-02 12:00" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-semibold">Registros de actividad</h2>
      <ul>
        {logs.map(log => (
          <li key={log.id} className="p-2 border-b">
            {log.activity} - <em>{log.date}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLogs;
