const {ServiceBroker} = require("moleculer");
const serverBroker = new ServiceBroker({
    logger: console,
    transporter: null
});

serverBroker.loadService(__dirname + "/services/server.service.js");
serverBroker.start()
    .then(() => {
        serverBroker.logger.info("serverBroker - ready");
        serverBroker.call("server.getServer").then(app => {
            app.listen(3000, () => console.log(`http://localhost:${3000}/`));
        });
    })