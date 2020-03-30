const mongodb = require('mongodb');
const client = mongodb.MongoClient;

const url = "mongodb://localhost:27017";

const options = {useUnifiedTopology: true};

const databaseName = "TicketLeaveItDB"; //Database Name
const tableUsers = 'users';

module.exports = {

    createDatabase: function(){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;
            else
                console.log("Database has been created.");
            db.close();
        })
    },

    createCollection: function(collectionName){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;

            let database = db.db(databaseName);
            database.createCollection(collectionName, (err, res)=>{
                if(err) throw err;
                else
                    console.log("Collection `" + collectionName + "` created.");
                db.close();
            });
        });
    },

    insertOne: function(collectionName, record){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;

            let database = db.db(databaseName);

            database.collection(collectionName).insertOne(record, (err, res)=>{
                if (err) throw err;
                else
                    console.log("1 record has been appended");
                db.close();
            });

        });
    },

    insertMany: function(collectionName, records){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;

            let database = db.db(databaseName);

            database.collection(collectionName).insertMany(records, (err, res)=>{
                if (err) throw err;
                else
                    console.log("Records appended: " + res.insertedCount);
                db.close();
            });

        });
    },

    findOne: function(collectionName, query){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;

            let database = db.db(databaseName);

            database.collection(collectionName).findOne(query, (err, res)=>{
                if (err) throw err;
                else
                    console.log(res);
                db.close();
            });
        });
    },

    /* 
    Projection - find only specific documents //MYSQL where clause??
    using field: 1 or 0 as flag 
    {_id: 0, name: 1} //Shows only name
    {_id: 0, age: 0} //shows everything except age

    Sorting - sort documents //MYSQL orderBy clause
    using flag 1 - Ascending
    flag 0 - descending
    {_id: 0, name: 1} //Sorted in ascending order

    Limit //MYSQL Limit cause
    limits results to specific number
    */
    findMany: function(collectionName, query, sortAs = null, limit = null, proj = null){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;

            let database = db.db(databaseName);

            database.collection(collectionName).find(query, {projection: proj})
            .sort(sortAs)
            .limit(limit)
            .toArray((err, res)=>{
                if (err) throw err;
                else
                    console.table(res);
                db.close();
            });
        });
    },

    deleteOne: function(collectionName, filter){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;
            
            let database = db.db(databaseName);

            database.collection(collectionName).deleteOne(filter, (err, res)=>{
                if (err) throw err;
                else 
                    console.log("1 Document has been deleted.");
                db.close();
            });
        });
    },

    deleteMany: function(collectionName, filter){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;
            
            let database = db.db(databaseName);

            database.collection(collectionName).deleteMany(filter, (err, res)=>{
                if (err) throw err;
                else 
                    console.log("Documents deleted: " + res.deletedCount);
                db.close();
            });
        });
    },

    dropCollection: function(collectionName){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;
            var database = db.db(databaseName);
            database.collection(collectionName).drop((err, res)=>{
                if(err) throw err;
                if(res) 
                    console.log("Collection `" + collectionName + "` dropped.");
                db.close();
            })
        })
    },

    updateOne: function(collectionName, filter, newValue){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;
            
            let database = db.db(databaseName);

            database.collection(collectionName).updateOne(filter, newValue, (err, res)=>{
                if (err) throw err;
                else 
                    console.log("1 Document updated.");
                db.close();
            });
        });
    },

    updateOne: function(collectionName, filter, newRecord){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;
            
            let database = db.db(databaseName);

            database.collection(collectionName).updateOne(filter, newRecord, (err, res)=>{
                if (err) throw err;
                else 
                    console.log("1 record updated.");
                db.close();
            });
        });
    },

    updateMany: function(collectionName, filter, newRecords){
        client.connect(url, options, (err, db)=>{
            if(err) throw err;
            
            let database = db.db(databaseName);

            database.collection(collectionName).updateMany(filter, newRecords, (err, res)=>{
                if (err) throw err;
                else 
                    console.log("Documents updated: " + res.modifiedCount);
                db.close();
            });
        });
    }

}