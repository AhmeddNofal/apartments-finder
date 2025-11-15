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


export interface ApartmentsResponse {
  data: Apartment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApartmentListProps {
  onNavigate: (id: number) => void;
}


export interface ApartmentCardProps {
    apartment: Apartment;
}


export interface ApartmentDetailsProps {
  apartment: Apartment | undefined;
}
