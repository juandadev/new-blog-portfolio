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
  VERIFICATION_EMAIL_RESENT: {
    message: 'Verification email resent successfully',
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

export const TOOL_SUCCESS = {
  FETCHED: {
    message: 'Tools fetched successfully',
    status: 200,
  },
  CREATED: {
    message: 'Tool created successfully',
    status: 201,
  },
  UPDATED: {
    message: 'Tool updated successfully',
    status: 200,
  },
  DELETED: {
    message: 'Tool deleted successfully',
    status: 200,
  },
};

export const GAMING_SUCCESS = {
  GAME_FETCHED: {
    message: 'Game fetched successfully',
    status: 200,
  },
  GAME_CREATED: {
    message: 'Game created successfully',
    status: 201,
  },
  GAME_UPDATED: {
    message: 'Game updated successfully',
    status: 200,
  },
  GAME_DELETED: {
    message: 'Game deleted successfully',
    status: 200,
  },
  GAMES_FETCHED: {
    message: 'Games fetched successfully',
    status: 200,
  },
  PC_PART_CREATED: {
    message: 'PC part created successfully',
    status: 201,
  },
  PC_PART_UPDATED: {
    message: 'PC part updated successfully',
    status: 200,
  },
  PC_PART_DELETED: {
    message: 'PC part deleted successfully',
    status: 200,
  },
  PC_PARTS_FETCHED: {
    message: 'PC parts fetched successfully',
    status: 200,
  },
  PC_BUILD_STORY_FETCHED: {
    message: 'PC build story fetched successfully',
    status: 200,
  },
  PC_BUILD_STORY_UPDATED: {
    message: 'PC build story updated successfully',
    status: 200,
  },
  CONSOLE_CREATED: {
    message: 'Console created successfully',
    status: 201,
  },
  CONSOLE_UPDATED: {
    message: 'Console updated successfully',
    status: 200,
  },
  CONSOLE_DELETED: {
    message: 'Console deleted successfully',
    status: 200,
  },
  CONSOLES_FETCHED: {
    message: 'Consoles fetched successfully',
    status: 200,
  },
  GAMING_PHOTO_CREATED: {
    message: 'Gaming photo created successfully',
    status: 201,
  },
  GAMING_PHOTO_UPDATED: {
    message: 'Gaming photo updated successfully',
    status: 200,
  },
  GAMING_PHOTO_DELETED: {
    message: 'Gaming photo deleted successfully',
    status: 200,
  },
  GAMING_PHOTOS_FETCHED: {
    message: 'Gaming photos fetched successfully',
    status: 200,
  },
  IMAGE_UPLOADED: {
    message: 'Image uploaded successfully',
    status: 200,
  },
};

export const COFFEE_SUCCESS = {
  GEAR_FETCHED: {
    message: 'Coffee gear fetched successfully',
    status: 200,
  },
  GEAR_CREATED: {
    message: 'Coffee gear created successfully',
    status: 201,
  },
  GEAR_UPDATED: {
    message: 'Coffee gear updated successfully',
    status: 200,
  },
  GEAR_DELETED: {
    message: 'Coffee gear deleted successfully',
    status: 200,
  },
  GEARS_FETCHED: {
    message: 'Coffee gears fetched successfully',
    status: 200,
  },
  STORY_FETCHED: {
    message: 'Coffee story fetched successfully',
    status: 200,
  },
  STORY_UPDATED: {
    message: 'Coffee story updated successfully',
    status: 200,
  },
  JOURNEY_FETCHED: {
    message: 'Coffee journey fetched successfully',
    status: 200,
  },
  JOURNEY_MILESTONE_CREATED: {
    message: 'Coffee journey milestone created successfully',
    status: 201,
  },
  JOURNEY_MILESTONE_UPDATED: {
    message: 'Coffee journey milestone updated successfully',
    status: 200,
  },
  JOURNEY_MILESTONE_DELETED: {
    message: 'Coffee journey milestone deleted successfully',
    status: 200,
  },
  PHOTO_CREATED: {
    message: 'Coffee photo created successfully',
    status: 201,
  },
  PHOTO_UPDATED: {
    message: 'Coffee photo updated successfully',
    status: 200,
  },
  PHOTO_DELETED: {
    message: 'Coffee photo deleted successfully',
    status: 200,
  },
  PHOTOS_FETCHED: {
    message: 'Coffee photos fetched successfully',
    status: 200,
  },
};

export const BANNER_SUCCESS = {
  FETCHED: {
    message: 'Banner fetched successfully',
    status: 200,
  },
  UPDATED: {
    message: 'Banner updated successfully',
    status: 200,
  },
  IMAGE_UPLOADED: {
    message: 'Banner image uploaded successfully',
    status: 200,
  },
  TEXT_ENHANCED: {
    message: 'Text enhanced successfully',
    status: 200,
  },
};
