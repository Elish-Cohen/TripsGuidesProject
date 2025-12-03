
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteFromCart, updateCartItem } from "./cartSlice";
// import './CartDrawer.css';
// import { getCart } from "./cartSlice";
// import { useNavigate } from "react-router-dom";
// import checkingOrder from "./checkingOrder";
// import { fetchProducts } from "../product/productSlice";
// export default function CartDrawer({ onClose }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.product.products);
//   const user = useSelector((state) => state.user.currentUser);
//   const cart = useSelector((state) => state.cart.currentCart);

//   const [editedFields, setEditedFields] = useState({});
//   const { validateBooking } = checkingOrder();

//   useEffect(() => {
//     if (user?.id) {
//       dispatch(getCart(user.id));
//     }
//   }, [dispatch, user]);

//   const handleDelete = (userId, productId) => {
//     dispatch(deleteFromCart({ userId, productId }));
//   };

//   const handleEditChange = (productId, field, value) => {
//     setEditedFields((prev) => ({
//       ...prev,
//       [productId]: {
//         ...prev[productId],
//         [field]: value,
//       },
//     }));
//   };

//   const handleUpdate = (userId, productId) => {
//     const fields = editedFields[productId];
//     if (fields) {
//       dispatch(updateCartItem({
//         userId,
//         productId,
//         selectedDate: fields.selectedDate,
//         selectedCount: fields.selectedCount,
//       }));
//     }
//   };

//   const enrichedCart = cart.map(item => {
//     const fullProduct = products.find(p => p.id === item.id);
//     return {
//       ...fullProduct,
//       ...item,
//     };
//   });

//   const total = enrichedCart.reduce((sum, p) => sum + p.pricePerPerson * (p.selectedCount || 1), 0);

//   const handleCheckout = async () => {
//     // רענון המוצרים מהשרת לפני האימות
//     await dispatch(fetchProducts());

//     for (const p of enrichedCart) {
//       const fullProduct = store.getState().product.products
//         .find(prod => prod.id === p.id);
//       if (!validateBooking({
//         product: fullProduct,
//         date: p.selectedDate,
//         count: p.selectedCount
//       })) return;
//     }

//     onClose();
//     navigate('/order-summary-page');
//   };

//   return (
//     <div className="cart-drawer">
//       <button className="close-btn" onClick={onClose}>X</button>
//       <h3>המסלולים שלי</h3>
//       {enrichedCart.map((p) => {
//         const fields = editedFields[p.id] || {
//           selectedDate: p.selectedDate,
//           selectedCount: p.selectedCount,
//         };

//         return (
//           <div key={p.id} className="cart-item">
//             <img src={p.imageUrl} alt={p.location} style={{ width: '80px', borderRadius: '5px' }} />
//             <p>{p.location}</p>
//             <p>תאריך: {p.selectedDate}</p>
//             <p>משתתפים: {p.selectedCount}</p>

//             <p>עדכון תאריך</p>
//             <input
//               type="date"
//               value={fields.selectedDate}
//               onChange={(e) => handleEditChange(p.id, 'selectedDate', e.target.value)}
//             />

//             <p>עדכון מספר משתתפים</p>
//             <input
//               type="number"
//               value={fields.selectedCount}
//               onChange={(e) => handleEditChange(p.id, 'selectedCount', Number(e.target.value))}
//             />

//             <button onClick={() => handleUpdate(user.id, p.id)}>
//               עדכן
//             </button>

//             <button onClick={() => handleDelete(user.id, p.id)}>
//               🗑️ הסרה
//             </button>
//           </div>
//         );
//       })}

//       <div className="total">סה"כ לתשלום: ₪{total}</div>
//       <button
//         className="checkout-btn"
//         onClick={handleCheckout}
//       >
//         מעבר להזמנה
//       </button>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateCartItem } from "./cartSlice";
import './CartDrawer.css';
import { getCart } from "./cartSlice";
import { useNavigate } from "react-router-dom";
import checkingOrder from "./checkingOrder";
import { fetchProducts } from "../product/productSlice";

export default function CartDrawer({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.currentCart);

  const [editedFields, setEditedFields] = useState({});
  const { validateBooking } = checkingOrder();

  useEffect(() => {
    if (user?.id) {
      dispatch(getCart(user.id));
    }
  }, [dispatch, user]);

  const handleDelete = (userId, productId) => {
    dispatch(deleteFromCart({ userId, productId }));
  };

  const handleEditChange = (productId, field, value) => {
    setEditedFields((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleUpdate = (userId, productId) => {
    const fields = editedFields[productId];
    if (fields) {
      dispatch(updateCartItem({
        userId,
        productId,
        selectedDate: fields.selectedDate,
        selectedCount: fields.selectedCount,
      }));
    }
  };

  const enrichedCart = cart.map(item => {
    const fullProduct = products.find(p => p.id === item.id);
    return {
      ...fullProduct,
      ...item,
    };
  });

  const total = enrichedCart.reduce((sum, p) => sum + p.pricePerPerson * (p.selectedCount || 1), 0);

  const handleCheckout = async () => {
    await dispatch(fetchProducts());
    const updatedProducts = await dispatch(fetchProducts()).then(res => res.payload || []);

    for (const p of enrichedCart) {
      const fullProduct = updatedProducts.find(prod => prod.id === p.id);
      if (!validateBooking({
        product: fullProduct,
        date: p.selectedDate,
        count: p.selectedCount
      })) return;
    }

    onClose();
    navigate('/order-summary-page');
  };

  return (
    <div className="cart-drawer">
      <button className="close-btn" onClick={onClose}>X</button>
      <h3>המסלולים שלי</h3>
      {enrichedCart.map((p) => {
        const fields = editedFields[p.id] || {
          selectedDate: p.selectedDate,
          selectedCount: p.selectedCount,
        };

        return (
          <div key={p.id} className="cart-item">
            <img src={p.imageUrl} alt={p.location} style={{ width: '80px', borderRadius: '5px' }} />
            <p>{p.location}</p>
            <p>תאריך: {p.selectedDate}</p>
            <p>משתתפים: {p.selectedCount}</p>

            <p>עדכון תאריך</p>
            <input
              type="date"
              value={fields.selectedDate}
              onChange={(e) => handleEditChange(p.id, 'selectedDate', e.target.value)}
            />

            <p>עדכון מספר משתתפים</p>
            <input
              type="number"
              value={fields.selectedCount}
              onChange={(e) => handleEditChange(p.id, 'selectedCount', Number(e.target.value))}
            />

            <button onClick={() => handleUpdate(user.id, p.id)}>
              עדכן
            </button>

            <button onClick={() => handleDelete(user.id, p.id)}>
              🗑️ הסרה
            </button>
          </div>
        );
      })}

      <div className="total">סה"כ לתשלום: ₪{total}</div>
      <button
        className="checkout-btn"
        onClick={handleCheckout}
      >
        מעבר להזמנה
      </button>
    </div>
  );
}
