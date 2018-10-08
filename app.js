const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app


const product = require('./routes/product.route'); // Imports routes for the products
const app = express();


// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://admin:admin1@ds115753.mlab.com:15753/support-app-db';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true},(err)=>{
    console.log('mongo db connection',err);
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

app.get("/", function (req, res) {
   // console.log(__dirname, 'views/index.html')
    return res.sendFile('views/index.html',{root: __dirname});
});
app.use(express.static('views'));

app.listen(3000, () => {
    console.log('Server is up and running on port numner ' + 3000);
});