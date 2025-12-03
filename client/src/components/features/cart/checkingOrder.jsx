import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const checkingOrder = () => {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const validateBooking = ({ product, date, count }) => {
    if (!date || count < 1) {
      alert("יש לבחור תאריך וכמות משתתפים");
      return false;
    }

    if (!user) {
      alert("יש להתחבר כדי להוסיף לסיורים שלי");
      navigate("/login");
      return false;
    }

    if (count > product.maxPeople) {
      alert(`לא ניתן להזמין יותר מ-${product.maxPeople} משתתפים`);
      return false;
    }

    const bookings = product.bookings || {};
    const booked = bookings[date] || 0;
    const available = product.maxPeople - booked;

    if (count > available) {
      alert(`בתאריך זה פנויים רק ${available} מקומות`);
      return false;
    }

    return true;
  };

  const updateBookings = ({ product, date, count }) => {
    const updated = { ...product };
    const bookings = { ...product.bookings };

    bookings[date] = (bookings[date] || 0) + count;
    updated.bookings = bookings;

    return updated;
  };

  return { validateBooking, updateBookings };
};
export default checkingOrder;