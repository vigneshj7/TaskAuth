const { PORT, HOST } = require('./src/config');
const app = require('./src/app');

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
