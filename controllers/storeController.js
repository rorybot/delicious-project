const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homepage = (req,res) => {
    res.render('index')
}

exports.addStore = (req,res) => {
  res.render('editStore', {title: 'Add Store'})
}

exports.createStore = async (req,res) => {
  const store = await(new Store(req.body)).save();
  console.log(req.body)
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
}

exports.getStores = async (req,res) => {
  const stores = await Store.find();
  console.log(stores)
  res.render('stores', {title: 'Stores', stores})
}