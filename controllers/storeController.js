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
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
}

exports.getStores = async (req,res) => {
  const stores = await Store.find();
  console.log(stores)
  res.render('stores', {title: 'Stores', stores})
}

exports.editStore = async (req,res) => {
  const store = await Store.findOne({_id: req.params.id})
  res.render('editStore', {title: `Edit ${store.name}`, store})
}

exports.updateStore = async (req,res) => {
  const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValdiators: true}).exec();
  req.flash('success', `<strong>${store.name}</strong> successfully updated. <a href="/stores/${store.slug}">View Updated Store →</a>`);
  res.redirect(`/stores/${store._id}/edit`);
}
