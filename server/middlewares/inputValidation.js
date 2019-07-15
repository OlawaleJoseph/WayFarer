import Joi from '@hapi/joi';

const email = Joi.string()
  .email({ minDomainSegments: 2 })
  .required()
  .error(new Error('Invalid email'));

const password = Joi.string()
  .min(6)
  .required()
  .error(new Error('Password must have minimum of six(6) characters'));

const signUpSchema = Joi.object().keys({
  first_name: Joi.string()
    .required()
    .error(new Error('First name cannot be empty')),
  last_name: Joi.string()
    .required()
    .error(new Error('Last name cannot be empty')),
  email,
  password,
  is_admin: Joi.boolean().error(new Error('Admin status can either be true or false')),
});
const setAdminStatus = userEmail => (!!userEmail.endsWith('@wayfarer.com'));
export const validateSignUp = async (req, res, next) => {
  try {
    await Joi.validate(req.body, signUpSchema);
    req.body.isAdmin = req.body.is_admin || setAdminStatus(req.body.email);
    next();
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};
