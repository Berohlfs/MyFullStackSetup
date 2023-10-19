"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
// Libs
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Scripts
var responseMessage_1 = require("../scripts/responseMessage");
dotenv_1.default.config();
var authMiddleware = function (req, res, next) {
    var token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : false;
    // console.log(token)
    if (token === false) {
        return res.status(401).json((0, responseMessage_1.responseMessage)('Token não fornecido.'));
    }
    jsonwebtoken_1.default.verify(token, process.env['ACCESS_SECRET'], function (erro, decoded) {
        if (erro) {
            return res.status(401).json((0, responseMessage_1.responseMessage)('Token inválido.'));
        }
        if (typeof decoded === 'object') {
            if (decoded.remote_address != req.socket.remoteAddress || !decoded.usuario_id) {
                return res.status(401).json((0, responseMessage_1.responseMessage)('Token inválido.'));
            }
            req.body.usuario_id = decoded.usuario_id;
        }
        next();
    });
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map