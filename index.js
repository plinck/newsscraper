const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;


// Make sure our React files are being served by our Express server.
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

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