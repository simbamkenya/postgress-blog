const express = require("express")
const app = express();
const ejs = require('ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})


app.listen(3000, () => console.log('Server running'))