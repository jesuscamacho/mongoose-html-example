const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function(req,res){
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    product.save(function (err) {
        if (err) {
            return console.log(err);
        }
        res.send('Product Created successfully')
    })
}

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        //if (err) return next(err);
        res.send(product);
    })
};
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        //if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.get_fruit = function(req, res){
    Product.find({}, (err,docs)=>{
        if(!err){
        res.send(docs);
        }else {throw err}
        
    })
    
};


//posting
//curl -d "param1=value1&param2=value2" -X POST http://localhost:3000/
// curl -d "name='apple'&price=6" -X POST http://localhost:3000/products/create 

//reading
//http://localhost:3000/products/5bb5171e1c2dff1520a1556c

//put