import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import {fromBuffer} from 'file-type';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: 'AKIATWILRUCWSBJWUBOQ',
      secretAccessKey: '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',
      region: 'us-east-1',
    });
  }

  async uploadImage(base64Data: string, bucketName: string, fileName: string) {
    const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
    const getFormat = async (buffer: Buffer) => {
      try {
        const type = await fromBuffer(buffer);
        return type.ext;

      } catch {
        throw new Error('Wrong data type! Should be a buffer!');
      }
    };


    const format = await getFormat(buffer);

    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: `${fileName}.${format}`,
      Body: buffer,
      ACL: 'public-read',
      ContentType: 'image/jpeg',
    };

    try {
      const data = await this.s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }
}