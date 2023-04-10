const mongoose = require('mongoose')
module.exports =async function(db){
    try {
        const options = {
            maxPoolSize  : 10,
            useNewUrlParser: true,
            // useCreateIndex : true,
            useUnifiedTopology : true
            // useFindAndModify : false
        }
        // const uri = `mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`;
        const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.diq3bou.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
        mongoose.connect(uri,options).then(()=>{
            console.log("database connected succesfully..");
        });  
    } catch (error) {
        console.log("Database not connected",error);
        throw new Error("Database not connected.")
    }
    
}