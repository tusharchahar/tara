import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	nonce:{
		type: Number,
		default:5
	},
	publicAddress:{
		type:String,
		required:true
	},
	username:{
		type:String,
		default:''
	},
	filledData:{
		type:Boolean,
		default:false
	}
})
export default mongoose.model('User',userSchema);
