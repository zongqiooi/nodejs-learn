const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema: defines the structure of documents
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      reqeuired: true,
    },
  },
  { timestamps: true }
);

// model: surrounds schema to communicate with DB collections
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
