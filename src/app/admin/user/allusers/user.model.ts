import { formatDate } from "@angular/common";
export class User {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumberConfirmed: boolean;
  emailConfirmed: boolean;
  isActive: boolean;
  displayOrder:number;
  constructor(user) {
    {
      this.fullName = user.name;
      this.phoneNumber = user.phoneNumber;
      this.email = user.email;
      this.password = user.password;
      this.confirmPassword = user.confirmPassword;
      this.phoneNumberConfirmed = user.phoneNumberConfirmed || false;
      this.emailConfirmed = user.emailConfirmed || false;
      this.isActive = user.isActive || false;
      this.displayOrder = user.displayOrder||0;
    }
  }
}
export class UserDto {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumberConfirmed: boolean;
  emailConfirmed: boolean;
  isActive: boolean;
  displayOrder:number;
  constructor(user) {
    {
      this.id = user.id;
      this.fullName = user.name;
      this.phoneNumber = user.phoneNumber;
      this.email = user.email;
      this.password = user.password;
      this.confirmPassword = user.confirmPassword;
      this.phoneNumberConfirmed = user.phoneNumberConfirmed || false;
      this.emailConfirmed = user.emailConfirmed || false;
      this.isActive = user.isActive || false;
      this.displayOrder = user.displayOrder||0;
    }
  }
}


export class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
};
