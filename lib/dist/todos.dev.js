"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodo = createTodo;
exports.getTodo = getTodo;
exports.removeTodo = removeTodo;
exports.todosCollection = void 0;

var _firestore = _interopRequireDefault(require("@react-native-firebase/firestore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function getTodo(id) {
  var doc;
  return regeneratorRuntime.async(function getTodo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(todosCollection.doc(id).get());

        case 2:
          doc = _context.sent;
          return _context.abrupt("return", doc.data());

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function removeTodo(id) {
  return todosCollection.doc(id)["delete"]();
}