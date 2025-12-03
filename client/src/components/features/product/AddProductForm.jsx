// import React, { useState } from "react";
// import { TextField, Button, Box, Typography } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { addProducts } from "./productSlice";
// import { useNavigate } from "react-router-dom";

// const AddProductForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     location: "",
//     region: "",
//     guide: "",
//     pricePerPerson: 0,
//     ageRange: "",
//     lat: 0,
//     lng: 0,
//     availableHours: "",
//     maxPeople: 1,
//     imageUrl: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = () => {
//     const data = {
//       ...form,
//       availableHours: form.availableHours.split(",").map(h => h.trim()),
//       bookings:{}
//     };
//     dispatch(addProducts(data));
//     navigate("/AllProducts");
//   };

//   return (
//     <Box maxWidth={500} mx="auto" mt={4}>
//       <Typography variant="h5" mb={2}>הוספת מוצר חדש</Typography>
//       {Object.keys(form).map((key) => (
//         <TextField
//           key={key}
//           label={key}
//           name={key}
//           value={form[key]}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//       ))}
//       <Button variant="contained" onClick={handleSubmit}>הוסף מוצר</Button>
//     </Box>
//   );
// };

// export default AddProductForm;
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProducts } from "./productSlice";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    location: "",
    region: "",
    guide: "",
    pricePerPerson: 0,
    ageRange: "",
    lat: 0,
    lng: 0,
    availableHours: "",
    maxPeople: 1,
    imageUrl: ""
  });

  const numericFields = ["pricePerPerson", "lat", "lng", "maxPeople"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = () => {
    const data = {
      ...form,
      availableHours: form.availableHours
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h),
      bookings: {}
    };
    dispatch(addProducts(data));
    navigate("/AllProducts");
  };

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Typography variant="h5" mb={2}>הוספת מוצר חדש</Typography>
      {Object.keys(form).map((key) => (
        <TextField
          key={key}
          label={key}
          name={key}
          type={numericFields.includes(key) ? "number" : "text"}
          value={form[key]}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      ))}
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        הוסף מוצר
      </Button>
    </Box>
  );
};

export default AddProductForm;
