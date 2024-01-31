import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
	college:{
		type: String,
		required:true
	}
})
export default mongoose.model('College',collegeSchema);