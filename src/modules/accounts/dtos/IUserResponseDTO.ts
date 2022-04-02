export interface IUserResponseDTO {
  email: string;
  avatar: string;
  id: string;
  name: string;
  driver_license: string;
  created_at: Date;
  avatarUrl(): string;
}
