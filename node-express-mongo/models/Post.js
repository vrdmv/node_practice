const mongoose = require("mongoose");

// We create a schema, i.e. we describe how the data looks
// i.e. title (string) + description

const PostSchema = mongoose.Schema({
  todoText: {
    type: String,
    required: true
  },
  todoStatus: {
    type: String,
    required: true
  }
}, { collection: 'todos' });

// if we need a string to be required, we can create an object

// once we have the schema, we the model function a name for the schema,
// the schema itself after which export it
module.exports = mongoose.model("Posts", PostSchema);
