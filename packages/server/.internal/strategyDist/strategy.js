"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = foo;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var i = 0;

function foo(_x, _x2) {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(exchange, data) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(i % 2)) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return exchange.createOrder("ETH/BTC", "market", "sell", 1);

          case 3:
            _context.next = 7;
            break;

          case 5:
            _context.next = 7;
            return exchange.createOrder("ETH/BTC", "market", "buy", 1);

          case 7:
            i++;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _foo.apply(this, arguments);
}

;