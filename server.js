const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config();
const port = process.env.PORT || 5000;

var mongoose = require("mongoose");

// Our scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Make sure our React files are being served by our Express server.
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))



// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-1qm5r.gcp.mongodb.net/newsscraperdb?retryWrites=true`;
// Connect to the Mongo DB ATLAS
mongoose.connect(uri, {
    useNewUrlParser: true
});

// // Connect to the Mongo DB LOCAL
// mongoose.connect("mongodb://localhost:27017/newsscraperdb", {
//     useNewUrlParser: true
// });

// A GET route for scraping the  website
app.get("/api/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.echojs.com/").then((response) => {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        let $ = cheerio.load(response.data);

        // Create an empty array of objects to hold the articles
        let articles = [];

        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function (i, element) {
            // Save an empty  object
            var article = {};

            // Add the text and href of every link, and save them as properties of the result object
            article.url = $(this).children("a").attr("href");
            article.imageUrl = "";
            article.title = $(this).children("a").text();
            article.body = $(this).children("a").text();

            // add to the array
            articles.push(article);

        });

        // Send a message to the client
        res.json(articles);
    });
});

// Route for getting all Articles saved from the db
app.get("/api/savedArticles", (req, res) => {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for saving an Article to the DB
app.post("/api/saveArticle", (req, res) => {
    // Grab every document in the Articles collection
    let article = req.body;

    db.Article.create(article)
        .then( (dbArticle) => {
            // View the added result in the console
            console.log(dbArticle);
            res.json(dbArticle);
        })
        .catch( (err) => {
            // If an error occurred, log it
            console.log(err);
            res.json(err);
        });
});

// Route for saving an Article to the DB
app.post("/api/deleteArticle", (req, res) => {
    // Grab every document in the Articles collection
    let _id = req.body._id;

    db.Article.deleteOne({ _id: _id})
        .then( (dbArticle) => {
            // View the added result in the console
            console.log(dbArticle);
            return res.status(200).send(dbArticle);
        })
        .catch( (err) => {
            // If an error occurred, log it
            console.log(err);
            res.json(err);
        });
});


//Route setup
app.get('/api/user', (req, res) => {
    res.json({
        name: "Paul",
        email: "paul.linck@gmail.com"
    });
})

//production mode - serve from build dir, else serve from public
if ((process.env.GCLOUD_PROJECT !== undefined) || (process.env.NODE_ENV === 'production')) {
    // GCLOUD
    app.use(express.static(path.join(__dirname, 'client/build')));
    console.log(path.join(__dirname, 'client/build'));

    app.get('*', (req, res) => {
        console.log(path.join(__dirname, '/client/build/index.html'));
        res.sendfile(path.join(__dirname = '/client/build/index.html'));
    })
} else {
    //build mode
    app.get('*', (req, res) => {
        console.log(path.join(__dirname, '/client/public/index.html'));
        res.sendFile(path.join(__dirname + '/client/public/index.html'));
    })
}

//Start server
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
});