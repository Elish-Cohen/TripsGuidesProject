
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProducts } from "./productSlice";
import OneProduct from "./OneProduct";
import { Button, TextField, MenuItem, Box, Typography, Grid } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import checkingOrder from "../cart/checkingOrder";
import { addToCart } from "../cart/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";

const ageOptions = ["3-10", "8-18", "12-60", "60+"];
const regions = ["נגב", "אילת והערבה", "צפון", "דרום", "מרכז", "שפלה", "ירושלים והסביבה"];

const AllProducts = () => {
  const location = useLocation();
  const initialFilterRegion = location.state?.preFilterRegion || "";
  const user = useSelector((state) => state.user.currentUser);
  const role = user?.isAdmin ? 'admin' : user ? 'user' : 'guest';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products = [], status } = useSelector((state) => state.product || {});
  const [selectedId, setSelectedId] = useState(null);
  const [count, setCount] = useState(1);
  const [date, setDate] = useState("");
  const [filterRegion, setFilterRegion] = useState(initialFilterRegion || "");
  const [filterAgeRange, setFilterAgeRange] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const { validateBooking, updateBookings } = checkingOrder();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToMyTours = (product) => {
    if (role === 'guest') {
      setShowLoginMessage(true);
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    if (!validateBooking({ product, date, count })) return;
    const updatedProduct = updateBookings({ product, date, count });
    const productToSend = {
      ...product,
      selectedDate: date,
      selectedCount: count,
    };
    //פה לשלוח רק ID של המוצר +התאריך והכמות
    dispatch(addToCart({ userId: user.id, product: productToSend }));
  };

  const handleDelete = (id) => {
    dispatch(deleteProducts(id));
  };

  const handleFilter = () => {
    setSelectedId(null);
  };

  const handleClearFilters = () => {
    setFilterRegion("");
    setFilterAgeRange("");
  };

  const filteredProducts = products.filter((p) => {
    if (selectedId) return p.id === selectedId;
    if (filterRegion && p.region !== filterRegion) return false;
    if (filterAgeRange && p.ageRange !== filterAgeRange) return false;
    return true;
  });

  if (status === 'loading') return <p>טוען...</p>;
  if (status === 'failed') return <p>שגיאה בטעינת מוצרים</p>;

  return (
    <Box>
      {role === 'admin' && (
        <Box mb={2}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate('/add-product')}
          >
            הוסף מוצר חדש
          </Button>
        </Box>
      )}

      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <TextField
          select
          label="אזור"
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          {regions.map((region) => (
            <MenuItem key={region} value={region}>{region}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="טווח גילאים"
          value={filterAgeRange}
          onChange={(e) => setFilterAgeRange(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          {ageOptions.map((age) => (
            <MenuItem key={age} value={age}>{age}</MenuItem>
          ))}
        </TextField>

        <Button variant="contained" onClick={handleFilter}>סנן</Button>
        <Button variant="outlined" onClick={handleClearFilters}>נקה סינונים</Button>
      </Box>

      <Grid container spacing={2}>
        {filteredProducts.map((p) => (
          <Grid item xs={12} sm={6} md={6} key={p.id}>
            <Box border="1px solid #ccc" borderRadius={2} p={2} height="100%">
              <OneProduct
                product={{ ...p, imageStyle: { height: '200px', objectFit: 'cover' } }}
                onCountChange={setCount}
                onDateChange={setDate}
              />
              {role !== 'admin' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToMyTours(p)}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  הוסף לסיורים שלי
                </Button>
              )}

              {showLoginMessage && role === 'guest' && (
                <Typography color="error" mt={1}>
                  אתה צריך להתחבר בשביל להזמין
                </Typography>
              )}

              {role === 'admin' && (
                <Box display="flex" gap={1} mt={1}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(p.id)}
                    startIcon={<DeleteIcon />}
                  >
                    מחק
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/edit-product/${p.id}`)}
                    startIcon={<EditIcon />}
                  >
                    ערוך
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllProducts;
