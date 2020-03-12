const express = require('express');
const Users = require("./userDb.js");
const router = express.Router();


router.post('/', (req, res) => {
  // do your magic!
  
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  

});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "Error while retrieving user information." })
  });
});

router.get('/:id', (req, res) => {
  // do your magic!
  let id = req.params.id;
  Users.getById(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error retrieving user from database." });
    });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  let id = req.params.id;
  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error retrieving posts from database." });
    });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  id = req.params.id;
  Users.remove(id)
    .then(user => {
      res.status(200).json({ message: "The user has been deleted." });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error deleting user from database." });
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
