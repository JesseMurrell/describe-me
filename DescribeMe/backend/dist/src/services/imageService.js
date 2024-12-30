"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTempFilePath = getTempFilePath;
exports.convertFileToDataUrl = convertFileToDataUrl;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Define the temporary directory for uploads
const tempDirectory = '/tmp/uploads';
// Ensure the directory exists
try {
    if (!fs_1.default.existsSync(tempDirectory)) {
        console.log(`Directory ${tempDirectory} does not exist. Creating it now.`);
        fs_1.default.mkdirSync(tempDirectory, { recursive: true });
        console.log(`Directory ${tempDirectory} created successfully.`);
    }
    else {
        console.log(`Directory ${tempDirectory} already exists.`);
    }
}
catch (error) {
    console.error(`Error creating directory ${tempDirectory}:`, error);
}
// Get the full file path in the temporary directory
function getTempFilePath(fileName) {
    const filePath = path_1.default.join(tempDirectory, fileName);
    console.log(`Generated temp file path: ${filePath}`);
    return filePath;
}
// Convert a file to a Data URL
function convertFileToDataUrl(filePath, mimeType) {
    console.log(`Converting file at path: ${filePath} to data URL.`);
    try {
        const fileBuffer = fs_1.default.readFileSync(filePath);
        const base64Image = fileBuffer.toString('base64');
        console.log(`File at path: ${filePath} successfully converted to data URL.`);
        return `data:${mimeType};base64,${base64Image}`;
    }
    catch (error) {
        console.error(`Error converting file at path: ${filePath} to data URL:`, error);
        throw error; // Re-throw the error for further handling
    }
}
