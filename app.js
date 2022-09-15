//mongodb
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { removeListener } = require('process');

//connection URL
const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'myMongoData';

//create a new MongoClient
const client = new MongoClient(url, );

//Use connect method to connect to the server
client.connect(function(err){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, function(){
        client.close();
    });
});

const insertDocuments = function(db, callback){
    //get the document collection
    const collection = db.collection('fruits');

    //insert some documents
    collection.insertMany([
        {
            name: "Apple",
            score: 7,
            revire: "Great fruit"
        },
        {
            name: "Banana",
            score: 9,
            revire: "Tasty fruit"
        },
        {
            name: "Cherry",
            score: 5,
            revire: "Lovely fruit"
        }
    ],function(err, result){
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);

    });
};

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