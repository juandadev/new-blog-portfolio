export const API_ERRORS = {
  NOT_FOUND: {
    message: 'Resource not found',
    status: 404,
  },
  UNAUTHORIZED: {
    message: 'Unauthorized access',
    status: 401,
  },
  FORBIDDEN: {
    message: 'Forbidden access',
    status: 403,
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal server error',
    status: 500,
  },
  INVALID_DATA: {
    message: 'Invalid data provided',
    status: 422,
  },
};

export const POST_SUCCESS = {
  CREATED: {
    message: 'Post created successfully',
    status: 201,
  },
  UPDATED: {
    message: 'Post updated successfully',
    status: 200,
  },
  DELETED: {
    message: 'Post deleted successfully',
    status: 200,
  },
  FETCHED_MANY: {
    message: 'Posts fetched successfully',
    status: 200,
  },
  FETCHED_ONE: {
    message: 'Post fetched successfully',
    status: 200,
  },
};
