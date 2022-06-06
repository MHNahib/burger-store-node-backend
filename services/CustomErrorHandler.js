class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static alreadyExists(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message) {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message) {
    return new CustomErrorHandler(404, message);
  }
}

module.exports = CustomErrorHandler;
