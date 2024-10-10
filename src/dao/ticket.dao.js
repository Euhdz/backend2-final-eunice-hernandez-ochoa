import TicketModel from "../models/ticket.model.js";

class TicketDao {
  async createTicket(ticketData) {
    try {
      const ticket = new TicketModel(ticketData);
      await ticket.save();
      return ticket;
    } catch (error) {
      console.error("Error creating the ticket", error);
      throw error;
    }
  }
}

export default new TicketDao(); // Cuando se pone  export default new TicketDao() vs export default TicketDao,?
