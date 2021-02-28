import apiResponse from '@/helpers/apiResponse';

export default function validateMiddleware(validations, validationResult) {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    apiResponse.validationErrorWithData(res, '', errors.array());
    // res.status(422).json({ errors: errors.array() });
  };
}
