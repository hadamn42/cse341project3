// dog data set gathered from https://gist.github.com/kastriotadili/acc722c9858189440d964db976303078
// cat data set gathered from https://www.kaggle.com/datasets/waqi786/cats-dataset
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
    //allows all origins wich isn't good for work but okay for this project
    res.setHeader('Access-Control-Allow-Origin', '*');
    //allows any header
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, 2-Key'
    );
    //allow all GET methods here
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }else {
       app.listen(port, () => {console.log(`Database is connectedly running on port ${port}`)}); 
    }
    console.log("one!");
})