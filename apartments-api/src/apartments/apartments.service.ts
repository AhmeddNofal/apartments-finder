import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Types } from 'mongoose';
import { GridFsService } from '../grid-fs/grid-fs.service';
import { Apartment, ApartmentDocument } from './schemas/apartment.schema';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { QueryApartmentDto } from './dto/query-apartment.dto';

@Injectable()
export class ApartmentsService {
    private bucket: mongoose.mongo.GridFSBucket;
    ;

    constructor(
        private readonly gridfs: GridFsService,
        @InjectModel(Apartment.name) private apartmentModel: Model<ApartmentDocument>
    ) {
        this.bucket = this.gridfs.getBucket();
    }

    async uploadFile(file: Express.Multer.File): Promise<{ fileId: Types.ObjectId }> {
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

    async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
        if (!files || files.length === 0) return [];

        const ids: string[] = [];

        for (const file of files) {
            const { fileId } = await this.uploadFile(file);
            ids.push(fileId.toString());
        }

        return ids;
    }


    downloadFile(fileId: string, res: Response) {
        let stream;
        try {
            stream = this.bucket.openDownloadStream(new Types.ObjectId(fileId));
        } catch (err) {
            throw new NotFoundException('File not found');
        }

        stream.on('error', () => {
            throw new NotFoundException('File not found');
        });

        // Pipe directly to response
        stream.pipe(res);
    }


    async create(createApartmentDto: CreateApartmentDto, files?: Express.Multer.File[]): Promise<ApartmentDocument> {
        const apartmentData = { ...createApartmentDto };
        try {

            if (files && files.length > 0) {
                const uploadedImageIds = await this.uploadFiles(files);
                apartmentData.images = uploadedImageIds;
            }

            const apartment = new this.apartmentModel(apartmentData);
            return apartment.save();
        }
        catch (error) {
            throw new InternalServerErrorException('Error creating apartment: ' + error.message);
        }

    }

    async findAll(query: QueryApartmentDto): Promise<{ data: ApartmentDocument[]; total: number; page: number; limit: number; totalPages: number }> {
        const { page = 1, limit = 10, search, minPrice, maxPrice, bedrooms, baths, minArea, maxArea, unitNo } = query;

        // Build filter object
        const filter: any = {};

        // Search filter for unitName and address (case-insensitive)
        if (search) {
            filter.$or = [
                { unitName: { $regex: search, $options: 'i' } },
                { address: { $regex: search, $options: 'i' } }
            ];
        }

        // Price range filter
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};
            if (minPrice !== undefined) filter.price.$gte = minPrice;
            if (maxPrice !== undefined) filter.price.$lte = maxPrice;
        }

        // Bedrooms filter
        if (bedrooms !== undefined) {
            filter.bedrooms = bedrooms;
        }

        // Bathrooms filter
        if (baths !== undefined) {
            filter.baths = baths;
        }

        // Unit area range filter
        if (minArea !== undefined || maxArea !== undefined) {
            filter.unitArea = {};
            if (minArea !== undefined) filter.unitArea.$gte = minArea;
            if (maxArea !== undefined) filter.unitArea.$lte = maxArea;
        }

        // Unit number filter
        if (unitNo !== undefined) {
            filter.unitNo = unitNo;
        }

        // Count total documents matching filter
        const total = await this.apartmentModel.countDocuments(filter).exec();

        // Calculate skip for pagination
        const skip = (page - 1) * limit;

        // Execute query with pagination
        const data = await this.apartmentModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .exec();

        const totalPages = Math.ceil(total / limit);

        return { data, total, page, limit, totalPages };
    }

    async findOne(id: string): Promise<ApartmentDocument> {
        const apartment = await this.apartmentModel.findById(id).exec();
        if (!apartment) {
            throw new NotFoundException(`Apartment with ID ${id} not found`);
        }
        return apartment;
    }

    async update(id: string, updateApartmentDto: UpdateApartmentDto, files?: Express.Multer.File[]): Promise<ApartmentDocument> {
        const updateData = { ...updateApartmentDto };

        // If file is provided, upload it and add fileId to images array
        if (files && files.length > 0) {
            const uploaded = await this.uploadFiles(files);
            updateData.images = updateData.images
                ? [...updateData.images, ...uploaded]
                : uploaded;
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
