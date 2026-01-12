import express, { type Request, type Response } from 'express';

const app = express();
app.use(express.json());

const rpcUrl = `${process.env.SERVER_URL}/rpc`;

async function sendRpcRequest(req: Request, res: Response, method: String) {
    try {
        const params = req.body;

        const response = await fetch(rpcUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: Date.now().toString(),
                method,
                params,
            }),
        });

        console.log(response);

        if (response.status !== 200) {
            const error = (await response.json() as unknown as { error: String | Object })?.error ?? 'error'
            return res.status(response?.status ?? 500).json({ error });
        }

        const result = (await response.json() as unknown as { result: String | Object })?.result ?? 'success';
        return res.status(200).json({ result });
    } catch (error: unknown) {
        return res.status(500).json({ error });
    }
}

app.post('/ping', async (req: Request, res: Response) => {
    return await sendRpcRequest(req, res, 'ping');
});

app.post('/add', async (req: Request, res: Response) => {
    return await sendRpcRequest(req, res, 'add');
});

app.listen(process.env.CLIENT_PORT, () => { });