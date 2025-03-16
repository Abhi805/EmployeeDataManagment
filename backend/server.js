const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const AuthRoutes = require('./routes/AuthRoutes');
const EmployeeRoutes = require('./routes/EmployeeRoutes');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).
then(()=>{
    console.log('MongoDB Connected Successfully');
}).
catch((err)=>{
    console.log('MongoDB Connection Error : ',err);
});

app.use('/api/auth',AuthRoutes);
app.use('/api/employees', EmployeeRoutes);
app.use('/',(req,res)=>{
    res.send("Server is running on port");
});

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is Running on port ${PORT}`);
});