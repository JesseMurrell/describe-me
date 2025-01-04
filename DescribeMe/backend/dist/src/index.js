"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const serverless_http_1 = __importDefault(require("serverless-http"));
let secretsLoaded = false;
// This is the actual “Lambda handler” function
function lambdaHandler(event, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // Only load secrets once per cold start
        if (!secretsLoaded) {
            yield (0, env_1.loadSecrets)();
            secretsLoaded = true;
        }
        // Then pass control to Serverless HTTP (which handles Express routing)
        return (0, serverless_http_1.default)(app_1.default)(event, context);
    });
}
// If in dev, run locally via Express
if (env_1.ENVIRONMENT === 'dev') {
    app_1.default.listen(Number(env_1.PORT), () => {
        console.log(`Server running on http://localhost:${env_1.PORT}`);
    });
}
else {
    // In prod, export the handler that includes secrets loading
    exports.handler = lambdaHandler;
}
