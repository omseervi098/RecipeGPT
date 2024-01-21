import mongoose,{Document} from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already exists"],
        required:[true,"Username is required"],
        min:[3,"Username must be at least 3 characters long"]
    },
    email:{
        type:String,
        unique:[true,"Email already exists"],
        required:[true,"Email is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        min:[8,"Password must be at least 8 characters long"]
    },
    firstName:{
        type:String,
        min:[2,"First name must be at least 2 characters long"]
    },
    lastName:{
        type:String,
        min:[2,"Last name must be at least 2 characters long"]
    },
    phone:{
        type:String,
        match:[/^\d{10}$/,"Please enter a valid phone number"]
    }
},{
    timestamps:true
})
const User=mongoose.model("User",userSchema);
export default User;