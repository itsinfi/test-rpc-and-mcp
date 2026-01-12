import express, { type Request, type Response } from 'express';
import { JSONRPCServer } from "json-rpc-2.0";

const app = express();
app.use(express.json());

const rpcServer = new JSONRPCServer();

rpcServer.addMethod('ping', () => 'pong');
rpcServer.addMethod('add', ({ a, b }) => a + b);

app.post('/rpc', async (req: Request, res: Response) => {
    const body = await rpcServer.receive(req.body);

    console.log('body', body);

    if (body) {
        if (body.error) {
            return res.status(404).json(body);    
        }

        return res.json(body);
    } else {
        return res.sendStatus(204);
    }
});

app.listen(process.env.SERVER_PORT, () => { });