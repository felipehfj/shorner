import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import auth from "../middleware/auth";

import UrlController from '../controllers/UrlController';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import ProfileController from '../controllers/ProfileController';

const routes: Router = Router();

const validate = {
  url: {
    redirect: celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        shortId: Joi.string().required(),
      })
    }),
    create: celebrate({
      [Segments.BODY]: Joi.object().keys({
        url: Joi.string().required().max(1000).uri({ scheme: ["http", "https"] }),
      })
    }),
    count: celebrate({
      [Segments.BODY]: Joi.object().keys({
        shortId: Joi.string().required().min(7).max(14),
      })
    }),
  },
  auth: {
    login: celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      })
    }),
  },
  user: {
    register: celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      })
    }),
  },
  profile: {
    updateProfile: celebrate({
      [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required().max(20),
      })
    }),
    getOne: celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.string().required(),
      })
    }),
  }
}

routes.get(['/:shortId', '/api/v1/url/:shortId'], validate.url.redirect, UrlController.redirect)
routes.post('/api/v1/url', validate.url.create, UrlController.create)
routes.post('/api/v1/url/count', validate.url.count, UrlController.count)

routes.get('/api/v1/auth', auth, AuthController.getUser);
routes.post('/api/v1/auth/login', validate.auth.login, AuthController.login);

routes.post('/api/v1/users', validate.user.register, UserController.register);

routes.get('/api/v1/profiles/me', auth, ProfileController.me);
routes.delete('/api/v1/profiles/me', auth, ProfileController.delete);
routes.get('/api/v1/profiles', auth, ProfileController.index);
routes.get('/api/v1/profiles/:userId', validate.profile.getOne, auth, ProfileController.getOne);
routes.post('/api/v1/profiles', validate.profile.updateProfile, auth, ProfileController.updateProfile);

export default routes;