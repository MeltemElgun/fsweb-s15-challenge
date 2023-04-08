const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const mw = require("./middleware/restricted.js");

const authRouter = require("./auth/auth-router.js");
const bilmecelerRouter = require("./bilmeceler/bilmeceler-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/bilmeceler", mw.restricted, bilmecelerRouter); // sadece giriş yapan kullanıcılar erişebilir!

module.exports = server;
