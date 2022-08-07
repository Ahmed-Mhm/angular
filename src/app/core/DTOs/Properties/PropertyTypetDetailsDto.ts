import { PropertyDetailsDto } from "./PropertyDetailsDto";


export class PropertyTypetDetailsDto
{
  Id: string;
  Name: string;
  DisplayOrder: number;
  ViewMode: string;
  Properties: Array<PropertyDetailsDto> = []
}
