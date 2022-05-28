const mongooseClient = require('mongoose');

const dataConnection = async () => {

    const uri = "mongodb+srv://lawrence:Owuradarko1@cluster0.wzsvwil.mongodb.net/?retryWrites=true&w=majority";
    
    try {
        const client = await mongooseClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`"MongoDB connected:" ${client.connection.host}`);
    } catch (error) {
        console.log(`"MongoDB connection error:" ${error}`);
        process.exit();
    }
};

module.exports = {dataConnection};