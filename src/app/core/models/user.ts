// export class User {
//   id: number;
//   img: string;
//   username: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   role: Role;
//   token: string;
// }

export class User {
  userId: number;
  imageUrl: string;
  fullName: string;
  role: string;
  token: string;
}

export interface authenticationResponse {
  isActive: boolean;
  phoneNumberConfirmed: boolean;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  token: string;
  userId: string;
}
