import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IUser } from '../types/User';
import { Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import LoadingSpinner from './LoadingSpinner';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false); 
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    setModalOpen(true); 
    setUserIdToDelete(id); 
  };

  const confirmDelete = async () => {
    if (userIdToDelete !== null) {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userIdToDelete}`);
      setUsers(users.filter((user) => user.id !== userIdToDelete));
      setUserIdToDelete(null); 
      setModalOpen(false); 
    }
  };

  const closeModal = () => {
    setModalOpen(false); 
    setUserIdToDelete(null); 
  };

  if (loading) return <p className="text-center text-lg">Loading users...</p>;
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {loading ? <LoadingSpinner /> : <div>      
      <h1 className="text-3xl font-bold text-center mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.phone}</td>
                <td className="py-3 px-6 text-center">
                  <Link to={`/user/${user.id}`} className="text-blue-500 hover:underline mr-3">View</Link>
                  <Link to={`/edit/${user.id}`} className="text-green-500 hover:underline mr-3">Edit</Link>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this user?"
      />
      </div>}
    </div>
  );
};

export default UserList;
