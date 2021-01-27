const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");

const app = express();

const server = http.createServer(app);

app.use("/", swaggerUi.serve, async (_req, res) => {
    return res.send(swaggerUi.generateHTML(require("../spec/swagger.json")));
});

server.listen(8080, () => {
	console.log("Serving swagger UI on port 8080")
})
