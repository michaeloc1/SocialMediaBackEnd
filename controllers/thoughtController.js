const { Thought } = require('../models');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getThoughts(req, res) {
        Thought.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
      },
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    createThought(req, res) {
        Thought.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          //then((user) =>
            //!user
             // ? res.status(404).json({ message: 'No thought with that ID' })
            //  : Application.deleteMany({ _id: { $in: user.applications } })
         // )
          .then(() => res.json({ message: 'Thought deleted' }))
          .catch((err) => res.status(500).json(err));
      },

      updateThought(req, res) {
    
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body )
        .then(() => res.json({ message: 'User and associated apps updated!' }))
        .catch((err) => res.status(500).json(err));
      },

}; 