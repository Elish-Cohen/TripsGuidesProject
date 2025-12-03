// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppBar, Avatar, MenuItem, Menu, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
// import { Home, Info, LockOpen, PersonAdd, Map, Group, ShoppingCart, AccountCircle } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import { logout } from './features/user/userSlice';
// import PersonIcon from '@mui/icons-material/Person';
// import CartToggle from './features/cart/CartToggle';
// export default function MainMenu() {
//   const user = useSelector((state) => state.user.currentUser);
//   const dispatch = useDispatch();
//   const role = user?.isAdmin ? 'admin' : user ? 'user' : 'guest';

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handelMenueOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handelMenueClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.removeItem('user');
//     handelMenueClose();
//   };

//   const navItems = [
//     { label: 'דף הבית', icon: <Home />, path: '/', role: 'all' },
//     { label: 'אודות', icon: <Info />, path: '/about', role: 'all' },
//     { label: 'המסלולים שלנו', icon: <Map />, path: '/AllProducts', role: 'all' },
//     // { label: 'המסלולים שלי', icon: <PersonPinCircle />, path: '/my-tours', role: 'user' }, // הוסרה
//     { label: 'הזמנות', icon: <ShoppingCart />, path: '/orders', role: 'admin' },
//     { label: 'משתמשים', icon: <Group />, path: '/users', role: 'admin' },
//     { label: 'הרשמה', icon: <PersonAdd />, path: '/register', role: 'guest' },
//     { label: 'התחברות', icon: <LockOpen />, path: '/login', role: 'guest' },
//   ];

//   const handleCheckout = () => {
//     // הפנייה לעמוד ההזמנה
//     window.location.href = '/checkout';
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           מערכת ניהול סיורים
//         </Typography>

//         {/* כפתור הסל בצד שמאל למעלה */}
//         {user && <CartToggle userId={user.id} onCheckout={handleCheckout} />}

//         <Box sx={{ display: 'flex', gap: 2 }}>
//           {navItems
//             .filter((item) => item.role === role || item.role === 'all')
//             .map(({ label, icon, path }) => (
//               <Button key={path} color="inherit" component={Link} to={path} startIcon={icon}>
//                 {label}
//               </Button>
//             ))}
//         </Box>

//         {user && (
//           <Box>
//             <IconButton onClick={handelMenueOpen}>
//               <Avatar>
//                 <PersonIcon />
//               </Avatar>
//             </IconButton>
//             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handelMenueClose}>
//               <MenuItem disabled>
//                 <Typography>שלום {user.name}</Typography>
//               </MenuItem>
//               <MenuItem onClick={handleLogout}>התנתק</MenuItem>
//             </Menu>
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }
import React, { useState } from 'react';
import { AppBar, Avatar, MenuItem, Menu, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import { Home, Info, LockOpen, PersonAdd, Map, Group, ShoppingCart, PersonPinCircle, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/user/userSlice';
import PersonIcon from '@mui/icons-material/Person';
import CartDrawer from './features/cart/CartDrawer';
import { getAllCarts } from './features/cart/cartSlice';
import { useEffect } from 'react';
export default function MainMenu() {
  useEffect(() => {
    dispatch(getAllCarts());
  }, []);
  const user = useSelector((state) => state.user.currentUser);
  const role = user?.isAdmin ? 'admin' : user ? 'user' : 'guest';
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handelMenueOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handelMenueClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    handelMenueClose();
  };

  const navItems = [
    { label: 'דף הבית', icon: <Home />, path: '/', role: 'all' },
    { label: 'קטגוריות', icon: <Info />, path: 'category-grid', role: 'all' },
    { label: 'אודות', icon: <Info />, path: '/about', role: 'all' },
    { label: 'המסלולים שלנו', icon: <Map />, path: '/AllProducts', role: 'all' },
    { label: 'הזמנות', icon: <ShoppingCart />, path: '/admin-orders-list', role: 'admin' },
    { label: 'משתמשים', icon: <Group />, path: '/all-Users', role: 'admin' },
    { label: 'הרשמה', icon: <PersonAdd />, path: '/register', role: 'guest' },
    { label: 'התחברות', icon: <LockOpen />, path: '/login', role: 'guest' },
  ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          מערכת ניהול סיורים
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.filter(item => item.role === role || item.role === 'all')
            .map(({ label, icon, path }) => (
              <Button
                key={path}
                color="inherit"
                component={Link}
                to={path}
                startIcon={icon}
              >
                {label}
              </Button>
            ))}

          {role === 'user' && (
            <Button
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              startIcon={<PersonPinCircle />}
            >
              המסלולים שלי
            </Button>
          )}
        </Box>

        {user && (
          <Box>
            <IconButton onClick={handelMenueOpen}>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handelMenueClose}>
              <MenuItem disabled>
                <Typography>שלום {user.name}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>התנתק</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>

      {drawerOpen && <CartDrawer onClose={() => setDrawerOpen(false)} />}
    </AppBar>
  );
}
