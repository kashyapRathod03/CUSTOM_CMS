const mongoose = require("mongoose");


const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const catagoryschema = new mongoose.Schema({
    catagory:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    img:{
        type: String,
        required:true,
    },
    check:{
        type:Boolean
    }
});

const vendorschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        // unique:true
    },
    cat:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    qnt:{
        type:Number,
        required:true
    },
    img:{
        type:Buffer,
        StringType:String,
    }
});

const admin = new mongoose.model("admin",userschema);
const Vcatagory = new mongoose.model("vendorCategory",catagoryschema);
const vendor = new mongoose.model("Vendor",vendorschema);

module.exports = {admin,Vcatagory,vendor};