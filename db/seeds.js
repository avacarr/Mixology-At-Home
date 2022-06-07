
require('./connection')
require('dotenv').config();

const Logs = require('../models/recipes')
const logSeeds = require('./seeds.json')

Logs.deleteMany({})
.then(() => {
    return Logs.insertMany(logSeeds)
}).then ((logs) => {
    console.log(logs)
}).catch(console.error)
.finally(() => {
    process.exit()
})