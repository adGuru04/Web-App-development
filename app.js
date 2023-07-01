const express = require('express');
const bodyParser = require('body-parser');

const path =  require('path');
 
const app = express();

app.set('view engine','pug');
app.set('views','views');

const admindata = require('./routes/admin');
const shoproutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));


app.use('/admin',admindata.routes);
app.use(shoproutes);


app.use((req, res, next) => {
        res.status(404).render('404', {pageTitle:'Page not found'});
});

           

app.listen(2000);