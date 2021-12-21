"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _database = _interopRequireDefault(require("./configs/database"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

_dotenv.default.config();

(0, _database.default)();
app.use('/api', _routes.default);
app.use((error, req, resp, next) => {
  console.log(error);
  resp.status(error.status || 500).json({
    message: error.message
  });
});
app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`));