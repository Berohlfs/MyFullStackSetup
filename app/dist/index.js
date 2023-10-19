"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
// Routes
var routes_1 = __importDefault(require("./routes"));
var cors_config = {
    origin: process.env['ORIGIN'],
};
var App = /** @class */ (function () {
    function App() {
        this.server = (0, express_1.default)();
        this.middlewares();
    }
    App.prototype.middlewares = function () {
        this.server.use(express_1.default.json());
        this.server.use((0, cors_1.default)(cors_config));
        this.server.use(routes_1.default);
    };
    return App;
}());
var app = new App();
app.server.listen('5500', function () { return console.log('Server up on port 5500.'); });
//# sourceMappingURL=index.js.map