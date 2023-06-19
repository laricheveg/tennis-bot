function notFound(res, message) {
  res.status(404).json({
    success: false,
    message,
  });
}

function successWithData(res, message, data) {
  res.status(200).json({
    success: true,
    message,
    data,
  });
}

function successOnly(res, message) {
  res.status(200).json({
    success: true,
    message,
  });
}

function invalidData(res, message = 'Invalid data!') {
  res.status(400).json({
    success: false,
    message,
  });
}

function serverError(res, message = 'Something went wrong!') {
  res.status(500).json({
    status: false,
    message,
  });
}

module.exports = {
  notFound,
  successWithData,
  successOnly,
  invalidData,
  serverError,
};
