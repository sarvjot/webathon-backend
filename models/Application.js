import mongoose, {Schema} from "mongoose"

const ApplicationSchema = new Schema({
	applicant: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: [true, "Applicant is missing"],
	}, 
	event: {
		type: mongoose.Types.ObjectId,
		ref: "Event",
		required: [true, "Event is missing"],
	}, 
	message: {
		type: String,
	}
})


const Application = mongoose.model("application", ApplicationSchema)

export default Application
