// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers } from './usersSlice';
// import { Card, CardContent } from "@/components/ui/card"; // אם אתה לא משתמש ב-shadcn, תחליף ל־div
// import './AllUsers.css'; // עיצוב נפרד

// const AllUsers = () => {
//   const dispatch = useDispatch();
//   const { users, status } = useSelector(state => state.user);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchUsers());
//     }
//   }, [dispatch, status]);

//   if (status === 'loading') return <p>טוען משתמשים...</p>;
//   if (status === 'failed') return <p>אירעה שגיאה בעת טעינת המשתמשים.</p>;

//   return (
//     <div className="users-grid">
//       {users.map(user => (
//         <Card key={user.id} className="user-card">
//           <div className="image-container">
//             <img src={user.imgurl} alt={user.name} className="profile-pic" />
//           </div>
//           <CardContent>
//             <p><strong>שם:</strong> {user.name}</p>
//             <p><strong>שם משתמש:</strong> {user.username}</p>
//             <p><strong>מייל:</strong> {user.email}</p>
//             <p><strong>סיסמה:</strong> {user.password}</p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default AllUsers;
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from './usersSlice';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersList.users);
  const status = useSelector((state) => state.usersList.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>טוען משתמשים...</p>;
  if (status === "failed") return <p>שגיאה בטעינת המשתמשים.</p>;

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
    //   {users.map((user) => (
    //     <div
    //       key={user.id}
    //       className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center"
    //     >
    //       <img
    //         src={user.imgurl || "/default-avatar.png"}
    //         alt={user.name}
    //         className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-200"
    //       />
    //       <h2 className="text-lg font-semibold mb-1">{user.name}</h2>
    //       <p className="text-gray-600 text-sm">שם משתמש: {user.username}</p>
    //       <p className="text-gray-600 text-sm">אימייל: {user.email}</p>
    //       <p className="text-gray-500 text-xs mt-2">ID: {user.id}</p>
    //     </div>
    //   ))}
    // </div>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', mt: 4 }}>
      {users?.map((user) => (
        <Card key={user.id} sx={{ width: 240, borderRadius: 4, boxShadow: 3, textAlign: 'center' }}>
          <CardContent>
            <Avatar
              src={user.imgUrl}
              alt={user.name}
              sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.isAdmin ? 'מנהל' : 'משתמש רגיל'}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AllUsers;
