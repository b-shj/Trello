const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    cardId: {
      type: String,
      required: true,
    },
    cardTitle: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.String,
      ref: 'User'
    }
  }, {timestamps: true});

  const Card = mongoose.model('Card', cardSchema);
  module.exports = Card

  // cardSchema.pre('save', async function (next) {
  //   if (this.isNew) {
  //     const highestOrdNo = await this.constructor.findOne().sort('order_id').exec();
  //     this.order_id = highestOrdNo ? highestOrdNo.order_id + 1 : 1;
  //   }
  
  //   next();
  // });
  


  