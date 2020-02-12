const express = require('express');
const Lawyer = require('../models/lawyer');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
const path = require('path');
const fs = require('fs');
var util = require('util')
var multer = require('multer')({
   dest: 'public/uploads'
});
const router = express.Router();
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


//-----------------------------------------Lawyer----------------------------------------------

router.get('/lawyer', function(req, res, next) {
	Lawyer.find({}).then(function(Lawyer){
		res.json({'Lawyer' : Lawyer});
	});
});

router.get('/lawyer-web', function(req, res, next) {
	Lawyer.find({}).then(function(Lawyer){
		res.send(Lawyer);
	});
});

router.get('/lawyer/:identification', function(req, res, next) {
	Lawyer.find({identification: req.params.identification}).then(function(Lawyer){
		res.json({'Lawyer' : Lawyer});
	});

});

router.get('/lawyer-web/:identification', function(req, res, next) {
	Lawyer.find({identification: req.params.identification}).then(function(Lawyer){
		res.send(Lawyer);
	});
});

router.post('/lawyer', function(req, res, next) {
	req.body.password = bcrypt.hashSync(req.body.password);
	Lawyer.create(req.body).then(function(Lawyer){
		res.send(Lawyer);
		console.log('success');
	}).catch(next);
});

router.post('/lawyer-web', [multer.single('img')], function(req, res, next) {
	if(req.file){
		storeWithOriginalName(req.file).then(encodeURIComponent).then(encoded => {}).catch(next);
		cloudinary.uploader.upload('public/uploads/' + req.file.originalname, function(result) { 
	  		req.body.avatar = result.secure_url;
	  		req.body.imgName = result.public_id;
	  		fs.unlinkSync('public/uploads/' + req.file.originalname);
	  		var unHashedpass = req.body.password
		    req.body.password = bcrypt.hashSync(unHashedpass);
			Lawyer.create(req.body).then(function(Lawyer){
				req.session.lawyer = Lawyer;
				req.session.lawyer.password = unHashedpass;
				req.session.tab = 'Case';
				res.redirect('/main');
			}).catch(next);
		});	
	}else{
		
		req.body.password = bcrypt.hashSync(req.body.password);
		    console.log(req.body);
			Lawyer.create(req.body).then(function(Lawyer){
				req.session.lawyer = Lawyer;
				res.redirect('/main');
			}).catch(next);
	}
	
});

function storeWithOriginalName (file) {
  var fullNewPath = path.join(file.destination, file.originalname)
  var rename = util.promisify(fs.rename)
  return rename(file.path, fullNewPath)
    .then(() => {
      return file.originalname
    })
}

router.delete('/lawyer/:id', function(req, res, next){
	Lawyer.findByIdAndRemove({_id: req.params.id}).then(function(Lawyer){
		 res.send({Lawyer});
	});
});

router.delete('/lawyer-web/:id', function(req, res, next){
	Lawyer.findByIdAndRemove({_id: req.params.id}).then(function(Lawyer){
		 res.redirect('/main');
	});
});

router.put('/lawyer/:id', function(req, res, next){
	Lawyer.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Lawyer){
			res.send(Lawyer);
	});
});

router.post('/lawyer-web-update', [multer.single('img')], function(req, res, next){
	if(req.file){
		console.log(req.session.lawyer.avatar);
		cloudinary.v2.uploader.destroy(req.session.lawyer.imgName, function(error, result) {
			console.log(result);
		});
		storeWithOriginalName(req.file).then(encodeURIComponent).then(encoded => {}).catch(next);
			cloudinary.uploader.upload('public/uploads/' + req.file.originalname, function(result) { 
				console.log(result);
		  		req.body.avatar = result.secure_url;
		  		req.body.imgName = result.public_id;
		  		fs.unlinkSync('public/uploads/' + req.file.originalname);
			    req.body.password = bcrypt.hashSync(req.body.password);
			    Lawyer.findByIdAndUpdate(req.session.lawyer._id, req.body, (err, todo) => {}).then(function(Lawyer){
					req.session.lawyer = Lawyer;
					res.redirect('/main');
				}).catch(next);
			});
	}else{
		req.body.password = bcrypt.hashSync(req.body.password);
		Lawyer.findByIdAndUpdate(req.session.lawyer._id, req.body, (err, todo) => {}).then(function(Lawyer){
			req.session.lawyer = Lawyer;
			res.redirect('/main');
		});
	}
});

module.exports = router;