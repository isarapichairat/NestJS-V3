export type LoginResponseType =
  | { accessToken: string }
  | { validate2FA: string; message: string };

export type Enable2FAType = {
  secret: string;
};

export type PayloadType = {
  email: string;
  userId: number;
  artistId?: number;
};