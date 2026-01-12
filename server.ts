import express, { type Request, type Response } from 'express';
import { rpcServer } from './utils/rpc-server';

const app = express();
app.use(express.json());

rpcServer.addMethod('ping', () => 'pong');
rpcServer.addMethod('add', ({ a, b }) => a + b);

async function handleRpcRequest(req: Request, res: Response) {
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
}

app.post('/rpc', handleRpcRequest);

if (process.env.SERVER_URL || process.env.SERVER_PORT) {
    app.listen(process.env.SERVER_PORT, () => { console.log(`running SERVER on ${process.env.SERVER_URL}`) });
} else {
    throw new Error('SERVER_URL and/or SERVER_PORT not specified.')
}