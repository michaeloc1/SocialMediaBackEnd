const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


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
        type: Date, default: Date.now 

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


// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

