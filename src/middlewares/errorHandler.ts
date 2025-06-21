import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError' && err.errors) {
    const errors: any = {};
    for (const field in err.errors) {
      const e = err.errors[field];
      errors[field] = {
        message: e.properties?.message || e.message,
        name: e.name,
        properties: e.properties,
        kind: e.kind,
        path: e.path,
      };
      if (e.value !== undefined) {
        errors[field].value = e.value;
      }
    }
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: err.name,
        errors,
      },
    });
    return;
  }

  if (err.code === 11000) {
    res.status(400).json({
      message: 'Duplicate field value entered',
      success: false,
      error: err,
    });
    return;
  }

  if (err.message) {
    res.status(400).json({
      message: err.message,
      success: false,
      error: err,
    });
    return;
  }

  res.status(500).json({
    message: 'Internal server error',
    success: false,
    error: err,
  });
};