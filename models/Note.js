var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var NoteSchema = new Schema({
  // `user` is of type String and is the user who posted note
  user: String,
  // `comments` is of type String and is the note contents
  comments: String,

  // I added article ID to note so I can delete all notes easily when article is deleted.
  articleId: {
    type: Schema.Types.ObjectId,
    required: true
  }

});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
