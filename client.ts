import express, { type Request, type Response } from 'express';
import { sendRpcRequest } from './utils/send-rpc-request';

const app = express();
app.use(express.json());

app.post('/ping', async (req: Request, res: Response) => {
    return await sendRpcRequest(req, res, 'ping');
});

app.post('/add', async (req: Request, res: Response) => {
    return await sendRpcRequest(req, res, 'add');
});

if (process.env.CLIENT_URL || process.env.CLIENT_PORT) {
    app.listen(process.env.CLIENT_PORT, () => { console.log(`running CLIENT on ${process.env.CLIENT_URL}`) });
} else {
    throw new Error('CLIENT_URL and/or CLIENT_PORT not specified.')
}