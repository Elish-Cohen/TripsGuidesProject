import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, updateProducts } from "./productSlice";
import { TextField, Button, Box, Typography } from "@mui/material";

const EditProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  const product = useSelector((state) =>
    state.product.products.find((p) => p.id === Number(id))
  );

  useEffect(() => {
    if (!product) {
      dispatch(getProduct(id));
    } else {
      setForm({ ...product, availableHours: product.availableHours.join(", ") });
    }
  }, [dispatch, id, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const updated = {
      ...form,
      availableHours: form.availableHours.split(",").map((h) => h.trim()),
    };
    dispatch(updateProducts({ id, data: updated }));
    navigate("/AllProducts");
  };

  if (!form) return <p>טוען נתונים...</p>;

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Typography variant="h5" mb={2}>עריכת מוצר</Typography>
      {Object.keys(form).map((key) => (
        <TextField
          key={key}
          label={key}
          name={key}
          value={form[key]}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      ))}
      <Button variant="contained" onClick={handleSubmit}>עדכן מוצר</Button>
    </Box>
  );
};

export default EditProductForm;
