// Module dependencies;
const debug = require('debug')('booking-app-backend:server');

// Normalize a port into a number, string, or false;
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val; // named pipe;
  if (port >= 0) return port; // port number;
  return false;
}

// Event listener for HTTP server "error" event;
const onError = error => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) { // Handle specific listen errors with friendly messages;
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event;
const onListening = server => () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// Export our helper functions in order to configure our HTTP server in bin/www;
module.exports = {
  normalizePort,
  onError,
  onListening
}
