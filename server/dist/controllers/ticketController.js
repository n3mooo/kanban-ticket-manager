"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTickets = void 0;
const index_1 = require("../index");
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield index_1.prisma.ticket.findMany();
        res.json(tickets);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tickets' });
    }
});
exports.getTickets = getTickets;
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield index_1.prisma.ticket.create({
            data: req.body,
        });
        res.status(201).json(ticket);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating ticket' });
    }
});
exports.createTicket = createTicket;
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield index_1.prisma.ticket.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(ticket);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating ticket' });
    }
});
exports.updateTicket = updateTicket;
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_1.prisma.ticket.delete({
            where: { id: req.params.id },
        });
        res.json({ message: 'Ticket deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting ticket' });
    }
});
exports.deleteTicket = deleteTicket;
