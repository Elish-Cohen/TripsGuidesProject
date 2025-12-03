// AdminOrdersList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "./orderSlice";
import { getProduct } from "../product/productSlice";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@mui/material";

const AdminOrdersList = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (status === "loading") return <p>טוען הזמנות...</p>;
  if (status === "failed") return <p>שגיאה בטעינת ההזמנות</p>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        כל ההזמנות שבוצעו
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">
                  מזמין: {order.name}
                </Typography>
                <Typography>טלפון: {order.phone}</Typography>
                <Divider sx={{ my: 1 }} />
                {order.items.map((item, i) => (
                  <Box key={`${item.productId}-${i}`} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      מסלול: {item.location || item.name || "לא זמין"}
                    </Typography>
                    <Typography>תאריך: {item.selectedDate}</Typography>
                    <Typography>כמות משתתפים: {item.selectedCount}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminOrdersList;
