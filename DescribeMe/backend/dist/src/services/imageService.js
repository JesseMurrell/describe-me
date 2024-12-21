"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFileToDataUrl = convertFileToDataUrl;
const fs_1 = __importDefault(require("fs"));
function convertFileToDataUrl(filePath, mimeType) {
    const fileBuffer = fs_1.default.readFileSync(filePath);
    const base64Image = fileBuffer.toString('base64');
    return `data:${mimeType};base64,${base64Image}`;
}
