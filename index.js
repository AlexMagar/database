//mongoose

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry"]
    },
    //validation
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

//construct document
const fruit = new Fruit({
    name: "Apple",
    rating: 8,
    review: "Pretty good fruit"
});

// Fruit.inserOne(fruit, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Sucessful")
//     }
// });

//
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }else{

        mongoose.connection.close();

        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});

//fruit.save();

const findDocuments = function(db, callback){
    //get the documents collection
    const collection = db.collection('fruits');

    //find some documents
    collection.find({}).toArray(function(err, fruits){
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
}

//new schema
const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

//model of schema
const Person = mongoose.model("Person", personSchema);

//create new person
const person = new Person({
    name: "John",
    age: 37
});

person.save();