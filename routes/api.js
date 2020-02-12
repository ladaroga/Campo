const express = require('express');
const Lawyer = require('../models/lawyer');
const Client = require('../models/client');
const Case = require('../models/case');
const Document = require('../models/document');
const Court = require('../models/court');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();

//------------------------------------Navigation - web-----------------------------------------
router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/login-lawyer', function(req, res, next) {
	if(req.body){
		Lawyer.findOne({email: req.body.email}).then(function(Lawyer){
			if(Lawyer){
				bcrypt.compare(req.body.password, Lawyer.password, function(err, result) {
					Lawyer.password = req.body.password;
					if(err){
						res.send('Error de contraseña');
					}
					if(result){
						res.json({'Lawyer' : Lawyer});
					}
				});
			}else{
				res.send('No se encontro el correo');
			}
		});
	}else{
		res.send('Faltan datos');
	}
});

router.post('/login-lawyer-web', function(req, res, next) {
	if(req.body){
		Lawyer.findOne({email: req.body.email}).then(function(Lawyer){
			if(Lawyer){
				bcrypt.compare(req.body.password, Lawyer.password, function(err, result) {
					if(err){
						res.redirect('/login');
					}
					if(result){
						req.session.lawyer = Lawyer;
						req.session.lawyer.password = req.body.password;
						res.redirect('/main');
					}else{
						res.render('login', {Email: false, Password: true, Empty: false});
					}
				});
			}else{
				console.log('No se encontro el correo');
				res.render('login', {Email: true, Password: false, Empty: false});
			}
		});
	}else{
		console.log('Faltan datos');
		res.render('login', {Email: false, Password: false, Empty: true});
	}
});

router.get('/login', function(req, res, next) {
	if(req.session.lawyer != null){
    	res.redirect('/main');
    }else{
    	res.render('login', {Email: false, Password: false, Empty: false});
    }
});

router.get('/register', function(req, res, next) {
	res.render('register');
});

router.get('/main', function(req, res, next) {
    if(req.session.lawyer != null){
    	Case.find({idLawyer: req.session.lawyer._id}).then(function(Cases){
    		Client.find({idLawyer: req.session.lawyer._id}).then(function(Client){
    			Court.find({}).then(function(Court){
    				res.render('main',{Case: Cases, Client: Client, Court: Court,
    				 Lawyer: req.session.lawyer});		
				});
			});
		});		
    }else{
    	res.redirect('/');
    }
});

router.get('/details/:id', function(req, res, next) {
	Case.findById(req.params.id).then(function(Case){
		req.session.temporalCase = Case;
		res.redirect('/details');
	});
});

router.get('/details', function(req, res, next) {
	if(req.session.lawyer != null){
    	Document.find({caseNumber: req.session.temporalCase.number}).then(function(Document){
	    	Client.find({idLawyer: req.session.lawyer._id}).then(function(Client){
	    		Court.find({}).then(function(Court){
	    			res.render('case',{Case: req.session.temporalCase, Client: Client,
	    			 Court: Court, Document: Document});
				});
			});
		});	
    }else{
    	res.redirect('/');
    }
});

router.get('/exit', function(req, res, next) {
	req.session.lawyer = null;
	res.redirect('/');
});

module.exports = router;