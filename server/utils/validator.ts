import Joi from "joi";

export const userSchema = Joi.object().keys({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
});

export const songSchema = Joi.object().keys({
  title: Joi.string().min(2),
  album: Joi.string(),
  artist: Joi.string(),
  genre: Joi.string(),
});
