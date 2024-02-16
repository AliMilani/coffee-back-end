import HTTPError from "./HTTPError"

class NotFound extends HTTPError {
  public readonly statusCode = 404

  public readonly payload = {
    error: "not_found",
    statusCode: this.statusCode,
    message: this.message || "not found",
  }
}

export default NotFound
