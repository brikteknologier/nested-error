function NestedError(innerException) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'NestedError';
  this.innerException = innerException;
}
NestedError.prototype.__proto__ = Error.prototype;

NestedError.prototype.toString = function () {
  return "NestedError: " + this.innerException.toString();
};

module.exports = NestedError;
