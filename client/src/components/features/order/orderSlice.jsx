import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getAllOrders=createAsyncThunk(
    'order/getAllOrders',
    async()=>{
        try{
            const res=await axiosInstance.get('/order')
            return res.data
        }
        catch{
            console.log("error");
        }
       
    } 
)
export const getOrder=createAsyncThunk(
    'order/getOrder',
    async(id)=>{
        try{
            const res=await axiosInstance.get('/order/'+id);
            return res.data
        }
        catch{
            console.log("error");
        }
       
    } 
)
export const postOrder=createAsyncThunk(
    'order/postOrder',
    async(newOrder)=>{
        try{
            const res=await axiosInstance.post('/order',newOrder);
            return res.data
        }
        catch{
            console.log("error");
        }
       
    } 
)
const orderSlice= createSlice({
    name:'order',
    initialState:{
        orders:[],
        status: 'idle'
    },
    reducers:{},
    extraReducers: builder=>{
        builder
        .addCase(getAllOrders.pending,state=>{
            state.status='loading'
        })
        .addCase(getAllOrders.fulfilled,(state,action)=>{
            state.status='succeeded'
            state.orders=action.payload
        })
        .addCase(getAllOrders.rejected, state=>{
            state.status='failed'
        }) 
        // .addCase(deleteOder.rejected, (state, action)=>{
        //     state.message="נכשל במחיקה "
        // })
        .addCase(postOrder.fulfilled,(state,action)=>{
            state.orders.push(action.payload)
        }
        )
        .addCase(postOrder.rejected,state=>{
            state.message="נכשל  "
        }
        )
        
        // .addCase(updateProducts.fulfilled,state=>{
        //     const updatedProduct = action.payload;
        //     const index = state.products.findIndex(p => p.id === updatedProduct.id);
        //     if (index !== -1) {
        //       state.products[index] = updatedProduct;
        //     }
        //           }
        // )
        // .addCase(updateProducts.rejected,state=>{
        //     state.message="נכשל  "
        // }
        // )
        
        
    }
})
export default orderSlice.reducer