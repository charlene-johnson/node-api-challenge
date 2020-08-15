const express = require("express");
const actionRouter = require("./actions/actionRouter")
const projectRouter = require("./projects/projectRouter")

const server = express();
const port = process.env.PORT || 8080;

server.use(express.json());
server.use('/api/actions',actionRouter)
server.use('/api/projects', projectRouter)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


module.exports = server