const swaggerJsdoc = require("swagger-jsdoc");
const pkgJson = require("./package.json");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "@algotia/server",
            version: pkgJson.version,
        },
    },
    apis: ["./src/routes*.js"],
};

const swaggerSpecification = swaggerJsdoc(options);

module.exports = swaggerSpecification;
