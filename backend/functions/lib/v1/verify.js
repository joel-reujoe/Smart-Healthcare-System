const elasticsearch1 = require('elasticsearch');
const client2 = new elasticsearch1.Client({
    host: '127.0.0.1:9200',
    log: 'error'
});
function indices() {
    return client2.cat.indices({ v: true })
        .then(console.log)
        .catch(err => console.error(`Error connecting to the es client: ${err}`));
}
module.exports = function verify() {
    console.log(`elasticsearch indices information:`);
    indices();
};
//# sourceMappingURL=verify.js.map