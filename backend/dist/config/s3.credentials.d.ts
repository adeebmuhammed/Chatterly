import { S3Client } from "@aws-sdk/client-s3";
declare const s3Client: S3Client;
export declare const generateUploadUrl: (fileName: string, fileType: string) => Promise<{
    uploadUrl: string;
    key: string;
}>;
export default s3Client;
//# sourceMappingURL=s3.credentials.d.ts.map