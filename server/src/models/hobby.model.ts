import mongoose from 'mongoose';

const hobbySchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    hobby:{
		type: String,
		required:true
	}
})
export default mongoose.model('Hobby',hobbySchema);