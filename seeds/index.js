const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedhelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => {
        console.log('CONNECTION OPEN')
    }).catch(err => {
        console.log('oh no error')
        console.log('err')
    })

const sample = (array) => array [Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fb8270e130b8624b03ecc1e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dhxqnvkai/image/upload/v1606169865/YelpCamp/nltoustci7qzovwibm8b.jpg',
                    filename: 'YelpCamp/eh0wwhuxxdkxoa7fcyfi'
                }
            ],
            description: 'Lorem ipdum weeeeee woooooo weeeeeeeee woooooooooooo weeee woooo',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});