const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 9000
const dbURI = 'mongodb+srv://faaz:faaz2662@cluster0.2owdi.mongodb.net/node-tuts?retryWrites=true&w=majority'

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.set('strictQuery', false);
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(require('./routes/routes'))

app.listen(port, () => console.log(`MUSALA Soft app listening on port ${port}!`))