export interface Apartment {
  id: number;
  title: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  location: string;
  image: string;
  description: string;
}


export interface ApartmentListProps {
  onNavigate: (id: number) => void;
}


export interface ApartmentCardProps {
    apartment: Apartment;
    // onNavigate: (id: number) => void;
}


export interface ApartmentDetailsProps {
  // Apartment is optional because the details page might be shown before data is loaded
  apartment: Apartment | undefined;
//   onNavigate: (target: ViewType) => void;
}
