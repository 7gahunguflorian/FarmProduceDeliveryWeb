import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import { User } from '../types';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getAll().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded shadow p-4 flex items-center gap-4">
            <img src={user.profileImageUrl || '/placeholder.png'} alt={user.name} className="w-16 h-16 object-cover rounded-full" />
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <div className="text-gray-600">{user.email}</div>
              <div className="text-sm text-gray-500">Role: {user.role}</div>
              <div className="text-sm text-gray-500">Username: {user.username}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage; 