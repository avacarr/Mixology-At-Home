const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Alex:12345@cluster0.izjla.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
  });

const db = mongoose.connection

db.on('connected', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})

