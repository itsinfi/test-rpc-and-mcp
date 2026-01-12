export async (req: Request, res: Response) => {
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