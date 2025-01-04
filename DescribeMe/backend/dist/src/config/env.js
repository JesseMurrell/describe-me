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
exports.PORT = exports.ENVIRONMENT = void 0;
exports.loadSecrets = loadSecrets;
exports.getOpenAIKey = getOpenAIKey;
// env.ts
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
dotenv_1.default.config();
exports.ENVIRONMENT = process.env.ENVIRONMENT || 'prod';
exports.PORT = process.env.PORT || '5001';
console.log(exports.ENVIRONMENT);
let OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
function loadSecrets() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Loading secrets from secrets manager");
        if (exports.ENVIRONMENT !== 'dev') {
            console.log(`Environment = ${exports.ENVIRONMENT}, fetching key from Secrets Manager`);
            const secretsManager = new aws_sdk_1.default.SecretsManager();
            try {
                console.log("Making secrets manager request");
                const secret = yield secretsManager
                    .getSecretValue({ SecretId: 'DescribeMe/prod' })
                    .promise();
                if ('SecretString' in secret) {
                    const secretValue = JSON.parse(secret.SecretString || '{}');
                    OPENAI_API_KEY = secretValue["DescribeMe/prod"] || '';
                }
                console.log(`OpenAI key acquired: ${OPENAI_API_KEY.slice(-4)}`);
            }
            catch (err) {
                console.error("Error fetching secret from AWS Secrets Manager:", err);
            }
        }
    });
}
function getOpenAIKey() {
    return OPENAI_API_KEY;
}
