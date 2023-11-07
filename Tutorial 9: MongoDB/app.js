const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
require("dotenv").config();

const app = express();

// connect to mongoDB; connect to port only after connection is established to database
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(3000, () => {
      console.log("port is running on 3000");
    })
  )
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// app.use((req, res, next) => {
//   console.log("new request made:");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
//   next();
// });

// third party middleware: morgan
app.use(morgan("dev"));

// middleware & static files
app.use(express.static("public"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// home routes
app.get("/", (req, res) => {
  // const blogs = [
  //   {
  //     title: "Yoshi finds eggs",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "Mario finds stars",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "How to defeat bowser",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  // ];

  // res.render("index", { title: "Home", blogs });
  res.redirect("/blogs");
});

// about routes
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blogs routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("654a805032b3ce8cbc45cfc3")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).res.render("404", { title: "404" });
});
