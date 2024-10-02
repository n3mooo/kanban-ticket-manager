"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketController_1 = require("../controllers/ticketController");
const router = express_1.default.Router();
router.get('/', ticketController_1.getTickets);
router.post('/', ticketController_1.createTicket);
router.put('/:id', ticketController_1.updateTicket);
router.delete('/:id', ticketController_1.deleteTicket);
exports.default = router;
