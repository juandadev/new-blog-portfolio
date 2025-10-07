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
    message: 'Access forbidden',
    status: 403,
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal server error',
    status: 500,
  },
  INVALID_DATA: {
    message: 'Invalid or malformed data',
    status: 422,
  },
};

export const POST_SUCCESS = {
  VIEWS_UPDATED: {
    message: 'Post views updated successfully',
    status: 200,
  },
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
    message: 'Posts retrieved successfully',
    status: 200,
  },
  FETCHED_ONE: {
    message: 'Post retrieved successfully',
    status: 200,
  },
};

export const SUBSCRIBER_SUCCESS = {
  CREATED: {
    message:
      'You’re subscribed! Please check your inbox to verify your email address.',
    status: 201,
  },
  RESEND_INVITATION: {
    message: 'Verification email resent successfully',
    status: 200,
  },
  INVITATION_SENT: {
    message: 'Invitation sent successfully',
    status: 200,
  },
  UPDATED: {
    message: 'Subscriber updated successfully',
    status: 200,
  },
  SUBSCRIBED: {
    message: 'Subscribed successfully',
    status: 200,
  },
  UNSUBSCRIBED: {
    message: 'Unsubscribed successfully',
    status: 200,
  },
  DELETED: {
    message: 'Subscriber deleted successfully',
    status: 200,
  },
  FETCHED_MANY: {
    message: 'Subscribers retrieved successfully',
    status: 200,
  },
  FETCHED_ONE: {
    message: 'Subscriber retrieved successfully',
    status: 200,
  },
};

export const SUBSCRIBER_ERRORS = {
  UNSUBSCRIBED: {
    message: 'Subscriber is already unsubscribed',
    status: 400,
  },
  DUPLICATE: {
    message: 'This email address is already subscribed',
    status: 409,
  },
  LIMIT_EXCEEDED: {
    message:
      'Subscriber limit reached. Please contact the administrator for assistance.',
    status: 409,
  },
  TOKEN_STILL_VALID: {
    message:
      'Subscription verification is still pending. Please check your inbox to confirm your email.',
    status: 400,
  },
};
