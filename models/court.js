var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourtSchema = new Schema({
	name:{
		type: String,
		required: [true, 'Name Court is required']
	},
	address:{
		type: String,
		required: [false, 'Adress Court is required']
	},
	type:{
		type:String,
		required: [false, 'Type Court is required']
	},
	phone:{
		type:String,
		required: [false, 'Date Court is required']
	}
});

const Court = mongoose.model('court', CourtSchema);
module.exports = Court;