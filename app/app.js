const app = require('express')();
const mongoose = require('mongoose');
const { 
    Messages,
    StatusCodes
} = require('./utils/constants');
const cors = require('cors');
const bodyParser = require('body-parser');
const { 
    authRouter, 
    listingRouter, 
    reviewRouter 
} = require('./routes');
const { Response } = require('./utils/response');
const { MONGOURI, PORT } = require('./config');


// database connection
mongoose.connect(MONGOURI)
.then(() => {
    console.log("MongoDB connected...")
})
.catch((err) => {
    console.log("MongoDB connection error...", err);
})

// cors
app.use(cors());

// parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api/listings", listingRouter);
app.use("/api/reviews", reviewRouter);

// default route
app.get("*", (req, res) => {
    let response = new Response(
        StatusCodes.SUCCESS,
        {},
        Messages.WELCOME
    )
    res.json(response);
})

// listening to server on PORT
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
})
