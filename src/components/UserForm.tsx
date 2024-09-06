import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IUser } from '../types/User';
import { useNavigate, useParams } from 'react-router-dom';

interface UserFormProps {
  initialData?: IUser;
}

const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(initialData || {
    id: 0,
    name: '',
    email: '',
    phone: '',
    username: '',
    website: ''
  });
  const { id } = useParams<{ id: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
    } else {
      
      await axios.post('https://jsonplaceholder.typicode.com/users', user);
    }
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-12 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
    <div className="flex flex-col">
    <label htmlFor="name" className="text-lg font-semibold mb-1">Name</label>
    <input 
      type="text" 
      name="name" 
      value={user.name} 
      onChange={handleChange} 
      placeholder="Name" 
      required 
      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="email" className="text-lg font-semibold mb-1">Email</label>
    <input 
      type="email" 
      name="email" 
      value={user.email} 
      onChange={handleChange} 
      placeholder="Email" 
      required 
      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="phone" className="text-lg font-semibold mb-1">Phone</label>
    <input 
      type="text" 
      name="phone" 
      value={user.phone} 
      onChange={handleChange} 
      placeholder="Phone" 
      required 
      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="username" className="text-lg font-semibold mb-1">Username</label>
    <input 
      type="text" 
      name="username" 
      value={user.username} 
      onChange={handleChange} 
      placeholder="Username" 
      required 
      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="website" className="text-lg font-semibold mb-1">Website</label>
    <input 
      type="text" 
      name="website" 
      value={user.website} 
      onChange={handleChange} 
      placeholder="Website" 
      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  <button 
    type="submit" 
    className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
    Submit
  </button>
</form>

  );
};

export default UserForm;
