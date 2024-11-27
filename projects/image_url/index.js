const express = require("express");

const app = express();

// Serve static files from the "images" folder
app.use(express.static("images"));
app.use(express.json());
app.use(express.urlencoded({}));

const project = {
    id: 1,
    title: "mobile",
    // Use the correct URL for the image
    image: "http://localhost:8080/image.png"
}

app.get("/products", (req, res) => {
    res.json(project);
})
app.post("/login", (req, res) => {
    console.log(req.body);
    
    res.json(project);
})

app.listen(8080, () => console.log("Server running at http://localhost:8080"));
