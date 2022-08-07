
export class ProductDto {
  id: string;
  name: string;
  description: string;
  rating: number;
  departmentId: string;
  departmentName: string;
  categoryId: string;
  categoryName: string;
  unitOfMeasureId: string;
  unitOfMeasureName: string;
  statusId: string;
  statusName: string;
  price: number;
  markAsNew: boolean;
  bestSeller: boolean;
  is_Available: boolean;
  has_Promotion: boolean;
  isActive: boolean;
  displayOrder: number;
  imageUrl: string;
}
