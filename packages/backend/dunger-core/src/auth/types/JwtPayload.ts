export type JwtPayload = {
  sub: string;
  preferred_username: string;
  realm_access?: {
    roles: string[];
  };
};
