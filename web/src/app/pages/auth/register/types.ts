export interface RegesterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface RegesterResponse {
  success: boolean;
  data: {
    id: number;
    avatar_url: string | null;
    email: string;
    name: string;
    provider: string | null;
    uid: string | null;
  };
}
