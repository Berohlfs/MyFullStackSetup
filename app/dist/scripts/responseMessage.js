"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMessage = void 0;
var responseMessage = function (message, query) {
    if (query === void 0) { query = []; }
    return ({
        message: message,
        query: query
    });
};
exports.responseMessage = responseMessage;
//# sourceMappingURL=responseMessage.js.map