import { app, BrowserWindow } from "electron";

import { startFontServer } from "./fontServer.ts";

void start();

async function start(): Promise<void> {
  await app.whenReady();

  startFontServer();

  createWindow();

  app.on("window-all-closed", () => {
    app.quit();
  });
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  void mainWindow.loadURL(`http://localhost:9009/index.html`);
}
