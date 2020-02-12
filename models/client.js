var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
	identification:{
		type: String,
		required: [true, 'Identification client is required'],
		unique: [true, 'Identification has already taken']
	},
	name:{
		type: String,
		required: [true, 'Name client is required']
	},
	type:{
		type: String,
		required: [true, 'Type client is required']
	},
	date:{
		type:Date,
		required: [false, 'Date client is required']
	},
	phone:{
		type:String,
		required: [true, 'Phone client is required']
	},
	idLawyer:{
		type:String,
		required: [false, 'Id Lawyer of Document is required']	
	}
});

const Client = mongoose.model('client', ClientSchema);
module.exports = Client;