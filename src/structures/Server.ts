import * as express from "express";

const server = express();
server.all("/", (res) => {
    res.send("Server online!");
});

export function keepAlive() {
    server.listen(3000, () => {
        console.log("Server is online!".green.bold)
    })
}