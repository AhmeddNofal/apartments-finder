import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { GridFSBucket } from 'mongodb';
import { Connection } from 'mongoose';

@Injectable()
export class GridFsService {
    private bucket: GridFSBucket;

    constructor(@InjectConnection() private conn: Connection) {
        this.bucket = new GridFSBucket(this.conn.db as any, {
            bucketName: 'uploads',
        });
    }

    getBucket() {
        return this.bucket;
    }
}
