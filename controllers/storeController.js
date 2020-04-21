const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req,file,next){
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto){
      next(null,true)
    } else {
      next({message:'That filetype isn\'t allowed!'}, false)
    }
  }
};
const jimp = require('jimp');
const uuid = require('uuid');

exports.homepage = (req,res) => {
    res.render('index')
};

exports.addStore = (req,res) => {
  res.render('editStore', {title: 'Add Store'})
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  if(!req.file){
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
};

exports.createStore = async (req,res) => {
  req.body.author = req.user._id;
  const store = await(new Store(req.body)).save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/stores/${store.slug}`);
};

exports.getStores = async (req,res) => {
  const stores = await Store.find();
  res.render('stores', {title: 'Stores', stores});
};

exports.getStoreBySlug = async (req,res) => {
  const store = await Store.findOne({slug: req.params.slug})
  if(!store) return next();
  res.render('viewStore', {title: store.name, store});
};

const confirmOwner = (store, user) => {
  if(!store.author.equals(user._id)){
    throw Error('You must own a store in order to edit it!');
  }
};

exports.editStore = async (req,res) => {
  const store = await Store.findOne({_id: req.params.id});
  confirmOwner(store,req.user);
  res.render('editStore', {title: `Edit ${store.name}`, store});
}

exports.updateStore = async (req,res) => {
  req.body.location.type = 'Point';
  const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValdiators: true}).exec();
  req.flash('success', `<strong>${store.name}</strong> successfully updated. <a href="/stores/${store.slug}">View Updated Store →</a>`);
  res.redirect(`/stores/${store._id}/edit`);
};

exports.getStoresByTag = async (req,res) => {
  const tag = req.params.tag;
  const tagQuery = tag || {$exists: true}
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagQuery});
  const [tags,stores] = await Promise.all([tagsPromise,storesPromise])
  res.render('tag', {tags, title: 'Tags', tag, stores});
};

exports.searchStores = async (req,res) => {
  const stores = await Store.find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: {$meta: 'textScore'}
  }).sort({
    score: { $meta: 'textScore'}
  }).limit(5);
  res.json(stores);
};

exports.mapStores = async (req,res) => {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
  const q = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates
        },
        $maxDistance: 10000
      }
    }
  }
  const stores = await Store.find(q).select('photo name').limit(10);
  res.json(stores);
}
