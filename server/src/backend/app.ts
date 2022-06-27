import { Request, Response } from 'express';
import { CouponGeneratorService } from '../controllers/CouponGeneratorService';
import { Server } from './server';
import { Utils } from '../controllers/utils/GeneratorChooser';
import config from "../config.json";
import * as fs from "fs";

export class App {
    server?: Server;

    start() {
        this.server = new Server(3000);

        this.server.addRoute('/', (req: Request, res: Response) => {
            res.status(200).send(config);
        });

        this.server.addRoute('/generate', (req: Request, res: Response) => {
            const generator = new CouponGeneratorService(Utils.chooseGenerator());
            res
                .status(200)
                .send(JSON.stringify(generator.generate(req.body.valueLength, req.body.startValue && req.body.startValue)));
        }, "post");

        this.server.addRoute('/config', (req: Request, res: Response) => {
            const data = JSON.stringify({ quantity: req.body.quantity, algorithm: req.body.algorithm }, null, 4);

            fs.writeFileSync("../server/src/config.json", data);
            const newConfig = fs.readFileSync("../server/src/config.json", "utf-8")
            
            res.status(200).send(newConfig);
        }, "post");

        this.server.listen();
    }

    stop() {
        this.server?.shutdown();
    }
}