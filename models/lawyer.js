var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LawyerSchema = new Schema({
	identification:{
		type: String,
		required: [true, 'Identification lawyer is required'],
		unique: [true, 'Identification has already taken']
	},
	name:{
		type: String,
		required: [true, 'Name lawyer is required']
	},
	speciality:{
		type: String,
		required: [true, 'Speciality lawyer is required']
	},
	phone:{
		type:String,
		required: [true, 'Phone lawyer is required']
	},
	email:{
		type:String,
		required: [true, 'Email lawyer is required'],
		unique: [true, 'Email has already taken']	
	},
	password:{
		type:String,
		required: [true, 'Password lawyer is required']
	},
	avatar:{
		type:String,
		required: [false, 'Img lawyer is required']
	},
	imgName:{
		type:String,
		required: [false, 'Name Img lawyer is required']
	}
});
const Lawyer = mongoose.model('lawyer', LawyerSchema);
module.exports = Lawyer;