const Status = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNSUPPORTED_ACTION: 405,
  VALIDATION_FAILED: 422,
  SERVER_ERROR: 500,
};

function statusMessage(status) {
  switch (status) {
    case Status.BAD_REQUEST:
      return 'Bad Request';
    case Status.UNAUTHORIZED:
      return 'Unauthorized';
    case Status.FORBIDDEN:
      return 'Forbidden';
    case Status.NOT_FOUND:
      return 'Not Found';
    case Status.UNSUPPORTED_ACTION:
      return 'Unsupported Action';
    case Status.VALIDATION_FAILED:
      return 'Validation Failed';
    case Status.SERVER_ERROR:
      return 'Internal Server Error';
  }
}

exports.successResponse = function (res, msg = '') {
  var data = {
    status: Status.OK,
    message: msg || '',
  };
  return res.status(Status.OK).json(data);
};

exports.successResponseWithData = function (res, msg = '', data) {
  var resData = {
    status: Status.OK,
    message: msg || '',
    data: data,
  };
  return res.status(Status.OK).json(resData);
};

exports.serverErrorResponse = function (res, msg = '') {
  var data = {
    status: Status.SERVER_ERROR,
    message: msg || statusMessage(Status.SERVER_ERROR),
  };
  return res.status(Status.SERVER_ERROR).json(data);
};

exports.notFoundResponse = function (res, msg = '') {
  var data = {
    status: Status.NOT_FOUND,
    message: msg || statusMessage(Status.NOT_FOUND),
  };
  return res.status(Status.NOT_FOUND).json(data);
};

exports.validationErrorWithData = function (res, msg = '', errorsData) {
  var resData = {
    status: Status.VALIDATION_FAILED,
    message: msg || statusMessage(Status.VALIDATION_FAILED),
    errors: errorsData,
  };
  return res.status(Status.VALIDATION_FAILED).json(resData);
};

exports.unauthorizedResponse = function (res, msg = '') {
  var data = {
    status: Status.UNAUTHORIZED,
    message: msg || statusMessage(Status.UNAUTHORIZED),
  };
  return res.status(Status.UNAUTHORIZED).json(data);
};
