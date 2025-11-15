export interface Apartment {
    _id: string;
    unitName: string;
    unitNo: number;
    bedrooms: number;
    baths: number;
    unitArea: number;
    price: number;
    address: string;
    description: string;
    images?: string[];
    location?: string;
}
