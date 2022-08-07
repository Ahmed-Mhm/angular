import { formatDate } from "@angular/common";

export class Productdepartment {
  imageUrl: string;
  name: string;
  fName: string;
  image: Image[];
  displayOrder: number;
  isActive: boolean;
  constructor(productdepartment) {
    {
      this.imageUrl = productdepartment.imageUrl;
      this.name = productdepartment.name;
      this.fName = productdepartment.fName;
      this.image = productdepartment.image;
      this.displayOrder = productdepartment.displayOrder||0;
      this.isActive = productdepartment.isActive || false;
    }
  }
}

export class Image {
  name: string;
  extension: string;
  data: string;
}

export class ProductdepartmentDto {
  id: string;
  imageUrl: string;
  name: string;
  fName: string;
  image: Image[];
  displayOrder: number;
  isActive: boolean;
  constructor(productdepartment) {
    {
      this.id = productdepartment.id;
      this.imageUrl = productdepartment.imageUrl;
      this.name = productdepartment.name;
      this.fName = productdepartment.fName;
      this.image = productdepartment.image;
      this.displayOrder = productdepartment.displayOrder||0;
      this.isActive = productdepartment.isActive;
    }
  }
}

export class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
};
