import ticketDao from "../dao/ticket.dao.js";

class TicketRepository {
  async createTicket(ticketData) {
    try {
      const ticket = await ticketDao.createTicket(ticketData);
      return ticket;
    } catch (error) {
      console.error("Error creating the ticket", error);
      throw error;
    }
  }
}

export default new TicketRepository();
