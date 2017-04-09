/**
 * electron 启动app
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let todoVue = {
    //保存 window实例，否则在js自动回收垃圾时，窗口将会关闭
    win: null,

    // 窗口大小
    size: {
        width: 630,
        height: 800,
        titleBarStyle: 'hidden-inset'
    },

    // 站点的入口地址
    siteIndex: 'sites/index.html',

    // 开发配置
    devConfig: {
        // 是否开启调试工具
        openDevTools: false
    },

    /**
     * 创建窗口对象
     */
    createWindow(){
        // 创建窗口
        win = new BrowserWindow(this.size);

        // 隐藏工具栏
        win.setMenuBarVisibility(false);

        // 加载app 首页
        win.loadURL(url.format({
            pathname: path.join(__dirname, this.siteIndex),
            protocol: 'file:',
            slashes: true
        }));

        // 开启调试工具
        this.devConfig.openDevTools && win.webContents.openDevTools();


    },

    /**
     * 窗口的事件监听
     */
    bindEvent() {
        // electron 初始化完成时创建窗口
        app.on('ready',()=>{
            this.createWindow();
        });

        // 窗口关闭，如果是window系统，关闭窗口则直接关闭，
        // 如果为mac，则需要手动退出
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        // 窗口激活
        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (win === null) {
                createWindow();
            }
        });

    },

    start(){
        this.bindEvent();
    }
};

todoVue.start();
