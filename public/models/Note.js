var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var NoteSchema = new Schema({
   // `id` is of type String
  id: String,
  // `title` is of type String
  title: String,
  // `body` is of type String
  body: String,
  // `link` is of type String
  link: String
    //required: true
  
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
