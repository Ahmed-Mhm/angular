import { formatDate } from "@angular/common";
export class Role {
  name: string;
  name_AR: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  isSystemRole: boolean;
  constructor(role) {
    {
      this.name = role.name;
      this.name_AR = role.name_AR;
      this.description = role.description;
      this.displayOrder = role.displayOrder||0;
      this.isActive = role.isActive || false;
      this.isSystemRole = role.isSystemRole || false;
    }
  }
}
export class RoleDto {
  id: string;
  name: string;
  displayName: string;
  description: string;
  displayOrder:number;
  isActive: boolean;
  isSystemRole: boolean;
  constructor(role) {
    {
      this.id = role.id;
      this.name = role.name;
      this.displayName = role.displayName;
      this.description = role.description;
      this.displayOrder = role.displayOrder||0;
      this.isActive = role.isActive || false;
      this.isSystemRole = role.isSystemRole || false;
    }
  }
}

export class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
};
