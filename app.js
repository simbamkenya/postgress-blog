const express = require("express")
const app = express();
const ejs = require('ejs');
const Sequelize = require('sequelize')

require('./routes/post.routes')(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

const db = require('./models')
db.sequelize.sync().then(() => console.log('db connected'))
// console.log(db)

app.get('/', (req, res) => {
    res.render('index')
})


app.listen(3000, () => console.log('Server running'))