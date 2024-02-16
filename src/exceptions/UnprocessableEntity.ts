import HTTPError from "./HTTPError"

class UnprocessableEntity extends HTTPError {
  public readonly statusCode = 422

  public readonly payload = {
    error: "unprocessable entity",
    statusCode: this.statusCode,
    message: this.message || "body or query is unprocessable",
  }
}

export default UnprocessableEntity
