// import mongoose, {Schema} from "mongoose"
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
	eventName: {
		type: String,
		required: [true, "Event Name is missing"],
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Event author is missing"],
	}, 
	description: {
		type: String,
		required: [true, "Description is missing"],
	}, 
	applications : [{
		type: Schema.Types.ObjectId,
		ref: "Application"			
	}],
	usersAccepted: [{
		type: Schema.Types.ObjectId,
		ref: "User",
	}],
	usersRequired: {
		type: Number,
		required: [true, "Users-required property is missing"],
	}
})

const Event = mongoose.model("event", EventSchema)

module.exports =  Event;