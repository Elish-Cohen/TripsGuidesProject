import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchProducts=createAsyncThunk(
    'product/fetchProducts',
    async()=>{
        try{
            const res=await axiosInstance.get('/product')
            return res.data
        }
        catch{
            console.log("error");
        }
       
    } 
)
export const getProduct=createAsyncThunk(
    'product/getProduct',
    async(id)=>{
        try{
            const res=await axiosInstance.get('/product/'+id)
            return res.data
        }
        catch{
            console.log("error");
        }
       
    } 
)
export const deleteProducts=createAsyncThunk(
    'product/deleteProduct',
    async(idProduct)=>{
        try{
            const res=await axiosInstance.delete('/product/'+idProduct);
         return res.data;
        }
        catch{
            console.log("error in deleted");

        }
    }
)
export const addProducts=createAsyncThunk(
    'product/addProduct',
    async(newProduct)=>{
        try{
        const res=await axiosInstance.post('/product/',newProduct);
         return res.data;
        }
        catch{
            console.log("error in added");

        }
    }
)
export const updateProducts=createAsyncThunk(
    'product/updateProduct',
    async({id,data})=>{
        try{
        const res=await axiosInstance.put('/product/'+id,data);
         return res.data;
        }
        catch{
            console.log("error in update");

        }
    }
)
const productSlice= createSlice({
    name:'product',
    initialState:{
        products:[],
        status: 'idle'
    },
    reducers:{},
    extraReducers: builder=>{
        builder
        .addCase(fetchProducts.pending,state=>{
            state.status='loading'
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.status='succeeded'
            state.products=action.payload
        })
        .addCase(fetchProducts.rejected, state=>{
            state.status='failed'
        }) 
        .addCase(deleteProducts.fulfilled,(state,action)=>{
            state.products=state.products.filter(x=>x.id!=action.meta.arg)
        })
        .addCase(deleteProducts.rejected, (state, action)=>{
            state.message="נכשל במחיקה "
        })
        .addCase(addProducts.fulfilled,(state,action)=>{
            state.products.push(action.payload)
        }
        )
        .addCase(addProducts.rejected,state=>{
            state.message="נכשל  "
        }
        )
        
        .addCase(updateProducts.fulfilled,(state,action)=>{
            const updatedProduct = action.payload;
            const index = state.products.findIndex(p => p.id === updatedProduct.id);
            if (index !== -1) {
              state.products[index] = updatedProduct;
            }
                  }
        )
        .addCase(updateProducts.rejected,state=>{
            state.message="נכשל  "
        }
        )
        
        
    }
})
export default productSlice.reducer