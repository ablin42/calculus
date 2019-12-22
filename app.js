const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

// Middleware
//-- Body parser --//
    // Parse app/x-www-form-urlencoded
  //a/pp.use(bodyParser.urlencoded({extended: false}));
    // Parse app/json
    //app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    return res.status(200).render('index');
    return res.status(200).send('Hello world');
})

app.get('*', (req, res) => {
    let obj = {
        active: "404"
    };
    return res.status(404).send("'404', obj");
});

const port = process.env.PORT || 9193;
app.listen(port, () => console.log(`Listening on port ${port}...`));