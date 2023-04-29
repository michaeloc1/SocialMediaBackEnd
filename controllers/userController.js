//const { User, Application } = require('../models');
//const { ObjectId } = require('bson');
const { User } = require('../models');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and associated apps
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      //then((user) =>
        //!user
        //  ? res.status(404).json({ message: 'No user with that ID' })
          //: Application.deleteMany({ _id: { $in: user.applications } })
      //)
      .then(() => res.json({ message: 'User and associated apps deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    
    User.findOneAndUpdate({ _id: req.params.userId }, req.body )
    .then(() => res.json({ message: 'User and associated apps updated!' }))
    .catch((err) => res.status(500).json(err));
  },

  // addFriend(req, res){
  //   console.log(req.params.friendID)
  //   User.findOneAndUpdate({ _id: req.params.userId }, { friends: ObjectId(req.params.friendID)}  )
  //   .then(() => res.json({ message: 'User and associated friend updated!' }))
  //   .catch((err) => res.status(500).json(err));

  // },

  addFriend(req, res) {
    console.log(req.params.userId)
    console.log(req.params.friendId)
    User.findOneAndUpdate(

      { _id: req.params.userId },
      { $addToSet: { friends: ObjectId(req.params.friendId) } },
      { new: true }
    )
      .then((friend) =>
        !friend
         ? res
             .status(404)
             .json({ message: 'No student found with that ID :(' })
         : res.json(friend)
       // console.log(friend)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend(req, res){

  }

  
  
};
