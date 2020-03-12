// code away!
const server = require('./server');

const PORT =4000;
server.listen(PORT, () => console.log(`\n** Server Running on http://localhost:${PORT}**\n`));