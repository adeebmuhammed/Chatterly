"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUrl = void 0;
const s3_credentials_1 = require("../config/s3.credentials");
const generateUrl = async (req, res) => {
    const { fileName, fileType } = req.query;
    const { uploadUrl, key } = await (0, s3_credentials_1.generateUploadUrl)(fileName, fileType);
    const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    res.json({ uploadUrl, fileUrl });
};
exports.generateUrl = generateUrl;
//# sourceMappingURL=s3.operations.js.map