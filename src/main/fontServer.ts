import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { app } from "electron";

export function startFontServer(): void {
  const PORT = 24_006;

  const server = createServer(async (request, response) => {
    const url = new URL(request.url!, `http://${request.headers.host}`);
    const filePath = url.searchParams.get("path");

    response.setHeader("Access-Control-Allow-Origin", "*");

    if (filePath === null) {
      response.writeHead(400);
      response.end("File path missing from query string");
      return;
    }

    const contents = await readFile(filePath);
    response.writeHead(200);
    response.end(contents);
  });

  server.listen(PORT, () => {
    console.log(`Fonts server listening on port ${PORT}`);
  });

  app.once("will-quit", (event) => {
    event?.preventDefault();
    server.close();
    app.exit();
  });
}
