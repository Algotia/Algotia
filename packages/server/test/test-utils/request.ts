import supertest from "supertest";

const request = () => supertest(require("../../src/server").app);

export default request;
