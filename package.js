var packager = require('electron-packager');
var options = {
  'arch': 'ia32',
  'platform': 'win32',
  'dir': './',
  'app-copyright': 'Nkokhelo Tembe',
  'app-version': '2.0.5',
  'asar': true,
  'icon': './favicon.ico',
  'name': 'FoskorTransportDesktop',
  'ignore': ['./releases', './.git'],
  'out': './releases',
  'overwrite': true,
  'prune': true,
  'version': '1.3.2',
  'version-string': {
    'CompanyName': 'Nkokhelo Tembe',
    'FileDescription': 'Foskor Transport', /*This is what display windows on task manager, shortcut and process*/
    'OriginalFilename': 'FoskorTransportDesktop',
    'ProductName': 'Foskor Transport',
    'InternalName': 'FoskorTransportDesktop'
  }
};
packager(options, function done_callback(err, appPaths) {
  console.log(err);
  console.log(appPaths);
});
