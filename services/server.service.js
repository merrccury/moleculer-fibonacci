const express = require('express');
const path = require('path');
const { ServiceBroker } = require("moleculer");

const fibonacciBroker = new ServiceBroker({
    logger: console,
    transporter: null
});
fibonacciBroker.loadService(__dirname + "/fibonacci.service.js");
fibonacciBroker.start()
    .then(() => {
        fibonacciBroker.logger.info("fibonacciBroker - ready");
    })

module.exports = {
    name: "server",
    actions: {
        getServer: {
            handler(ctx) {

                const app = express();

                app.get('/', (req, res) => {
                    res.sendFile(path.join(__dirname, '../index.html'));
                });

                app.get('/fibonacci', (req, res) => {
                    fibonacciBroker.call("fibonacci.get").then(result => {
                        res.send({fibonacci: result.fibonacci })
                    });
                });

                return app;
            }
        }
    }
};

