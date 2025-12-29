import { Request, Response } from 'express';
import { generateUploadUrl } from '../config/s3.credentials';

export const generateUrl = async (req: Request, res: Response) => {
  const { fileName, fileType } = req.query;

  const { uploadUrl, key } = await generateUploadUrl(
    fileName as string,
    fileType as string
  );

  const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  res.json({ uploadUrl, fileUrl });
};
