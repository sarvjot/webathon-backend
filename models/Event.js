import mongoose, {Schema} from "mongoose"

const EventSchema = new Schema({
	eventName: {
		type: String,
		required: [true, "Event Name is missing"],
	},
	poster: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Event Poster is missing"],
	}, 
	description: {
		type: String,
		required: [true, "Description is missing"],
	}, 
	entries : [{
		type: Schema.Types.ObjectId,
		ref: "Entry"			
	}],
	accepted: [{
		type: Schema.Types.ObjectId,
		ref: "User",
	}],
	countRequired: {
		type: Number,
		required: [true, "Count-Required property is missing"],
	}
})

const Event = mongoose.model("event", EventSchema)

export default Event;