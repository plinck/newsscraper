var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `bod` is not required and of type String
  body: {
    type: String,
    required: false
  },
  // `url` is required and of type String
  url: {
    type: String,
    required: true
  },
  // `imageUrl` is not required and of type String
  url: {
    type: String,
    required: false
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
