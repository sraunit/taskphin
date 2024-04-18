import mongoose from "mongoose";
const documentSchema=new mongoose.Schema({
    title : {
        type:String,
        default: new Date().toISOString(),
        required : true
    },
    content:{
        type:String,
        default : ""
    },
    

},
{
    timestamps:true
}

);

export default mongoose.model('documents',documentSchema);