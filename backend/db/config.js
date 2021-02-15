const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('DB connected');
    } catch (error) {
        throw new Error('error al iniciar la base');
    }
}

module.exports = {
    dbConnect
}