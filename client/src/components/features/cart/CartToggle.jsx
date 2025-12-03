// // import React, { useState } from 'react';
// // import { ShoppingCart } from 'lucide-react';
// // import MyToursSidebar from './MyToursSidebar';
// // const CartToggle = ({ userId, onCheckout }) => {
// //   const [isOpen, setIsOpen] = useState(false);

// //   const handleToggle = () => setIsOpen((prev) => !prev);

// //   return (
// //     <>
// //       <button
// //         onClick={handleToggle}
// //         className="fixed top-4 left-4 z-40 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
// //         title="הצג את המסלולים שלי"
// //       >
// //         <ShoppingCart size={20} />
// //       </button>
// //       <MyToursSidebar
// //         isOpen={isOpen}
// //         onClose={() => setIsOpen(false)}
// //         userId={userId}
// //         onCheckout={onCheckout}
// //       />
// //     </>
// //   );
// // };

// // export default CartToggle;
// import React, { useState } from 'react';
// import { IconButton } from '@mui/material';
// import { ShoppingCart } from '@mui/icons-material';
// import MyToursSidebar from './MyToursSidebar';
// const CartToggle = ({ userId, onCheckout }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const handleToggle = () => setIsOpen((prev) => !prev);

//   return (
//     <>
//       <IconButton
//         onClick={handleToggle}
//         sx={{
//           position: 'fixed',
//           top: 16,
//           left: 16,
//           zIndex: 1400,
//           backgroundColor: '#1976d2',
//           color: 'white',
//           '&:hover': { backgroundColor: '#1565c0' }
//         }}
//       >
//         <ShoppingCart />
//       </IconButton>
//       <MyToursSidebar
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         userId={userId}
//         onCheckout={onCheckout}
//       />
//     </>
//   );
// };

// export default CartToggle;
