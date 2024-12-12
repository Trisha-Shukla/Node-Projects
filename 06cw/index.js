const express = require("express");
const app = express();

const loggingMiddleware = (req, res, next) => {
    const start = Date.now();

    console.log(`Incoming Request: ${req.method} ${req.url} at ${new Date().toISOString()}`);

    res.on("finish", () => {
        const duration = Date.now() - start; 
        console.log(`Response Status: ${res.statusCode} | Time Taken: ${duration}ms`);
    });

    next();
};


app.use(loggingMiddleware);


app.get("/", (req, res) => {
    setTimeout(() => res.send("Hello world"), 2000); // Simulate delay
});

app.get("/about", (req, res) => {
    setTimeout(() => res.send("About Page"), 200); // Simulate delay
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
