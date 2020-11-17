const express = require('express')
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes')
const getRoutes = require('./routes/getRoutes')
const cors = require('cors')
const {mongooseConnect} = require('./config')


const app = express();

// avoid deprecation warning
mongoose.set('useUnifiedTopology', true);

//emable cors
 app.use(cors())

app.use(express.json()); 


// Get Routes
app.use('/get', getRoutes)

app.get('/', (req, res) => res.send("<h1>Hi, qwerty</h1>"))

//post routes
app.use('/post', postRoutes)

const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log('server started on 8888')
    mongoose.connect(mongooseConnect, {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', () => console.log('error connecting to db'));
    db.once('open', () => console.log('connected to db'));
});

