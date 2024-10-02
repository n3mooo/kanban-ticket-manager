import { Request, Response } from 'express';
import { prisma } from '../index';

export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await prisma.ticket.findMany();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets' });
  }
};

export const createTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await prisma.ticket.create({
      data: req.body,
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error creating ticket' });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await prisma.ticket.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error updating ticket' });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    await prisma.ticket.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting ticket' });
  }
};