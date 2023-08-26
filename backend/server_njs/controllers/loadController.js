const s3 = require('@aws-sdk/client-s3');
require('dotenv').config();

const client = new s3.S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

class loadController {
    constructor() { }

    async uploadImage(image) {
        try {
            const res = await fetch(image);
            const blob = await res.arrayBuffer();
            const random = Math.floor(Math.random() * 10000);
            const filename = "file" + random;
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `Fotos/${filename}`,
                Body: blob,
                ContentType: "image",
                ContentEncoding: "base64"
            }
            const command = new s3.PutObjectCommand(uploadParams);
            const result = await client.send(command);
            const urlFile = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/Fotos/${filename}`;
            console.log('Information: Image uploaded');
            return (urlFile);
        } catch (err) {
            return null;
        }
    }
}

module.exports = new loadController();