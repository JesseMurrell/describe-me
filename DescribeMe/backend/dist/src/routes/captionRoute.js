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
const fs_1 = __importDefault(require("fs"));
const express_1 = require("express");
const openaiService_1 = require("../services/openaiService");
const imageService_1 = require("../services/imageService");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const tempDirectory = '/tmp/uploads';
const upload = (0, multer_1.default)({ dest: tempDirectory });
router.post('/', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received request with body:', req.body);
    console.log('Received file:', req.file);
    const { generation, tone } = req.body;
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded." });
        return;
    }
    const filePath = req.file.path;
    try {
        console.log('Converting file to Data URL...');
        const dataUrl = (0, imageService_1.convertFileToDataUrl)(filePath, req.file.mimetype);
        console.log('File converted successfully.');
        console.log('Generating caption...');
        const caption = yield (0, openaiService_1.generateCaption)(dataUrl, generation, tone);
        console.log('Caption generated:', caption);
        res.json({ caption });
    }
    catch (error) {
        console.error('Error generating caption:', error);
        res.status(500).json({ error: 'Failed to generate caption.' });
    }
    finally {
        console.log('Cleaning up uploaded file...');
        fs_1.default.unlink(filePath, (err) => {
            if (err)
                console.error('Error deleting uploaded file:', err);
            else
                console.log('Uploaded file deleted successfully.');
        });
    }
}));
exports.default = router;
