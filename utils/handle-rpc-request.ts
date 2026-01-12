import { type Request, type Response } from 'express';
import { RPC_SERVER } from './rpc-server';

export async function handleRpcRequest(
    req: Request,
    res: Response,
): Promise<Response<string, Record<string, unknown>>> {
    const body = await RPC_SERVER.receive(req.body);

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
