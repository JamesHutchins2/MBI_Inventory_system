const {MongoClient} = require('mongodb')
const express = require('express');
const app = express();
const port = 3000;
let db;

app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static('public'));

function passwordProtected() {

}

//routes
app.get("/", async (req, res) => {
    const allAnmimals = await db.collection('animals').find().toArray();
    console.log(allAnmimals);
    res.render('home', {animals: allAnmimals});
});
app.get('/admin', (req, res) => {
    res.render("admin")
});
app.get('/inventory', (req, res) => {
    res.render('inventory')
})
//get all inventory data
app.get('/api/inventory', async (req, res) => {
    const allInventory = await db.collection('inventory').find().toArray();
    res.json(allInventory);
});
app.get('/api/animals', async (req, res) => {
    const allAnmimals = await db.collection('animals').find().toArray();
    res.json(allAnmimals);
});

//import mongo
//mongodb://localhost:27017
async function start() {
    try {
        const client = new MongoClient("mongodb://root:root@172.30.176.1:27017/AmazingMernApp?&authSource=admin");
        await client.connect();
        console.log('Connected to database');
        db = client.db()
    } catch (e) {
        console.log(e);
    }
}
start();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

