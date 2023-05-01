const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
let formatDate = (date) => {
  const newDate = new Date(date)
  const month = newDate.toLocaleString('default', { month: 'short' });
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  const time = newDate.toLocaleTimeString();

  return `${month} ${day}th, ${year} at ${time}`
}

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: { 
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
      },

    createdAt: {
        type: Date, default: Date.now,
        get: formatDate 

      },

      username: {
        type: String,
        required: true,        
      },
      reactions: [reactionSchema],
  },
  {
    toJSON: {
        getters: true,
      },
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });



// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

