function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  const { message, stack } = error;
  const status = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(status).json({
    message,
    status,
    stack: process.env.NODE_ENV === 'production' ? null : stack
  });
}

module.exports = {
  errorHandler,
  notFound
};
