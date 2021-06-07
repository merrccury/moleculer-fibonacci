const nModule = require('bindings')('main');
const fibonacci = new nModule.NanFibonacci();


module.exports = {
    name: "fibonacci",
    actions: {
        get: {
            handler(ctx) {
                const result = fibonacci.get();
                return result[0] === '-' ? {
                    fibonacci: 'infinity'
                } : {
                    fibonacci: result
                };
            }
        }
    }
};
