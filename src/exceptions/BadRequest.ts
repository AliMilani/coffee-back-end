import HTTPError from "./HTTPError";

class BadRequest extends HTTPError {
  public readonly statusCode = 400;

  public readonly payload = {
    error: "bad_request",
    statusCode: this.statusCode,
    message: this.message || "invalid input",
  };
}

export default BadRequest;
