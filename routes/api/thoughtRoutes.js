const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  //addFriend,
 // deleteFriend,
  
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

//router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);
module.exports = router;