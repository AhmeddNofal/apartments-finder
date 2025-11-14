import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GridFsService } from '../grid-fs/grid-fs.service';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Apartment, ApartmentDocument } from './schemas/apartment.schema';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Injectable()
export class ApartmentsService {
    private bucket: GridFSBucket;

    constructor(
        private readonly gridfs: GridFsService,
        @InjectModel(Apartment.name) private apartmentModel: Model<ApartmentDocument>
    ) {
        this.bucket = this.gridfs.getBucket();
    }

    async uploadFile(file: Express.Multer.File) : Promise<{ fileId: ObjectId }> {
        if (!file) throw new BadRequestException('No file uploaded');

        const uploadStream = this.bucket.openUploadStream(file.originalname);

        uploadStream.end(file.buffer);

        return new Promise((resolve, reject) => {
            uploadStream.on('finish', () => {
                resolve({ fileId: uploadStream.id });
            });

            uploadStream.on('error', (err) => {
                reject(new InternalServerErrorException(err));
            });
        });
    }

    downloadFile(fileId: string, res: Response) {
        let stream;
        try {
            stream = this.bucket.openDownloadStream(new ObjectId(fileId));
        } catch (err) {
            throw new NotFoundException('File not found');
        }

        stream.on('error', () => {
            throw new NotFoundException('File not found');
        });

        // Pipe directly to response
        stream.pipe(res);
    }

    // CRUD Methods
    async create(createApartmentDto: CreateApartmentDto, file?: Express.Multer.File): Promise<ApartmentDocument> {
        const apartmentData = { ...createApartmentDto };

        // If file is provided, upload it and add fileId to images array
        if (file) {
            const { fileId } : { fileId: ObjectId } = await this.uploadFile(file);
            apartmentData.images = [fileId.toString()];
        }

        const apartment = new this.apartmentModel(apartmentData);
        return apartment.save();
    }

    async findAll(): Promise<ApartmentDocument[]> {
        return this.apartmentModel.find().exec();
    }

    async findOne(id: string): Promise<ApartmentDocument> {
        const apartment = await this.apartmentModel.findById(id).exec();
        if (!apartment) {
            throw new NotFoundException(`Apartment with ID ${id} not found`);
        }
        return apartment;
    }

    async update(id: string, updateApartmentDto: UpdateApartmentDto, file?: Express.Multer.File): Promise<ApartmentDocument> {
        const updateData = { ...updateApartmentDto };

        // If file is provided, upload it and add fileId to images array
        if (file) {
            const { fileId } = await this.uploadFile(file);
            updateData.images = updateData.images ? [...updateData.images, fileId.toString()] : [fileId.toString()];
        }

        const apartment = await this.apartmentModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).exec();
        if (!apartment) {
            throw new NotFoundException(`Apartment with ID ${id} not found`);
        }
        return apartment;
    }

    async remove(id: string): Promise<{ message: string }> {
        const apartment = await this.apartmentModel.findByIdAndDelete(id).exec();
        if (!apartment) {
            throw new NotFoundException(`Apartment with ID ${id} not found`);
        }
        return { message: `Apartment with ID ${id} deleted successfully` };
    }
}
