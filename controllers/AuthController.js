import initMiddleware from '@/middlewares/initMiddleware';
import validateMiddleware from '@/middlewares/validateMiddleware';
import { check, validationResult } from 'express-validator';
import apiResponse from '@/helpers/apiResponse';

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check('first_name').isLength({ min: 1, max: 40 }),
      //   check('day').isInt({ min: 1, max: 31 }),
      //   check('gender').isIn(['male', 'female']),
      //   check('mobile_phone').isMobilePhone(['th-TH']),
      //   check('boolean').isBoolean(),
    ],
    validationResult
  )
);

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await validateBody(req, res);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        apiResponse.validationErrorWithData(res, '', errors.array());
        // return res.status(422).json({ errors: errors.array() });
      }

      apiResponse.successResponse(res);

      break;
    default:
      apiResponse.notFoundResponse(res);
      break;
  }
};
