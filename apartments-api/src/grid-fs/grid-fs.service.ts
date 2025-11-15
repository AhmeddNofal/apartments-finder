import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';

@Injectable()
export class GridFsService {
    private bucket: mongoose.mongo.GridFSBucket;

    constructor(@InjectConnection() private readonly conn: Connection) {
        this.bucket = new mongoose.mongo.GridFSBucket(this.conn.db as any, {
            bucketName: 'uploads',
        });
    }

    getBucket() {
        return this.bucket;
    }
}
