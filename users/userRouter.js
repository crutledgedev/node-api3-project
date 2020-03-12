const express = require('express');
const Users = require('./userDb');
 const Posts = require('../posts/postDb');
const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error while retrieving user information." })
    });
});

router.post('/:id/posts', validatePost, (req, res) => {
  let resource = req.body;
  let user_id = req.params.id;
  req.body.user_id = user_id;

  Posts.insert(resource)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Post could not be saved to database." })
    });
});

router.post('/', validateUser, (req, res) => {
  let user = req.body;
  Users.insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error posting user to database." });
    });
});

router.get('/:id', validateUserId, (req, res) => {
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

router.get('/:id/posts', validateUserId, (req, res) => {
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

router.delete('/:id', validateUserId, (req, res) => {
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

router.put('/:id', validateUserId, (req, res) => {
  let id = req.params.id;
  let changes = req.body;

  Users.update(id, changes)
    .then(count => {
      Users.getById(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error updating user in database." });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  let id = req.params.id;
  Users.getById(id)
    .then(user => {
      !user
        ? res.status(404).json({ errorMessage: "Invalid user ID." })
        : req.user = user;
      next();
    })
    .catch(err => {
      console.log(err)
    })
};

function validateUser(req, res, next) {
  let body = req.body;
  let name = req.body.name;
  if (!body) {
    res.status(400).json({ errorMessage: "Missing user data." })
  } else if (!name) {
    res.status(400).json({ errorMessage: "Missing required name field." })
  } else {
    next();
  };
};

function validatePost(req, res, next) {
  let body = req.body;
  let text = req.body.text;
  if (!body) {
    res.status(400).json({ errorMessage: "Missing post data." })
  } else if (!text) {
    res.status(400).json({ errorMessage: "Missing required text field." })
  } else {
    next();
  };
}

module.exports = router;
