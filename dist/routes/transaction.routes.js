"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CreateTransactionService_1 = __importDefault(require("../services/CreateTransactionService"));
var TransactionsRepository_1 = __importDefault(require("../repositories/TransactionsRepository"));
var transactionRouter = express_1.Router();
var transactionsRepository = new TransactionsRepository_1.default();
// transactionRouter.get('/', (request, response) => {
//  try {
// TODO
//    return;
//  } catch (err) {
//   return response.status(400).json({ error: err.message });
// }
// });
transactionRouter.post('/', function (request, response) {
    try {
        var _a = request.body, title = _a.title, type = _a.type, value = _a.value;
        var createTransactionService = new CreateTransactionService_1.default(transactionsRepository);
        var transaction = createTransactionService.execute({
            title: title,
            type: type,
            value: value,
        });
        return response.json(transaction);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = transactionRouter;
