// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../api/axiosInstance";
// export const getAllCarts = createAsyncThunk(
//     'cart/getAllCarts',
//     async () => {
//         try {
//             const res = await axiosInstance.get('/cart')
//             return res.data
//         }
//         catch {
//             console.log("failed getting carts")
//         }

//     }
// )
// export const getCart = createAsyncThunk(
//     'cart/getCart',
//     async (id) => {
//         try {
//             const res = await axiosInstance.get('/cart/' + id)
//             return res.data
//         }
//         catch {
//             console.log("failed getting cart")
//         }
//     }
// )
// export const addToCart = createAsyncThunk(
//     'cart/addToCart',
//     async (newProduct) => {
//         try {
//             const res = await axiosInstance.post('/cart', newProduct);
//             return res.data;
//         }
//         catch {
//             console.log("failed adding to cart")
//         }
//     });
// export const deleteFromCart = createAsyncThunk(
//     'cart/deleteFromCart',
//     async ({userId, productId}) => {
//         try {
//             const res = await axiosInstance.delete('/cart/' + userId + '/' + productId);
//             return { userId, productId };
//         }
//         catch {
//             console.log("failed deleting from cart")
//         }
//     });
// export const updateCartItem = createAsyncThunk(
//     'cart/updateCartItem',
//     async ({ userId, productId, selectedDate, selectedCount }) => {
//         const res = await axiosInstance.put(`/cart/${userId}/${productId}`, {
//             selectedDate,
//             selectedCount
//         });
//         return {  userId, productId, selectedDate, selectedCount };
//     }
// );

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         carts: [],
//         status: 'idle'
//     },
//     reducers: {},
//     extraReducers: builder => {
//         builder
//             .addCase(getAllCarts.pending, state => {
//                 state.status = 'loading'
//             })
//             .addCase(getAllCarts.fulfilled, (state, action) => {
//                 state.status = 'succeeded'
//                 state.users = action.payload
//             })
//             .addCase(getAllCarts.rejected, state => {
//                 state.status = 'failed'
//             })
//             .addCase(addToCart.fulfilled, (state, action) => {
//                 const { userId, product } = action.payload;

//                 const userCart = state.carts.find(c => c.userId === userId);
//                 if (userCart) {
//                     userCart.cart.push(product);
//                 } else {
//                     state.carts.push({
//                         userId,
//                         cart: [product]
//                     });
//                 }
//             })
//             .addCase(addToCart.rejected, state => {
//                 state.message = "נכשל  "
//             })
//             .addCase(deleteFromCart.fulfilled, (state, action) => {
//                 const { userId, productId } = action.payload;
//                 const userCart = state.carts.find(c => c.userId === userId);
//                 if (userCart) {
//                     userCart.cart = userCart.cart.filter(p => p.id !== productId);
//                 }
//             })
//             .addCase(deleteFromCart.rejected, (state, action) => {
//                 state.message = "נכשל במחיקה "
//             })
//             .addCase(updateCartItem.fulfilled, (state, action) => {
//                 const { userId, productId, selectedDate, selectedCount } = action.payload;
//                 const userCart = state.carts.find(c => c.userId === userId);
//                 if (userCart) {
//                     const item = userCart.cart.find(p => p.id === productId);
//                     if (item) {
//                         item.selectedDate = selectedDate;
//                         item.selectedCount = selectedCount;
//                     }
//                 }
//             });

//     },

// });
// export default cartSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getAllCarts = createAsyncThunk(
    'cart/getAllCarts',
    async () => {
        try {
            const res = await axiosInstance.get('/cart')
            return res.data
        }
        catch {
            console.log("failed getting carts")
        }
    }
)

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (id) => {
        try {
            const res = await axiosInstance.get('/cart/' + id)
            return res.data
        }
        catch {
            console.log("failed getting cart")
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (newProduct) => {
        try {
            const res = await axiosInstance.post('/cart', newProduct);
            return res.data;
        }
        catch {
            console.log("failed adding to cart")
        }
    });

export const deleteFromCart = createAsyncThunk(
    'cart/deleteFromCart',
    async ({ userId, productId }) => {
        try {
            const res = await axiosInstance.delete('/cart/' + userId + '/' + productId);
            return { userId, productId };
        }
        catch {
            console.log("failed deleting from cart")
        }
    });

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ userId, productId, selectedDate, selectedCount }) => {
        const res = await axiosInstance.put(`/cart/${userId}/${productId}`, {
            selectedDate,
            selectedCount
        });
        return { userId, productId, selectedDate, selectedCount };
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: [],       // עבור admin
        currentCart: [], // עבור משתמש
        status: 'idle'
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllCarts.pending, state => {
                state.status = 'loading';
            })
            .addCase(getAllCarts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.carts = action.payload;
            })
            .addCase(getAllCarts.rejected, state => {
                state.status = 'failed';
            })

            .addCase(getCart.fulfilled, (state, action) => {
                const userCart = action.payload;
                  console.log("getCart payload", action.payload);

                state.currentCart = userCart?.cart || [];
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                const { userId, product } = action.payload;
                const userCart = state.carts.find(c => c.userId === userId);
                if (userCart) {
                    userCart.cart.push(product);
                } else {
                    state.carts.push({
                        userId,
                        cart: [product]
                    });
                }
                // נעדכן גם את currentCart אם מדובר במשתמש המחובר
                if (state.currentCart && userId) {
                    state.currentCart.push(product);
                }
            })
            .addCase(addToCart.rejected, state => {
                state.message = "נכשל  ";
            })

            .addCase(deleteFromCart.fulfilled, (state, action) => {
                const { userId, productId } = action.payload;
                const userCart = state.carts.find(c => c.userId === userId);
                if (userCart) {
                    userCart.cart = userCart.cart.filter(p => p.id !== productId);
                }
                if (state.currentCart && userId) {
                    state.currentCart = state.currentCart.filter(p => p.id !== productId);
                }
            })
            .addCase(deleteFromCart.rejected, state => {
                state.message = "נכשל במחיקה ";
            })

            .addCase(updateCartItem.fulfilled, (state, action) => {
                const { userId, productId, selectedDate, selectedCount } = action.payload;
                const userCart = state.carts.find(c => c.userId === userId);
                if (userCart) {
                    const item = userCart.cart.find(p => p.id === productId);
                    if (item) {
                        item.selectedDate = selectedDate;
                        item.selectedCount = selectedCount;
                    }
                }
                const currentItem = state.currentCart.find(p => p.id === productId);
                if (currentItem) {
                    currentItem.selectedDate = selectedDate;
                    currentItem.selectedCount = selectedCount;
                }
            });
    },
});

export default cartSlice.reducer;
