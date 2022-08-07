import { ProductDto } from "./ProductDto";

export class ProductPackages {
  Id: string;
  Name: string;
  fName: string;
  display_In_Store: boolean;
  display_In_Pos: boolean;
  products: Array<ProductDto> = [];
}
