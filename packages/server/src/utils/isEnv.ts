const isDev = process.env["NODE_ENV"] === "development";
const isTest = process.env["NODE_ENV"] === "test";
const isProd = process.env["NODE_ENV"] === "production";

export { isDev, isTest, isProd };
