import { APP_CONFIG } from './config/config';
import express, { type Request, type Response } from 'express';
import { sendRpcRequest } from './utils/send-rpc-request';

const app = express();
app.use(express.json());

app.post('/:method', async (req: Request, res: Response) => {
    if (req?.params?.method === undefined) {
        throw new Error('no method provided');
    }

    const method = req?.params?.method?.toString().replaceAll('-', '/') ?? '';
    return await sendRpcRequest(req, res, method);
});

app.listen(APP_CONFIG.CLIENT_PORT, () => {
    console.log(`running CLIENT on ${APP_CONFIG.CLIENT_URL}`);
});
