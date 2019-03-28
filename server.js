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

// scarpe echojs site
echoJSScrape = (aCallback) => {
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

        // Send articles to caller
        aCallback(articles);
    });

}

freeBeaconScrape = (aCallback) => {
    axios.get("https://freebeacon.com").then((response) => {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        let $ = cheerio.load(response.data);

        // Create an empty array of objects to hold the articles
        let articles = [];

        // Now, we grab every h2 within an article tag, and do the following:
        $("article").each(function (i, element) {
            // Save an empty  object
            var article = {};

            // Add the text and href of every link, and save them as properties of the result object
            article.url = $(this).children("header").children("h2").children("a").attr("href");
            article.imageUrl = $(this).children("div.entry-summary").children("a").children("img").attr("src");
            article.title = $(this).children("header").children("h2").children("a").text();
            article.body = $(this).children("div.entry-summary").children("p").text();

            // add to the array - only if valid title
            if (article.title) {
                articles.push(article);
            }

        });

        // Send articles to caller
        aCallback(articles);
    });

}

cnetScrape = (aCallback) => {
    axios.get("https://www.cnet.com/news/").then((response) => {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        let $ = cheerio.load(response.data);

        // Create an empty array of objects to hold the articles
        let articles = [];

        // Now, we grab every h2 within an article tag, and do the following:
        $(".assetBody").each(function (i, element) {
            // Save an empty  object
            var article = {};

            // Add the text and href of every link, and save them as properties of the result object
            article.url = $(this).children("a").attr("href");
            article.imageUrl = $(this).children("a").children("figure").children("img").attr("src");
            article.title = $(this).children(".assetText").children("h5").children("a").text();
            article.body = $(this).children(".assetText").children(".author").children("a").text();

            // add to the array - only if valid title
            if (article.title) {
                articles.push(article);
            }

        });

        // Send articles to caller
        aCallback(articles);
    });

}

// A GET route for scraping the  website
app.get("/api/scrape",  (req, res) => {
    cnetScrape(articles1 => {
        freeBeaconScrape(articles2 => {
            // Send a message to the client
            let articles = [...articles1, ...articles2]
            res.json(articles);
        });
    });


    // echoJSScrape(articles => {
    //     // Send a message to the client
    //     res.json(articles);
    // });
});

// Route for getting all Articles saved from the db with their notes
app.get("/api/savedArticles", (req, res) => {
    // Grab every document in the Articles collection
    db.Article.find({})
        // get notes with tis article
        .populate("notes")
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client with their notes
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// POST route for saving a new Note to the db and associating it with an Article
app.post("/api/saveArticleNote", function(req, res) {
    let articleId = req.body.articleId;
    let note = {};
    note.user = req.body.user;
    note.comments = req.body.comments;
    note.articleId = req.body.articleId;
    db.Note.create(note)
        .then((dbNote) => {
            return db.Article.findOneAndUpdate({_id: articleId}, { $push: { notes: dbNote._id } }, { new: true });
        })
        .then((dbArticle) => {
        // If the Article was updated successfully, send it back to the client
            res.json(dbArticle);
        })
        .catch((err) => {
        // If an error occurs, send it back to the client
            res.json(err);
        });
});

// Route for saving an Article to the DB
// Using post since axios is hackish using delete route - I dont like it
app.post("/api/saveArticle", (req, res) => {
    // Grab every document in the Articles collection
    let article = req.body;

    db.Article.create(article)
        .then((dbArticle) => {
            // View the added result in the console
            res.json(dbArticle);
        })
        .catch((err) => {
            // If an error occurred, log it
            res.json(err);
        });
});

// Route for saving an Article to the DB
app.post("/api/deleteArticle", (req, res) => {
    // Grab every document in the Articles collection
    let _id = req.body._id;
    let articleId = req.body._id;   // to make it clear I am deleting notes with this article Id

    // Delete all notes for this article first
    db.Note.deleteMany({
        articleId: articleId
    })
    .then(dbNote => {
        // then delete the article
        return db.Article.deleteOne({_id: _id});
    })
    .then((dbArticle) => {
        res.status(200).send(dbArticle);
    })
    .catch((err) => {
        // If an error occurred, log it
        res.json(err);
    });
});

// Route for Deleting a single note
// TODO: - Delete the referce from article as well
app.post("/api/deleteNote", (req, res) => {
    let _id = req.body._id;
    let articleId = req.body.articleId;

    // Delete notes
    db.Note.deleteOne({
        _id: _id
    })
    .then(dbNote => {
        // then take the _id out of the article array and update it
        return db.Article.findOneAndUpdate({ _id: articleId }, { $pull: { notes: _id } }, { new: true });
    })
    .then(dbArticle => {
        res.status(200).send(dbArticle);
    })
    .catch((err) => {
        // If an error occurred, log it
        res.json(err);
    });
});


// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", (req, res) => {
  db.Article.findOne({ _id: req.params.id })
    // populate all of the notes associated with it
    .populate("note")
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/api/addNote/:id", (req, res) => {
  let note = req.body;
  note.articleId = req.params.id;
  db.Note.create(req.body)
    .then((dbNote) => {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated Article -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true });
    })
    .then((dbArticle) => {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch((err) => {
      // If an error occurred, send it to the client
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

// Make sure our React files are being served by our Express server.
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', function (req, res) {
    const index = path.join(__dirname, 'client', 'build', 'index.html');
    res.sendFile(index);
});

// //production mode - serve from build dir, else serve from public
// if ((process.env.GCLOUD_PROJECT !== undefined) || (process.env.NODE_ENV === 'production')) {
//     // GCLOUD
//     app.use(express.static(path.join(__dirname, 'client/build')));
//     console.log(path.join(__dirname, 'client/build'));

//     app.get('*', (req, res) => {
//         console.log(path.join(__dirname, '/client/build/index.html'));
//         res.sendfile(path.join(__dirname = '/client/build/index.html'));
//     })
// } else {
//     //build mode
//     app.get('*', (req, res) => {
//         console.log(path.join(__dirname, '/client/public/index.html'));
//         res.sendFile(path.join(__dirname + '/client/public/index.html'));
//     })
// }

//Start server
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
});