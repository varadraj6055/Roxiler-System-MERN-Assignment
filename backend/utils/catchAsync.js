module.exports = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(err => next(err)); //pass error to global error handler
    };
  };