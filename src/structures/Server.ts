import express from 'express';
import "colorts/lib/string.js"

const app: express.Application = express();
const port: number = 6233;
let fullURL: string;

// Handling '/' Request
app.get('/', (_req, _res) => {
    fullURL = _req.protocol + '://' + _req.get('host') + _req.originalUrl;
    _res.send("Server online!");
});

// Server setup
app.listen(port, () => {
    console.log(`App listening on ${fullURL}:${port}`);
});

export function keepAlive() {
    app.listen(3000, () => {
        console.log("Server is online!".green.bold)
    })
}