import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    documents:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:'documents'}],
        default:[]
    }

}
);

// const user={
//     username:'',
//     email:'',
//     password:'',
//     cards:[],
//     status:false,
// }

userSchema.statics.doThisUserExist=async function(username){
    try{
        const user_notavailable=await this.findOne({username});
        if(user_notavailable){
                
            return 'username not available';
            
            
        }
        else{
            return false;
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
}



export default mongoose.model('users',userSchema);