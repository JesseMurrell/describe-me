"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const serverless_http_1 = __importDefault(require("serverless-http"));
if (env_1.ENVIRONMENT === 'dev') {
    // Start Express server for local development
    app_1.default.listen(Number(env_1.PORT), () => {
        console.log(`Server running on http://localhost:${env_1.PORT}`);
    });
}
else {
}
// Export handler for AWS Lambda in production
exports.handler = (0, serverless_http_1.default)(app_1.default);
