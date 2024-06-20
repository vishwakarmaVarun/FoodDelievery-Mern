const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const mongoDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(async () => {
            console.log('Connected to database');
            // Perform further operations here
            const fetchedData = mongoose.connection.db.collection("fooditems");
            const foodCategory = mongoose.connection.db.collection("foodcategory");
            try {
                const data = await fetchedData.find().toArray();
                const catData = await foodCategory.find().toArray();
                global.fooditems = data;
                global.foodcategory = catData;
            } catch (error) {
                console.log(error);
            }
        })
        .catch((error) => {
            console.error('Error connecting to database:', error);
        });
}

module.exports = mongoDB;