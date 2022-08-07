import { PromotionDto } from './../Promotions/PromotionDto';
import { ProductDto } from "../Products/ProductDto"

export class HomeDto {
Products: Array<ProductDto> = [];
Promotions: Array<PromotionDto> = [];
}
