const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
try {
    return res.status(200).render('index');
} catch (err) {
    console.log("INDEX ROUTE ERROR:", err.message);
    return res.status(500).send("An error occured, please try again later");
}})

app.get('*', (req, res) => {
try {
    return res.status(404).send('404');
} catch (err) {
    console.log("404 ROUTE ERROR:", err.message);
    return res.status(500).send("An error occured, please try again later");
}});

const port = process.env.PORT || 9193;
app.listen(port, () => console.log(`Listening on port ${port}...`));