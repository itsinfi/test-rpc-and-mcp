# test_rpc_and_mcp

## Run MCP HTTP Server

1. Install [Bun](https://bun.com/docs/installation)

2. Install dependencies:

```bash
bun install
```

3.  Clone `.\.env.example`.

4.  Start the server with:

```bash
bun run server.ts
```

MCP Server is now available at `http://localhost:3000/mcp`.

To check if the server is working, try any of the following endpoints:

- `http://localhost:3000/api/test`
- `http://localhost:3000/api/nws/alerts?state=CA`
- `http://localhost:3000/api/nws/forecast?latitude=61&longitude=-149`

Optionally, you can change the following parameters when executing:

- `-m`: mode (either `http` or `stdio`)
- `-h`: hostname (only http)
- `-p`: port (only http)
- `-t`: session timeout (only http)

## Run MCP Client via Cursor

1.  Install [Cursor](https://cursor.com/).
2.  If you use Windows, clone `mcp-stdio.example.json` or `mcp-http.example.json` into `C:\Users\YOUR_USERNAME\.cursor\` and rename it to `mcp.json` (you will need to create the folder and file if not done before).
3.  Change the value for `args` from `["C:\\PATH\\TO\\PARENT\\FOLDER\\server.ts"]` to the absolute path to `server.ts` on your system.
4.  Restart Cursor.

## Run MCP Client via Claude for Desktop

1.  Install [Claude for Desktop](https://claude.com/download)\*.
2.  If you use Windows, clone `mcp-stdio.example.json` into `C:\Users\YOUR_USERNAME\AppData\Roaming\Claude` and rename it to `mcp.json`\*\*.
3.  Change the value for `args` from `["C:\\PATH\\TO\\PARENT\\FOLDER\\server.ts"]` to the absolute path to `server.ts` on your system.
4.  Restart Cursor for Desktop (you need to go to `File` -> `Exit` inside Claude because simply closing the window will not fully quit Claude for Desktop)

\*It is officially recommended by [the official docs](https://modelcontextprotocol.io/docs/develop/build-server#testing-your-server-with-claude-for-desktop-2), but due to a limitation in the Windows x86 installer only being a sandboxed Microsoft Store version, I can not confirm if it works or not. But MacOS and Windows ARM installs seem to be normal desktop installs. The steps would be the same as for Cursor.

\*\* If you do not see the Claude folder here, your install is the sandboxed and incompatible Windows Store version.

## Run MCP Client via mistral.rs

I am not sure if mistral.rs can work after hours spent on trying to get it running. But there is an an example config file `mistralrs-config.example.json` and a Docker Compose script and a Dockerfile.

Install Docker Desktop and run:

```
docker-compose up server mistralrs-client
```
