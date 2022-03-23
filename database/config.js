const mongoose = require('mongoose')

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected')

    } catch(err){
        console.log(err);
        throw new Error('Connection error');
    }
}


module.exports = {
    dbConnection
}