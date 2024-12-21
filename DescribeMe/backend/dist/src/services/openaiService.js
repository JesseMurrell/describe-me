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
exports.generateCaption = generateCaption;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../config/env");
const openai = new openai_1.default({
    apiKey: env_1.OPENAI_API_KEY,
});
function generateCaption(dataUrl, generation, tone) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const response = yield openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: `Caption this photo like a ${generation} meme with a ${tone} tone.` },
                        { type: "image_url", image_url: { url: dataUrl } }
                    ],
                },
            ],
        });
        return (_d = (_c = (_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : 'No caption generated.';
    });
}
