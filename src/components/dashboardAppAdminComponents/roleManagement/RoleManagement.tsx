import React from "react";

const RoleManagement = () => {
  // Datos ficticios
  const roles = [
    { id: 1, name: "Admin", users: 2 },
    { id: 2, name: "Editor", users: 5 },
  ];

  return (
    <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-screen">
     <div className="bg-[#FFCF91] rounded-t-lg">
        <h2 className="text-xl lg:text-2xl font-semibold text-[#2C2C2C] text-center px-2 py-2 mb-6">
        Gestión de roles
        </h2>
      </div>

      <ul>
        {roles.map(role => (
          <li key={role.id} className="p-2 border-b">
            <strong>{role.name}</strong> - {role.users} users
            <button className="ml-4 px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
