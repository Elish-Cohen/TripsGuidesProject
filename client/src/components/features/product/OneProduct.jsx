// import React from "react";
// import { useParams } from "react-router-dom";
// import { Card,CardContent,Typography } from "@mui/material";
// import MapView from "./MapView";
// import { useState } from "react";
// export default function OneProduct({product, onCountChange, onDateChange}){
//   const [count, setCount] = useState(1);
//   const [date, setDate] = useState("");
//   const handleCount = (e) => {
//     const val = Number(e.target.value);
//     setCount(val);
//     onCountChange(val);
//   };
//     const handleDate = (e) => {
//     setDate(e.target.value);
//     onDateChange(e.target.value);
//   };
//     return(
//         <Card sx={{mb:2}}>
//           <CardContent>
//             <Typography variant="h6">{product.location}</Typography>
//             <Typography>אזור:  {product.region}</Typography>
//             <Typography>  מדריך: {product.guide}</Typography>
//             <Typography>מחיר לאדם{product.pricePerPerson}</Typography>
//             <Typography>טווח גילאים: {product.ageRange}</Typography>
//             <Typography>שעות הסיור{product.availableHours}</Typography>
//             <Typography><img src={product.imageUrl} alt={product.location} style={{ width: '100%', borderRadius: '10px' }} /></Typography>

//             {product.lat && product.lng&& (
//           <MapView lat={product.lat} lng={product.lng} />
//         )}
//         <Typography>בחר מספר משתתפים
//           <input 
//           type="number"
//           min="1"
//           max={product.maxPeople}
//           value={count}
//            onChange={handleCount}
//           // onChange={(e) => setCount(Number(e.target.value))}
//         ></input></Typography>
//         <Typography>בחר תאריך 
//           <input type="date" value={date}   onChange={handleDate} >
//   </input>
//         </Typography>
//           </CardContent>
//         </Card>
//     )
// }
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, IconButton, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MapView from "./MapView";
import { useSelector } from "react-redux";
export default function OneProduct({ product, onCountChange, onDateChange }) {
  const [count, setCount] = useState(1);
  const [date, setDate] = useState("");
  const [showMap, setShowMap] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const role = user?.isAdmin ? 'admin' : user ? 'user' : 'guest';

  const handleCount = (e) => {
    const val = Number(e.target.value);
    setCount(val);
    onCountChange(val);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
    onDateChange(e.target.value);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{product.location}</Typography>
        <Typography>אזור: {product.region}</Typography>
        <Typography>מדריך: {product.guide}</Typography>
        <Typography>מחיר לאדם: {product.pricePerPerson}</Typography>
        <Typography>טווח גילאים: {product.ageRange}</Typography>
        <Typography>שעות הסיור: {product.availableHours}</Typography>

        <Box my={2}>
          <img
            src={product.imageUrl}
            alt={product.location}
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Box>

        {product.lat && product.lng && !showMap && (
          <Button variant="outlined" onClick={() => setShowMap(true)}>
            למיקום במפה
          </Button>
        )}

        {showMap && (
          <Box
            sx={{
              position: "relative",
              mt: 2,
              border: '2px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <IconButton
              onClick={() => setShowMap(false)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "white",
                zIndex: 1
              }}
            >
              <CloseIcon />
            </IconButton>
            <MapView lat={product.lat} lng={product.lng} />
          </Box>
        )}
       
        {(role === 'user' || role === 'guest') && (
          <>
            <Typography mt={2}>בחר מספר משתתפים</Typography>
            <input
              type="number"
              min="1"
              max={product.maxPeople}
              value={count}
              onChange={handleCount}
            />
            <Typography mt={2}>בחר תאריך</Typography>
            <input type="date" value={date} onChange={handleDate} />
          </>
        )}

      </CardContent>
    </Card>
  );
}
