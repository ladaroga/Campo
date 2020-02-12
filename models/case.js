var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CaseSchema = new Schema({
	name:{
		type: String,
		required: [true, 'Name Case is required']
	},
	number:{
		type: String,
		required: [false, 'Number Case is required'],
		unique: [true, 'Number has already taken']
	},
	dateStart:{
		type:Date,
		required: [true, 'Date Case is required']
	},
	dateFinish:{
		type:Date,
		required: [false, 'Date Case is required']
	},
	courtName:{
		type:String,
		required: [true, 'Court name of Case is required']
	},
	idLawyer:{
		type:String,
		required: [false, 'Id Lawyer of Document is required']	
	},
	idClient:{
		type:String,
		required: [false, 'Id Client of Document is required']	
	}
});

const Case = mongoose.model('case', CaseSchema);
module.exports = Case;