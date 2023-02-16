// 引入electron并创建一个Browserwindow
const { app, BrowserWindow, } = require('electron');
const path = require('path');
const http = require("http");
const url = require('url');
const fs = require('fs');
const https = require('https')
const shell = require('electron').shell;
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;
let realfilePath;
let setfilesstatus;

function createWindow() {
    // 创建浏览器窗口,宽高自定义具体大小你开心就好
    mainWindow = new BrowserWindow({
       autoHideMenuBar:true, webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    });
    mainWindow.maximize()
    // 加载应用----适用于 react 项目
    const startUrl = url.format({
        pathname: path.join(__dirname, './dist/index.html'),
        protocol: 'file:',
        slashes: true,
    });
    mainWindow.loadURL(startUrl);

    mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
        // const filePath = path.join(app.getPath('downloads'),item.getFilename());
        // item.setSavePath(filePath)
        if (setfilesstatus === 'prew') {
            const filePath = path.join(app.getPath('temp'),item.getFilename());
            item.setSavePath(filePath)
            console.log(filePath)
        }
        item.on('updated', (event, state) => {
            if (state === 'interrupted') {
                console.log('Download is interrupted but can be resumed')
            } else if (state === 'progressing') {
                if (item.isPaused()) {
                    console.log('Download is paused')
                } else {
                    console.log(`Received bytes: ${item.getReceivedBytes()}`)
                }
            }
        })
        item.once('done', (event, state) => {
            if (state === 'completed') {
                console.log('Download successfully')
                realfilePath = item.getSavePath();
                if (setfilesstatus === 'prew') {
                    mainWindow.webContents.send('downstate', realfilePath)
                    shell.openItem(realfilePath)
                } else {
                    mainWindow.webContents.send('downstate', '下载成功')
                }
            } else {
                console.log(`Download failed: ${state}`)
                mainWindow.webContents.send('downstate', '下载失败')
            }
        })
    })

    // 打开开发者工具，默认不打开
    // mainWindow.webContents.openDevTools();

    // 关闭window时触发下列事件.
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow);

// 所有窗口关闭时退出应用.
app.on('window-all-closed', () => {
    // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    if (mainWindow === null) {
        createWindow();
    }
});
const { ipcMain } = require('electron');//监听web page里发出的message
const { Console } = require('console');

let downloadpath;//下载路径
ipcMain.on('download', (event, args) => {
    var arr = args.split("+");
    downloadpath = arr[0];
    mainWindow.webContents.downloadURL(downloadpath);
})
ipcMain.on('openfile',(event,args)=>{
    shell.openItem(args)
})
ipcMain.on('getPrinterList', (event) => {
    //主线程获取打印机列表
    const list = mainWindow.webContents.getPrinters();
    //通过webContents发送事件到渲染线程，同时将打印机列表也传过去
    console.log(list)
    mainWindow.webContents.send('getPrinterList', list);
  });
ipcMain.on('opendialog', (event, args) => {
    var match = args.match(/^(http?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    const options = {
        hostname: match[3],
        port: match[4],
        path: match[5],
        method: 'GET'
    }

    const req = http.request(options, res => {
        console.log(`状态码: ${res.statusCode}`)
        console.log(res)
        if (res.statusCode === 200) {
            setfilesstatus = 'download'
            var arr = args.split("+");
            downloadpath = arr[0];
            mainWindow.webContents.downloadURL(downloadpath);
        } else {
            mainWindow.webContents.send('downstate', '无此文件')
        }
    })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
})

ipcMain.on('prevWindow', (event, args) => {
    var match = args.match(/^(http?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    const options = {
        hostname: match[3],
        port: match[4],
        path: match[5],
        method: 'GET'
    }
    const req = http.request(options, res => {
        if (res.statusCode === 200) {
            setfilesstatus = 'prew'
            var arr = args.split("+");
            downloadpath = arr[0];
            mainWindow.webContents.downloadURL(downloadpath);
            // shell.openPath(realfilePath)
        } else {
            mainWindow.webContents.send('downstate', '无此文件')
        }
        // res.on('data', d => {
        //   process.stdout.write(d)
        // })
    })
    req.on('error', error => {
        console.error(error)
    })
    req.end()
})