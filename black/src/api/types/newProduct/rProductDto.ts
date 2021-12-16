export interface readProductDto {
  id?: number;
  name: string;
  description: string;
  logo: string;
  price: number;
  shape: string;
  pickups: {
    id: number;
    label: string;
  };
  manufacturer: {
    id: number;
    label: string;
  };
}
