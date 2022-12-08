const express = require('express')
const config = require("../../auth.config");
const router = express.Router()
const User = require('../../models/user/user_Model')
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

/* Return token if user found, posts right username and password */
router.post('/', async (req, res) => {
    User.findOne({
        username: req.body.username
      })
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (!user) {
            return res.status(404).send({
                accessToken: null,
                message: "Wrong username" });
          }
    
          var passwordIsValid = bcrypt.compareSync(
            req.body.pwd,
            user.password
          );
    
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
          
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });

          res.status(200).send({
            id: user._id,
            accessToken: token
          });
    })
})


module.exports = router
