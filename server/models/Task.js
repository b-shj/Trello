const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
  },
  taskTitle: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  parentId: {
    type: mongoose.Schema.Types.String,
    ref: 'Card'
  },
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task


// taskSchema.pre('save', async function (next) {
//   // Only update the ord_no if it's a new document (isNew)
//   if (this.isNew) {
//     // Find the highest ord_no value in the collection
//     const highestOrdNo = await this.constructor.findOne().sort('ord_no').exec();

//     // Increment the highest ord_no by 1 and set it as the ord_no for the new document
//     this.ord_no = highestOrdNo ? highestOrdNo.ord_no + 1 : 1;
//   }

//   next();
// });



