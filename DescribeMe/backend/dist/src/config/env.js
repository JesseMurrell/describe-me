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
exports.OPENAI_API_KEY = exports.PORT = exports.ENVIRONMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
dotenv_1.default.config();
let OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
exports.OPENAI_API_KEY = OPENAI_API_KEY;
if (process.env.ENVIRONMENT === 'prod') {
    const secretsManager = new aws_sdk_1.default.SecretsManager();
    const getSecret = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const secret = yield secretsManager
                .getSecretValue({ SecretId: 'DescribeMe/prod' })
                .promise();
            if ('SecretString' in secret) {
                const secretValue = JSON.parse(secret.SecretString || '{}');
                exports.OPENAI_API_KEY = OPENAI_API_KEY = secretValue.OPENAI_API_KEY || OPENAI_API_KEY;
            }
        }
        catch (err) {
            console.error('Error fetching secret from AWS Secrets Manager:', err);
        }
    });
    // Fetch the secret asynchronously (can be awaited if needed)
    getSecret();
}
exports.ENVIRONMENT = process.env.ENVIRONMENT || 'dev';
exports.PORT = process.env.PORT || '5001';
