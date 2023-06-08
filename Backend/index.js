//const ConnectToMongo = require('./db');
//ConnectToMongo();

const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');
const ScrapMcDonalds = require('./routes/McAddItem');
const ScrapLayers = require('./routes/LayersAddItem');
const ScrapKFC = require('./routes/KFCAddItem');

const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS).then(()=>{

  console.log('Database Connected!');

});


//ScrapMcDonalds();
//ScrapLayers();
//ScrapKFC();

app.use(express.json())
app.use(cors())
//Available Routes

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/order', require('./routes/order'));
app.use('/api/v1/additem', require('./routes/McAddItem'));
app.use('/api/v1/restaurants', require('./routes/restaurant'));
app.use('/api/v1/items', require('./routes/items'));
app.use('/api/v1/auth', require('./routes/authdp'));
app.use('/api/v1/geofence', require('./routes/geofencing'));
app.use('/api/v1/commentanalyze', require('./routes/commentanalyzer'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

