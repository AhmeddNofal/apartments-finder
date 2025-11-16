import { ApartmentDocument } from "../schemas/apartment.schema";

export type ApartmentsPaginatedResult = {
    data: ApartmentDocument[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};
