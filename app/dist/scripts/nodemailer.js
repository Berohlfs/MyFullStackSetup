"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailer = void 0;
// Libs
var nodemailer_1 = __importDefault(require("nodemailer"));
var Mailer = /** @class */ (function () {
    function Mailer() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env["EMAIL_HOST"],
            port: Number(process.env["EMAIL_PORT"]),
            secure: Boolean(process.env["EMAIL_SECURE"]),
            auth: {
                user: process.env["EMAIL_USER"],
                pass: process.env["EMAIL_PASSWORD"],
            },
            debug: true
        });
    }
    Mailer.prototype.send = function (_a) {
        var to = _a.to, subject = _a.subject, text = _a.text, html = _a.html;
        return this.transporter.sendMail({
            from: process.env["EMAIL_USER"],
            to: to,
            subject: subject,
            text: text,
            html: html
        });
    };
    return Mailer;
}());
exports.mailer = new Mailer();
//# sourceMappingURL=nodemailer.js.map