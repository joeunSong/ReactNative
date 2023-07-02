"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodo = createTodo;
exports.getTodos = getTodos;
exports.toggleTodo = toggleTodo;
exports.removeTodo = removeTodo;
exports.todosCollection = void 0;

var _firestore = _interopRequireDefault(require("@react-native-firebase/firestore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var todosCollection = (0, _firestore["default"])().collection('todos');
exports.todosCollection = todosCollection;

function createTodo(_ref) {
  var id = _ref.id,
      text = _ref.text,
      done = _ref.done;
  return todosCollection.doc(id).set({
    id: id,
    text: text,
    done: done
  });
}

function getTodos() {
  var data, todos;
  return regeneratorRuntime.async(function getTodos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(todosCollection.get());

        case 2:
          data = _context.sent;
          todos = data.docs.map(function (doc) {
            return _objectSpread({}, doc.data());
          });
          return _context.abrupt("return", todos);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function toggleTodo(data) {
  return regeneratorRuntime.async(function toggleTodo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(todosCollection.doc(data.id).update({
            done: data.done
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function removeTodo(id) {
  return todosCollection.doc(id)["delete"]();
}