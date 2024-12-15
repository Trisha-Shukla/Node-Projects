import express, { json, urlencoded } from 'express';
import fs from "fs";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(urlencoded({ extended: true }));
app.use(json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "form.html"));
});


app.post("/shorten-url", (req, res) => {
    try {
        const longUrl = req.body.longUrl;
        console.log("Long URL:", longUrl);

        const checkValid = isValid(longUrl);
        if (!checkValid) {
            return res.status(400).send({ message: "URL is not valid" });
        }

        const shortUrl = nanoid(10); 
        console.log("Short URL:", shortUrl);

        
        const oldData = fs.readFileSync("urlmap.json", { encoding: "utf-8" });
        const newData = JSON.parse(oldData);

        
        newData[shortUrl] = longUrl;

        
        fs.writeFileSync("urlmap.json", JSON.stringify(newData, null, 2));

        res.send({
            success: true,
            message: "URL Shortener API",
            result: `http://localhost:3000/${shortUrl}`,
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Error shortening URL: " + error });
    }
});


app.get("/:id", (req, res) => {
    try {
        const shortUrl = req.params.id;

        
        const file = fs.readFileSync("urlmap.json", { encoding: "utf-8" });
        const jsonFile = JSON.parse(file);

        if (jsonFile[shortUrl]) {
            res.redirect(jsonFile[shortUrl]);
        } else {
            res.status(404).send({ message: "Shortened URL not found" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Error redirecting URL: " + error });
    }
});


function isValid(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}


app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});
