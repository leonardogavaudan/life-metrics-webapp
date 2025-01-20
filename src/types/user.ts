export interface ApiUser {
  id: string;
  email: string;
  google_id: string;
  name: string;
  picture_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ApiUserResponse {
  user: ApiUser;
}

export interface User {
  id: string;
  email: string;
  name: string;
  pictureUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  user: User;
}
