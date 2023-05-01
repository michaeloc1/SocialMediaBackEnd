const { Thought, User } = require('../models');
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
        //.then((thought) => res.json(thought))
            .then((thought) => {
                User.findOneAndUpdate(

                    { _id: req.body.userId },
                    { $addToSet: { thoughts: ObjectId(thought._id) } },
                    { new: true }
                  )
                  .then((user) =>
                !thought
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' })
                : res.json(thought)

      )

            })
        .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {

                User.findOneAndUpdate(

                    { username: thought.username },
                    { $pull: { thoughts: ObjectId(thought._id) } },
                    { new: true }
                  )
                  .then((user) =>
                        res.status()

      )

            })
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

  addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No student found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));

  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

}; 