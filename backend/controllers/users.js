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
  const { error } = Joi.object(
    usersMiddleware.postUserValidationObject
  ).validate(
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
    usersModel
      .getOneUserQueryByEmail(email)
      .then(([results]) => {
        if (results.length) {
          res.status(409).json({ message: "email already in use" });
        } else {
          usersModel
            .addUserQuery({
              nickName,
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
              const idUser = results.insertId;
              const createdUser = {
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
              res
                .status(201)
                .json({ ...createdUser, message: "user successfully created" });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ message: "error creating a user" });
            });
        }
      })
      .catch((err) => console.error(err));
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  const { error } = Joi.object(
    usersMiddleware.loginUserValidationObject
  ).validate({ email, password }, { abortEarly: false });
  if (error) {
    console.error(error);
    res.status(422).json({ validationError: error.details });
  } else {
    usersModel
      .getHashedPasswordByEmail(email)
      .then(async ([[results]]) => {
        argon2
          .verify(results.hashedPassword, password)
          .then((match) => {
            if (match) {
              usersModel.getOneUserQueryByEmail(email).then(([[result]]) => {
                const token = jwtServices.createToken(result.email); // not yet tested
                res.status(200).json({
                  ...result,
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
      .catch((error) => {
        console.error(error);
        res.status(404).json({ message: "user not found" });
      });
  }
};

const getAllUsers = (req, res) => {
  const { first, last, email } = req.query;
  if (email) {
    usersModel
      .getOneUserQueryByEmail(email)
      .then(([results]) => {
        res.status(200).json(results);
      })
      .catch((error) => {
        console.error(error);
        res.status(404).json({ message: `user with email ${email} not found` });
      });
  }
  if (first && last) {
    usersModel
      .getSelectedUsersQuery(first, last)
      .then(([results]) => {
        res.status(200).json(results);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: error });
      });
  } else {
    usersModel
      .getUsersQuery()
      .then(([results]) => res.status(200).json(results))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: error });
      });
  }
};

const getOneUserById = (req, res) => {
  const { id } = req.params;
  usersModel
    .getOneUserQueryById(id)
    .then(([results]) => {
      if (results.length) {
        res.status(200).json(results);
      } else res.status(404).json({ message: `user with id ${id} not found` });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: error });
    });
};
module.exports = {
  postUser,
  loginUser,
  getAllUsers,
  getOneUserById,
};
