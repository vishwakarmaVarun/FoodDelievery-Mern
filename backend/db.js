const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://vamit7401:varun1234@cluster0.uzwpozt.mongodb.net/goodfoodmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    await mongoose.connect(mongoURI)
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