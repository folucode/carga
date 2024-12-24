export declare type Config = {
  port: number;
  database: {
    mongoUrl: string;
  };
  auth: {
    secret: string;
    expiresIn: number;
  };
};
