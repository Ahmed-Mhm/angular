import { formatDate } from "@angular/common";

export class ProductCategory {
  imageUrl: string;
  name: string;
  fName: string;
  image: Image[];
  displayOrder: number;
  isActive: boolean;
  constructor(productCategory) {
    {
      this.imageUrl = productCategory.imageUrl;
      this.name = productCategory.name;
      this.fName = productCategory.fName;
      this.image = productCategory.image;
      this.displayOrder = productCategory.displayOrder||0;
      this.isActive = productCategory.isActive || false;
    }
  }
}

export class Image {
  name: string;
  extension: string;
  data: string;
}

export class ProductCategoryDto {
  id: string;
  imageUrl: string;
  name: string;
  fName: string;
  image: Image[];
  displayOrder: number;
  isActive: boolean;
  constructor(productCategory) {
    {
      this.id = productCategory.id;
      this.imageUrl = productCategory.imageUrl;
      this.name = productCategory.name;
      this.fName = productCategory.fName;
      this.image = productCategory.image;
      this.displayOrder = productCategory.displayOrder||0;
      this.isActive = productCategory.isActive;
    }
  }
}

export class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
};
