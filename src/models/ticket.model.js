import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    default: function () {
      return `Ticket # ${Math.floor(Math.random() * 10000)}`;
    },
    required: true,
    unique: true,
  },
  purchase_datetime: {
    //fecha y hora exacta en la cual se formalizó la compra
    type: Date,
    default: Date.now,
    required: true,
  },
  amount: {
    //total de la compra
    type: Number,
    required: true,
  },
  purchaser: {
    //Email del usuario asociado al carrito
    type: String,
    required: true,
  },
});

const TicketModel = mongoose.model("tickets", ticketSchema);

export default TicketModel;
