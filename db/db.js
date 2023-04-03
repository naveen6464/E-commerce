var mongoose = require('mongoose');
var connectDB=mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://naveennataraj02:Naveenmongo@cluster0.bhlqu3c.mongodb.net/shop')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

module.exports= connectDB;