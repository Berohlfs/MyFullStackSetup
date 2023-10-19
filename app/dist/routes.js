"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
var express_1 = require("express");
// Controllers
var UsuariosController_1 = __importDefault(require("./controllers/UsuariosController"));
// Middlewares
var auth_1 = require("./middlewares/auth");
// Scripts
var responseMessage_1 = require("./scripts/responseMessage");
var routes = (0, express_1.Router)();
// Public routes
routes.post('/login', UsuariosController_1.default.login);
routes.post('/cadastro', UsuariosController_1.default.create);
routes.use(auth_1.authMiddleware);
// Authenticated routes
routes.get('/token', function (req, res) { return res.json(req.body.usuario_id); });
// Fallback
routes.use(function (req, res) { return res.status(404).json((0, responseMessage_1.responseMessage)('Resource Not Found')); });
exports.default = routes;
//# sourceMappingURL=routes.js.map