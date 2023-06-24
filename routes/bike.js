var express = require('express');
const BikeModel = require('../Model/BikeModel');
var router = express.Router();

router.get('/', async (req, res) => {
  var bikes = await BikeModel.find({});
  res.render('index', { bikes : bikes })
})

router.get('/admin',async (req,res) =>{
  var bikes = await BikeModel.find({});
  res.render('index', {bikes: bikes})
})

router.get('/back',async (req,res) =>{
  var bikes = await BikeModel.find({});
  res.render('product_page', {bikes: bikes})
})

router.get('/bike',async(req,res) =>{
    var bikes = await BikeModel.find({});
    res.render('bike_management',{bikes: bikes})
})

router.get('/product_page', async (req, res) => {
  var bikes = await BikeModel.find({});
  res.render('product_page', { bikes: bikes });
})

router.get('/delete/:id', async(req, res) => {
  await BikeModel.findByIdAndDelete(req.params.id)
  res.redirect('/');
})

router.get('/drop', async(req, res) => {
  await BikeModel.deleteMany({})
  .then(() => { console.log ('Delete all bikes succeed !')});
  
  res.redirect('/');
})

router.get('/add', (req, res) => {
  res.render('add');
})

router.post('/add', async (req, res) => {
  var toy = req.body;
  await BikeModel.create(bike)
  .then(() => { console.log ('Add new toy succeed !')});
  res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
  var bike = await BikeModel.findById(req.params.id);
  res.render('edit', { bike : bike});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var updatedData = req.body;
  await BikeModel.findByIdAndUpdate(id, updatedData)
    .then(() => { console.log('Edit toy succeed !') });
  res.redirect('/')

})


//sort function
router.get('/ascending', async (req, res) => {
  var bikes = await BikeModel.find().sort({ price: 1 })
  res.render('product_page', { toys: toys })
})

router.get('/descending', async (req, res) => {
  var bikes = await BikeModel.find().sort({ price: -1 })
  res.render('product_page', { bikes: bikes })
})

router.get('/filter',async (req,res) => {
  var brandName = req.body.brand;
  var bikes = await BikeModel.find().sort({ brand : brandName})
  res.render('product_page',{toys: toys})
})

module.exports = router;

