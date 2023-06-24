var express = require('express');
const ToyModel = require('../Model/ToyModel');
const BikeModel = require('../Model/BikeModel');
var router = express.Router();

router.get('/', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('index', { toys : toys })
})

router.get('/admin',async (req,res) =>{
  var toys = await ToyModel.find({});
  res.render('index', {toys: toys})
})

router.get('/back',async (req,res) =>{
  var toys = await ToyModel.find({});
  res.render('product_page', {toys: toys})
})

router.get('/bike',async(req,res) =>{
  var bikes = await BikeModel.find({});
  res.render('bike_management',{bikes: bikes})
})

router.get('/listbike',async(req,res) =>{
  var bikes = await BikeModel.find({});
  res.render('bike_page',{bikes:bikes})
})

router.get('/product_page', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('product_page', { toys: toys });
})

router.get('/product_page', async (req, res) => {
  var bikes = await BikeModel.find({});
  res.render('product_page', { bikes: bikes });
})

router.get('/delete/:id', async(req, res) => {
  await ToyModel.findByIdAndDelete(req.params.id)
  res.redirect('/');
})

router.get('/drop', async(req, res) => {
  await ToyModel.deleteMany({})
  .then(() => { console.log ('Delete all toys succeed !')});
  
  res.redirect('/');
})

router.get('/add', (req, res) => {
  res.render('add');
})

router.post('/add', async (req, res) => {
  var toy = req.body;
  await ToyModel.create(toy)
  .then(() => { console.log ('Add new toy succeed !')});
  res.redirect('/');
})

router.get('/add_bike', (req, res) => {
  res.render('add_bike');
})

router.post('/addbike', async (req, res) => {
  var toy = req.body;
  await BikeModel.create(bike)
  .then(() => { console.log ('Add new bike succeed !')});
  res.redirect('bike_management');
})


router.get('/delete_bike/:id', async(req, res) => {
  await BikeModel.findByIdAndDelete(req.params.id)
  res.redirect('bike_magagement');
})

router.get('/edit/:id', async (req, res) => {
  var toy = await ToyModel.findById(req.params.id);
  res.render('edit', { toy : toy});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var updatedData = req.body;
  await ToyModel.findByIdAndUpdate(id, updatedData)
    .then(() => { console.log('Edit toy succeed !') });
  res.redirect('/')

})


//sort function
router.get('/ascending', async (req, res) => {
  var toys = await ToyModel.find().sort({ price: 1 })
  res.render('product_page', { toys: toys })
})

router.get('/descending', async (req, res) => {
  var toys = await ToyModel.find().sort({ price: -1 })
  res.render('product_page', { toys: toys })
})

router.get('/filter',async (req,res) => {
  var brandName = req.body.brand;
  var toys = await ToyModel.find().sort({ brand : brandName})
  res.render('product_page',{toys: toys})
})

module.exports = router;

