const Joi = require("joi");
const usersModel = require("../models/users");
const usersMiddleware = require("../middlewares/users");
const argon2 = require("argon2");
const jwtServices = require("../services/jwt");

const postUser = async (req, res) => {
  const {
    nickName,
    email,
    password,
    role,
    firstName,
    lastName,
    date,
    bio,
    image,
  } = req.body;
  const hashedPassword = await argon2.hash(password);
  const error = Joi.object(usersMiddleware.postUserValidationObject).validate(
    {
      nickName,
      email,
      hashedPassword,
      role,
      firstName,
      lastName,
      date,
      bio,
      image,
    },
    { abortEarly: false }
  );
  if (error) {
    console.error(error);
    res.status(422).json({ validationError: error.details });
  } else {
    usersModel.getOneUserQueryByEmail(email).then(([result]) => {
      if (result.length) {
        res.status(409).send("Email already used");
      } else {
        usersModel
          .addUserQuery({
            nickname,
            email,
            hashedPassword,
            role,
            firstName,
            lastName,
            date,
            bio,
            image,
          })
          .then((results) => {
            const idUser = results.insertId();
            const createdUser = {
              idUser,
              nickName,
              email,
              hashedPassword,
              role,
              firstName,
              lastName,
              date,
              bio,
              image,
            };
            res.status(201).json(createdUser);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("error creating a User");
          });
      }
    });
  }
};

const loginUser = (req, res) => {
  const { credentialEmail, credentialPassword } = req.body;
  usersModel
    .getHashedPasswordByEmail(credentialEmail)
    .then(async ([[results]]) => {
      argon2
        .verify(result.hashedPassword, credentialPassword)
        .then((match) => {
          if (match) {
            usersModel
              .getOneUserQueryByEmail(credentialEmail)
              .then(([[results]]) => {
                const token = jwtServices.createToken(results.id); // not yet tested
                res
                  .status(200)
                  .json({
                    ...results,
                    token: token,
                    message: "ACCESS_GRANTED",
                  });
              });
          } else {
            res.status(401).json({ message: "ACCESS_DENIED" });
          }
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};

module.exports = {
  postUser,
  loginUser,
}