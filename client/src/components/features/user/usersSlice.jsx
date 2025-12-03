import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
export const fetchUsers=createAsyncThunk(
    'user/fetchUsers',
    async()=>{
        const res=await axiosInstance.get('/user')
        return res.data
    } 
)
export const getUser=createAsyncThunk(
    'user/getUser',
    async(id)=>{
        const res=await axiosInstance.get('/user/'+id)
        return res.data
    } 
)
export const fetchRegisters=createAsyncThunk(
'user/registerUser',
async(newUser)=>{
    const res=await axiosInstance.post('/user',newUser);
    return res.data;
});
const userSlice= createSlice({
    name:'usersList',
    initialState:{
        users:[],
        status: 'idle'
    },
    reducers:{},
    extraReducers: builder=>{
        builder
        .addCase(fetchUsers.pending,state=>{
            state.status='loading'
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.status='succeeded'
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected, state=>{
            state.status='failed'
        })
        .addCase(fetchRegisters.fulfilled, state=>{
            state.users.push(action.payload);
        })  ;
        
    },
});
export default userSlice.reducer;
