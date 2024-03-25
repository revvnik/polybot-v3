import express from "express";
import { config } from "../config.js";
export class Server {
    app;
    port;
    constructor() {
        this.app = express();
        this.app.use(express.text());
        this.port = 8866;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.app.get('/', (_req, _res) => {
            _res.send('Hello World! INCOMING FROM : ' + _req.ip);
        });
        this.app.post('/', (_req, _res) => {
            _res.send('Got a POST request');
        });
        this.app.get('/version', (_req, _res) => {
            _res.send("Current version is v3.0.0");
        });
        this.app.post('/version', (_req, _res) => {
            console.log('Got body:', _req.body);
            _res.send("Current version is v3.0.0");
        });
        this.app.get('/search', (_req, _res) => {
            _res.send('You searched for: ' + _req.query.keyword);
        });
        this.app.get("/admin", (_req, _res) => {
            if (_req.query.keyword == "restart") {
                if (_req.query.username !== config.ADMIN_USERNAME && _req.query.password !== config.ADMIN_PASSWORD) {
                    _res.send("Wrong credentials!");
                }
                else {
                    _res.send("Stopping server.");
                    process.exit(1);
                }
            }
            else {
                _res.send("Bad keyword.");
            }
        });
    }
    startServer() {
        // @ts-ignore
        this.app.listen(this.port, "0.0.0.0", () => {
            console.log(`Server is online! Listening on port`.green.bold, `${this.port}`.blue.bold);
        });
    }
}
