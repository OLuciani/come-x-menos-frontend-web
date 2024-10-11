import React from "react";

const RoleManagement = () => {
  // Datos ficticios
  const roles = [
    { id: 1, name: "Admin", users: 2 },
    { id: 2, name: "Editor", users: 5 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-semibold">Gestión de roles</h2>
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
