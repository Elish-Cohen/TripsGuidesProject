import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postOrder } from "./orderSlice";
import { updateProducts } from "../product/productSlice";
import checkingOrder from "../cart/checkingOrder";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Alert,
  Slide
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OrderSummaryPage = () => {
  const { updateBookings } = checkingOrder();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.currentCart || []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    creditCard: "",
    expiry: "",
    cvv: "",
  });
  const [success, setSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [tourName, setTourName] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    const { name, phone, creditCard, expiry, cvv } = form;

    const isNameValid = name.trim().length > 0;
    const isPhoneValid = /^[0-9]{9,}$/.test(phone);
    const isCardValid = /^[0-9]{16}$/.test(creditCard);
    const isExpiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
    const isCvvValid = /^[0-9]{3,4}$/.test(cvv);

    if (
      !isNameValid ||
      !isPhoneValid ||
      !isCardValid ||
      !isExpiryValid ||
      !isCvvValid ||
      cart.length === 0
    ) {
      alert("יש למלא את כל השדות בצורה תקינה.");
      return;
    }

    const orderData = {
      userId: user.id,
      name,
      phone,
      items: cart,
    };

    dispatch(postOrder(orderData)).then(() => {
      cart.forEach(item => {
        const updated = updateBookings({ product: item, date: item.selectedDate, count: item.selectedCount });
        dispatch(updateProducts({ id: item.id, data: updated }));
      });

      const firstItem = cart[0];
      setTourName(firstItem.location);
      setSelectedDate(firstItem.selectedDate);
      setSuccess(true);
    });

  };

  if (success) {
    return (
      <Slide in direction="up">
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            הזמנתך בוצעה בהצלחה! מחכים לכם ב-{selectedDate} ב-{tourName}
          </Alert>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            חזרה לאתר
          </Button>
        </Box>
      </Slide>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>סיכום הזמנה</Typography>
      <Grid container spacing={2}>
        {cart.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.imageUrl}
                alt={item.location}
              />
              <CardContent>
                <Typography variant="h6">{item.location}</Typography>
                <Typography>תאריך: {item.selectedDate}</Typography>
                <Typography>משתתפים: {item.selectedCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>פרטי תשלום</Typography>

        <TextField
          required
          fullWidth
          label="שם"
          name="name"
          margin="normal"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          label="מספר טלפון"
          name="phone"
          margin="normal"
          value={form.phone}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          label="מספר כרטיס אשראי"
          name="creditCard"
          margin="normal"
          value={form.creditCard}
          onChange={handleChange}
          inputProps={{ maxLength: 16 }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="תוקף (MM/YY)"
              name="expiry"
              margin="normal"
              value={form.expiry}
              onChange={handleChange}
              placeholder="08/27"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="CVV"
              name="cvv"
              margin="normal"
              value={form.cvv}
              onChange={handleChange}
              inputProps={{ maxLength: 4 }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOrder}
          sx={{ mt: 2 }}
        >
          בצע הזמנה
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSummaryPage;
