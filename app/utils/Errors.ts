import HTTPStatusCode from "http-status-codes";

export class CustomConflictError extends Error {
  public status: number;

  constructor(message = "Item already created") {
    super(message);
    this.name = "Conflict error";
    this.message = message;
    this.status = HTTPStatusCode.CONFLICT;
  }
}

export class CustomBadRequestError extends Error {
  public status: number;

  constructor(message = "Error in parameters") {
    super(message);
    this.name = "BadRequest error";
    this.message = message;
    this.status = HTTPStatusCode.BAD_REQUEST;
  }
}

export class CustomUnauthorizedError extends Error {
  public status: number;

  constructor(message = "Unauthorized") {
    super(message);
    this.name = "Unauthorized error";
    this.message = message;
    this.status = HTTPStatusCode.UNAUTHORIZED;
  }
}

export class CustomNotFoundError extends Error {
  public status: number;

  constructor(message = "Not found") {
    super(message);
    this.name = "Not Found error";
    this.message = message;
    this.status = HTTPStatusCode.NOT_FOUND;
  }
}
