import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApartmentDocument = HydratedDocument<Apartment>;

@Schema()
export class Apartment {

    @Prop({ required: true })
    unitName: string;

    @Prop({ required: true })
    unitNo: number;

    @Prop({ required: true, min: 0 })
    bedrooms: number;

    @Prop({ required: true, min: 0 })
    baths: number;

    @Prop({ required: true, min: 0 })
    unitArea: number; 

    @Prop({ required: true, min: 0 })
    price: number;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [String], default: [] })
    images: string[];

}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);

ApartmentSchema.index({ price: 1 });
ApartmentSchema.index({ bedrooms: 1 });
ApartmentSchema.index({
    price: 1,
    bedrooms: 1,
    baths: 1,
    unitArea: 1
});
