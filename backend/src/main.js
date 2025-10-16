const ExpressServer = require("./modules/server");

function main() {
  const server = new ExpressServer();

  server.start();
}

main();
