import {model, Schema } from "mongoose";

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	currentLevel: {
		type: Number,
		default: 1
	},
	totalScore: {
		type: Number,
		default: 0
	}
});

const User = model("User", userSchema);

export default User;
