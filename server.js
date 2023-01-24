const {MongoClient, ObjectId} = require('mongodb')
const express = require('express');
const app = express();
const sanitizeHTML = require('sanitize-html');
const cron = require('cron');
//file upload
const multer = require('multer');
const upload = multer();
const port = 3000;
const fse = require('fs-extra');
const sharp = require('sharp');
let db;
const path = require('path');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const AnimalCard = require('./src/components/AnimalCard').default;
//when the server starts, make the photos folder exitst
fse.ensureDirSync(path.join('public', 'uploaded-photos'));

//scraper function
import scrape from "./scraper.js"
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static('public'));
//if browsers sends json we can use it
app.use(express.json());
//if browsers sends urlencoded data we can use it (HTML FORM)
app.use(express.urlencoded({extended: false}));

//now to make it able to send photos (multipart/form-data)

//cron operation 
const job = new cron.CronJob('*/10 * * * * *', async ()=>{
    console.log('cron job')
    
    let allAnimals = await db.collection('animals').find().toArray();
    
    
    let names = allAnimals.map(object => object.name);
    console.log(names);
        //for each ip address call scraper and get heigh value
        //for that item animal place the new height value into the db 
        //move the old one to history

})
job.start();




//Basic YWRtaW46YWRtaW4= is admin admin
function passwordProtected(req,res,next) {
    res.set('WWW-Authenticate', 'Basic realm="Our MERN App"')
    if(req.headers.authorization == "Basic YWRtaW46YWRtaW4="){
        next()
    }else{
        console.log(req.headers.authorization)
        res.status(401).send("Authentication required")
    }

}

//routes
app.get("/", async (req, res) => {
    const allAnimals = await db.collection('animals').find().toArray();
    const  generatedHTML = ReactDOMServer.renderToString(
        <div className='container'>
            <div className='animal-grid mb-3'>
                {allAnimals.map(animal => <AnimalCard key = {animal._id} name={animal.name} species={animal.species} photo={animal.photo} id={animal._id} bay={animal.bay} readOnly={true}/>
                )}
                
            </div>
            <p><a href = "/admin">manage items</a></p>

        </div>
    
    )

    res.render('home', {generatedHTML});
});

//any urls after here will be password protected **order matters**
app.use(passwordProtected)

app.get('/admin',  (req, res) => {
    res.render("admin")
});
app.get('/inventory', (req, res) => {
    res.render('inventory')
})
//get all inventory data
app.get('/api/inventory', async (req, res) => {
    const allInventory = await db.collection('inventory').find().toArray();
    res.json('inv');
});
app.get('/api/animals', async (req, res) => {
    const allAnmimals = await db.collection('animals').find().toArray();
    res.json(allAnmimals);
});
//now for post paths
app.post("/create-animal", upload.single("photo"),ourCleanup, async (req,res)=>{
    if(req.file){
        //there is a photo to upload
        const photofileName = `${Date.now()}.jpg`
        await sharp(req.file.buffer).resize(844,456).jpeg({quality: 60}).toFile(path.join('public', 'uploaded-photos', photofileName))
        req.cleanData.photo = photofileName
    }


    console.log(req.body);
    //info contains the id of the new doc
    const info = await db.collection('animals').insertOne(req.cleanData);
    const newAnimal = await db.collection('animals').findOne({_id: new ObjectId(info.insertedId)});
    //send back an object of the new animal
    res.send(newAnimal)
})
app.delete("/animal/:id", async (req,res)=>{
    //handle protection
    if(typeof req.params.id != "string") req.params.id ="";

    const doc = await db.collection('animals').findOne({_id: new ObjectId(req.params.id)});
    if(doc.photo){
        fse.remove(path.join('public', 'uploaded-photos', doc.photo))
    }

    const id = req.params.id;
    db.collection('animals').deleteOne({_id: new ObjectId(id)});
    res.send("success")
})
app.post("/update-animal", upload.single("photo"), ourCleanup, async (req,res)=>{
    //if they upload a new photo
    if(req.file){
        //there is a photo to upload
        const photofileName = `${Date.now()}.jpg`
        await sharp(req.file.buffer).resize(844,456).jpeg({quality: 60}).toFile(path.join('public', 'uploaded-photos', photofileName))
        req.cleanData.photo = photofileName

        //update in the DB
        const info = await db.collection('animals').findOneAndUpdate({_id: new ObjectId(req.body._id)}, {$set: req.cleanData});
        //if info has a photo
        if(info.value.photo){
            fse.remove(path.join('public', 'uploaded-photos', info.value.photo))

        }
        }else{

            db.collection('animals').findOneAndUpdate({_id: new ObjectId(req.body._id)}, {$set: req.cleanData});
            res.send(false)
        }
})

//for preventing injection attacks
function ourCleanup(req,res,next){
    //make sure there are no objects
    if(typeof req.body.name != "string") req.body.name = "";
    if(typeof req.body.species != "string") req.body.species = "";
    if(typeof req.body._id != "string") req.body._id = "";
    //add new object to request
    req.cleanData = {
        name: sanitizeHTML(req.body.name.trim(), {allowedTags: [], allowedAttributes: {}}),
        species: sanitizeHTML(req.body.species.trim(), {allowedTags: [], allowedAttributes: {}}),
    }

    next();
}


async function start() {
    try {
        const client = new MongoClient("mongodb://root:root@172.27.64.1:27017/AmazingMernApp?&authSource=admin");
        await client.connect();
        console.log('Connected to database');
        db = client.db()
    } catch (e) {
        console.log(e);
    }
}
start();



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//0 */2 * * *