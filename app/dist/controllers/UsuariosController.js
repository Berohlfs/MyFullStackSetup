"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
var bcrypt_1 = __importDefault(require("bcrypt"));
var yup = __importStar(require("yup"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Scripts
var responseMessage_1 = require("../scripts/responseMessage");
// Prisma
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var UsuariosController = /** @class */ (function () {
    function UsuariosController() {
    }
    UsuariosController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var validation, valid, _a, email, senha, hash, usuario, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        validation = yup.object({
                            senha: yup.string().required(),
                            confirmacaoSenha: yup.string().oneOf([yup.ref('senha')]).required(),
                            email: yup.string().required().email(),
                        });
                        return [4 /*yield*/, validation.isValid(req.body)];
                    case 1:
                        valid = _b.sent();
                        if (!valid) {
                            return [2 /*return*/, res.status(400).json((0, responseMessage_1.responseMessage)('Dados inválidos.'))];
                        }
                        _a = req.body, email = _a.email, senha = _a.senha;
                        return [4 /*yield*/, bcrypt_1.default.hash(senha, 13)];
                    case 2:
                        hash = _b.sent();
                        usuario = prisma.usuario.create({ data: { email: email, senha: hash } });
                        return [2 /*return*/, res.status(201).json((0, responseMessage_1.responseMessage)('Usuário criado.', usuario))];
                    case 3:
                        error_1 = _b.sent();
                        console.error(error_1);
                        if (error_1 instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                            if (error_1.code === 'P2002') {
                                return [2 /*return*/, res.status(409).json((0, responseMessage_1.responseMessage)('Esse e-mail já é cadastrado.'))];
                            }
                        }
                        return [2 /*return*/, res.status(500).json((0, responseMessage_1.responseMessage)('Erro interno de servidor.'))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsuariosController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var validation, valid, _a, senha, email, usuario, match, token, erro_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        validation = yup.object({
                            senha: yup.string().required(),
                            email: yup.string().required(),
                        });
                        return [4 /*yield*/, validation.isValid(req.body)];
                    case 1:
                        valid = _b.sent();
                        if (!valid) {
                            return [2 /*return*/, res.status(400).json((0, responseMessage_1.responseMessage)('Dados inválidos.'))];
                        }
                        _a = req.body, senha = _a.senha, email = _a.email;
                        return [4 /*yield*/, prisma.usuario.findUnique({
                                where: {
                                    email: email
                                }
                            })];
                    case 2:
                        usuario = _b.sent();
                        if (!usuario) {
                            return [2 /*return*/, res.status(404).json((0, responseMessage_1.responseMessage)('Usuário inexistente.'))];
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(senha, usuario.senha)];
                    case 3:
                        match = _b.sent();
                        if (match) {
                            token = jsonwebtoken_1.default.sign({ usuario_id: usuario.id, remote_address: req.socket.remoteAddress }, process.env['ACCESS_SECRET'], { expiresIn: '1d' });
                            return [2 /*return*/, res.status(201).json((0, responseMessage_1.responseMessage)('Login realizado com sucesso.', { token: token }))];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json((0, responseMessage_1.responseMessage)('Credenciais inválidas.'))];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        erro_1 = _b.sent();
                        console.error(erro_1);
                        return [2 /*return*/, res.status(500).json((0, responseMessage_1.responseMessage)('Erro interno de servidor.'))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UsuariosController;
}());
exports.default = new UsuariosController();
//# sourceMappingURL=UsuariosController.js.map