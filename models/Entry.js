import mongoose, {Schema} from "mongoose"

const EntrySchema = new Schema({
	applicant: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: [true, "Applicant is missing"],
	}, 
	appliedEvent: {
		type: mongoose.Types.ObjectId,
		ref: "Event",
		required: [true, "Event is missing"],
	}, 
	message: {
		type: String,
	}
})


const Entry = mongoose.model("entry", EntrySchema)

export default Entry
