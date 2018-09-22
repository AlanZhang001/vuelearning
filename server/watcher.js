const chokidar = require('chokidar');
const cp = require('child_process');
const watcher = chokidar.watch('./server');

let appIns = cp.fork('./server/index');

watcher.on('ready', () => {
    watcher.on('change', (path) => {
        console.log('<---- watched file change, server reload ---->');
        appIns = reload(appIns);
    });
    watcher.on('add', (path) => {
        console.log('<---- watched new file add, server reload ---->');
        appIns = reload(appIns);
    });
    watcher.on('unlink', (path) => {
        console.log('<---- watched file remove, server reload ---->');
        appIns = reload(appIns);
    });
});
process.on('SIGINT', () => {
    process.exit(0);
});
function reload(appIns) {
    appIns.kill('SIGINT');
    return cp.fork('./server/index');
}
