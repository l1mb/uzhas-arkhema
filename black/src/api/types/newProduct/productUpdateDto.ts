export interface updateProductDto {
  id?: number;
  name: string;
  description: string;
  price: number;
  vendorId: number;
  logo?:string;

  categoryId: number;
}
