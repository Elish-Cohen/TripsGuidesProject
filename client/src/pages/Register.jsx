import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRegisters } from '../components/features/user/usersSlice';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', username: '', password: '', email: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    dispatch(fetchRegisters({...form,isAdmin:false}));
  };

  return (
    <div>
      <h2>Register</h2>
      <input name="username" placeholder="username" onChange={handleChange} />
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

