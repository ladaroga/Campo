const express = require('express');
const Court = require('../models/court');

const router = express.Router();

//-----------------------------------------Court------------------------------------------------
router.get('/court', function(req, res, next) {
	Court.find({}).then(function(Court){
		res.json({'Court' : Court});
	});
});

router.get('/court-web', function(req, res, next) {
	Court.find({}).then(function(Court){
		res.send(Court);
	});
});

router.get('/court/:id', function(req, res, next) {
	Court.findById({id: req.params.id}).then(function(Court){
		res.json({'Court' : Court});
	});
});

router.get('/court-web/:id', function(req, res, next) {
	Court.findById({id: req.params.id}).then(function(Court){
		res.send(Court);
	});
});

router.post('/court', function(req, res, next) {
	Court.create(req.body).then(function(Court){
		res.send(Court);
	}).catch(next);
});

router.post('/court-web', function(req, res, next) {
	Court.create(req.body).then(function(Court){
		res.redirect('/main');
	}).catch(next);
});

router.delete('/court/:id', function(req, res, next){
	Court.findByIdAndRemove({_id: req.params.id}).then(function(Court){
		 res.send({Court});
	});
});

router.delete('/court-web/:id', function(req, res, next){
	Court.findByIdAndRemove({_id: req.params.id}).then(function(Court){
		 res.redirect('/main');
	});
});

router.put('/court/:id', function(req, res, next){
	Court.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Court){
		res.send(Court);
	});
});

router.put('/court-web/:id', function(req, res, next){
	Court.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Court){
		res.redirect('/main');
	});
});

module.exports = router;