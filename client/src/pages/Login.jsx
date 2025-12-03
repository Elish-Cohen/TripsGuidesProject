import { useDispatch } from 'react-redux';
import { login, setStatus } from '../components/features/user/userSlice';
import { useState } from 'react';

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin=async()=>{
    try{
      const res = await fetch('http://localhost:4000/user');
      const users = await res.json();
      const found = users.find(u => u.username === username && u.password === password);

      if (found) {
        dispatch(login(found));
        console.log("name ",found.isAdmin);

      } else {
        dispatch(setStatus('failed'));
        alert('משתמש לא קיים, אתה צריך להירשם למערכת');
      }
    } catch (e) {
      dispatch(setStatus('failed'));
      console.log("name ");
    }
    
  };
  return (
    <div>
      <h2>Login</h2>
      <input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}