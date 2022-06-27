import express, { json, Router } from "express";
import * as http from "http";
import cors from 'cors';

export class Server {
    private express: express.Express;
    private port: number;
    private serverInstance?: http.Server;

    constructor(port: number) {
        this.port = port;
        this.express = express();
        this.express.use(cors());
        this.express.use(json());
    }

    /**
     * Initializes the http server
     */
    listen() {
        this.serverInstance = this.express.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        })
    }

    /**
     * Adds a route to the server instance
     * @param name Route path
     * @param callback Action when route path is visited
     * @param subroutes Optional subroutes of the route path
     */
    addRoute(name: string, callback: Function, method?: string, subroutes?: Array<{ name: string, callback: Function }>) {
        if (!method || method.toLowerCase() == "get") {
            this.express.get(name, (req, res) => {
                callback(req, res);
            });
        }
        
        if (method?.toLowerCase() == "post") {
            this.express.post(name, (req, res) => {
                callback(req, res);
            });
        }

        if (subroutes) {
            this.addSubroutes(name, subroutes);
        }
    }

    /**
     * Adds secondary routes to a main route
     * @param name Main route path
     * @param subroutes Subroutes to be added to the main route path
     * 
     * Example: 
     * For the main route /dashboard we add /dashboard/activities
     * 
     * Subroutes, as main routes do, need a name and a callback function to determine
     * the action whenever the user requests the path.
     */
    private addSubroutes(name: string, subroutes: Array<{ name: string, callback: Function }>) {
        const router = Router();
        this.express.use(name, router);

        // Iterate over the array of objects and creates a subroute for the given name
        subroutes.map(({ name, callback }) => router.get(name, (req, res) => callback(req, res)));
    }

    /**
     * Shutdowns the server process
     */
    shutdown() {
        if (this.serverInstance) {
            this.serverInstance.close(err => err && console.log(err.message));
        }
    }
}