import { Request, Response, NextFunction } from "express";
interface Error {
  message: string;
  name: string;
  status?: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const errorMiddleware = () => (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const status = err.status || 500;

  if (status >= 500) {
    res
      .status(status)
      .json({ error: "InternalError", error_description: "Internal Error" });
  }
  res
    .status(status)
    .json({ error: Error.name, error_description: err.message });

  next(err);
};

export default errorMiddleware;
