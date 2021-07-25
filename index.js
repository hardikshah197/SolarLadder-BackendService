const app = require('./api');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const URI = process.env.URI;
const mongoose = require('mongoose')

app.listen(PORT, () => {
    console.log(`backend is running :: listening at ${PORT}`)
});

connect()
.then(() =>{
  console.log('connected to mongo db');
})
.catch(err => {
  console.log(`not connected to mongo db due to ${err}`)
});

function connect() {
    return new Promise((resolve, reject) => {
      mongoose.connect(URI,{ useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true,  useFindAndModify: false})
          .then((res, err) => {
          if(err) {
            console.log("not connected");
            return reject(err);
          }
          resolve();
          })
    });
}