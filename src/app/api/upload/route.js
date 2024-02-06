import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import uniqid from 'uniqid'

export async function POST(req) {

  const data = await req.formData();

  if (data.get('file')) {
    const file = data.get('file')

    const s3Client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: 'AKIA6ODU662TWKXJ7HXN',
        secretAccessKey: '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'
      }
    })

    const ext = file.name.split('.').slice(-1)[0];
    const newFileName = uniqid() + '.' + ext;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const bucket = 'projectcaroline-food-ordering';
    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: newFileName,
      ACL: 'public-read',
      ContentType: file.type,
      Body: buffer,
    }));

    return Response.json('https://projectcaroline-food-ordering.s3.amazonaws.com/' + newFileName)
  }
  return Response.json(true);
}