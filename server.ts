import { APP_CONFIG } from './config/config';
import express from 'express';
import { RPC_SERVER } from './utils/rpc-server';
import { handlePing } from './handlers/handle-ping';
import { handleAdd } from './handlers/handle-add';
import { handleRpcRequest } from './utils/handle-rpc-request';
import { handleRootsList } from './handlers/handle-roots-list';
import path from 'path';

const app = express();
app.use(express.json());
app.use('/data', express.static(path.join(process.cwd(), 'data')));

RPC_SERVER.addMethod('ping', handlePing);
RPC_SERVER.addMethod('add', handleAdd);
RPC_SERVER.addMethod('roots/list', handleRootsList);

console.log('APP_CONFIG', APP_CONFIG);

app.post('/rpc', handleRpcRequest);

app.listen(APP_CONFIG.SERVER_PORT, () => {
    console.log(`running SERVER on ${APP_CONFIG.SERVER_URL}`);
});
