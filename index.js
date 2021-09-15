const express = require('express');
const mongoose = require('mongoose');
const mongoAtlasUri = "";

mongoose.connect(mongoAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(x => {
    console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
}).catch(err => {
        console.error("Error connecting to mongo", err);
});

const User = require('./mongo/models/user');
const Restaurant = require('./mongo/models/restaurant');
const Table = require('./mongo/models/table');
const Booking = require('./mongo/models/booking');

const app = express();
app.use(express.json());

//CONTROLLERS
app.get('/', async (req, res) => {
    res.send("Hey")
})

app.get('/user/:userid', async (req, res) => {
    const userId = req.params.userid;
    let foundUser = await User.findById(userId);
    if(foundUser){
        res.status(200).json(foundUser)
    } else {
        res.status(400).json({message: "Not Found"})
    }
    
})

app.post('/user', async (req, res) => {
    try {
        const newUser = new User(req.body);
        let saveUser = await newUser.save();
        res.status(200).json(saveUser);
    } catch(err){
        res.status(500).send(err.message);
    }
})

app.get('/user/bookings/:userid', async (req, res) => {
    const userId = req.params.userid;
    let foundBooking = await Booking.find({ user_id: userId});
    if (foundBooking) {
        res.status(200).json(foundBooking)
    } else {
        res.status(400).json({ message: "Not Found" })
    }
})

app.get('/bookings/:bookingid', async (req, res) => {
    const bookingId = req.params.bookingid;
    let foundBooking = await Booking.findById(bookingId);
    if (foundBooking) {
        res.status(200).json(foundBooking)
    } else {
        res.status(400).json({ message: "Not Found" })
    }
})

app.post('/book', async (req, res) => {
    const bookObject = req.body;
    const restaurant = await Restaurant.findById(bookObject.restaurant_id);
    const requestedDay = req.body.day;
    const restaurantOpen = restaurant.working_hrs[requestedDay].start;
    const restaurantClose = restaurant.working_hrs[requestedDay].end;

    if (bookObject.start >= restaurantOpen && bookObject.end <= restaurantClose) {
        const restaurantTables = await Table.find({ restaurant_id: bookObject.restaurant_id, 'capacity': { $gte: bookObject.capacity}});

        if (restaurantTables.length > 0) {
            const bookedTablesInThisTimeRange = await Booking.find({
                day: requestedDay, restaurant_id: bookObject.restaurant_id,
                $and: [
                    { 'start': { $lt: bookObject.end}},
                    { 'end': { $gt: bookObject.start }}
                ]
            });

            const freeTables = [];
            restaurantTables.forEach((table) => {
                if (!bookedTablesInThisTimeRange.some(bookedTable => bookedTable.table_id === table._id.toString())) {
                    freeTables.push(table);
                }
            });
            if (freeTables.length < 1) {
                res.status(400).send(`Sorry!! All tables booked in this time range`);
            }

            const newBooking = new Booking({ ...req.body, table_id: freeTables[0].id});
            let saveBooking = await newBooking.save();
            res.status(200).json(saveBooking);

        } else {
            res.status(400).send(`Sorry!! No tables found for this restaurant. Try to reduce capacity according to tables`);
        }
    } else {
        res.status(400).send(`Please book b/w timings ${restaurantOpen} to ${restaurantClose}`);
    }
})

app.get('/user/restaurants/:userid', async (req, res) => {
    const userId = req.params.userid;
    let foundRestaurants = await Restaurant.find({ owner_id: userId});
    if (foundRestaurants) {
        res.status(200).json(foundRestaurants)
    } else {
        res.status(400).json({ message: "Not Found" })
    }
})

app.get('/restaurant/:restaurantid', async (req, res) => {
    const restaurantId = req.params.restaurantid;
    let foundRestaurant = await Restaurant.findById(restaurantId);
    if (foundRestaurant) {
        res.status(200).json(foundRestaurant)
    } else {
        res.status(400).json({ message: "Not Found" })
    }
})

app.post('/restaurant', async (req, res) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        let saveRestaurnt = await newRestaurant.save();
        res.status(200).json(saveRestaurnt);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.post('/table', async (req, res) => {
    //check if user is owner of restaurant mention in body
    try {
        const newTable = new Table(req.body);
        let saveTable = await newTable.save();
        res.status(200).json(saveTable);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.listen(3000, () => {
    console.log('Hey');
})