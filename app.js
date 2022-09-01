const express = require("express")
const app = express();
const ejs = require('ejs');
const Sequelize = require('sequelize')
require('express-async-errors');

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

const errorHandling = (err, req, res, next) => {
    res.status(500).json({
        msg: err.message,
        success: false
    })
}

app.use(errorHandling)

require('./routes/post.routes')(app)

const db = require('./models')
db.sequelize.sync().then(() => console.log('db connected'))
// console.log(db)

app.get('/', (req, res) => {
    res.render('index')
})


app.listen(3000, () => console.log('Server running'))