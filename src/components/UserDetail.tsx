import React, { useState, useEffect } from 'react';
import { IUser } from '../types/User';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
    };
    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      {!user ? <LoadingSpinner /> : (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-4">{user.name}</h1>
          <div className="text-left">
            <p className="text-lg mb-2">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Website:</span> {user.website}
            </p>
          </div>
    </div>
  )}
</div>

  );
};

export default UserDetails;
