import { OperatingTimeViewDto } from "../OperatingTime/OperatingTimeViewDto";
import { PropertyTypetDetailsDto } from "../Properties/PropertyTypetDetailsDto";

export class ProductDetailsDto {
  id: string;
  name: string;
  description: string;
  rating: number;
  categoryId: string;
  categoryName: string;
  unitOfMeasureId: string;
  unitOfMeasureName: string;
  StatusId: string;
  StatusName: string;
  ImagesUrls: Array<string> = [];
  Price: number;
  OperatingTimes: Array<OperatingTimeViewDto> = [];
  PropertyTypes: Array<PropertyTypetDetailsDto> = [];
}
