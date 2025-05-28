export const API_ERRORS = {
  NOT_FOUND: {
    message: 'Recurso no encontrado',
    status: 404,
  },
  UNAUTHORIZED: {
    message: 'Acceso no autorizado',
    status: 401,
  },
  FORBIDDEN: {
    message: 'Acceso prohibido',
    status: 403,
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Error interno del servidor',
    status: 500,
  },
  INVALID_DATA: {
    message: 'Datos inválidos',
    status: 422,
  },
};

export const POST_SUCCESS = {
  CREATED: {
    message: 'Post creado exitosamente',
    status: 201,
  },
  UPDATED: {
    message: 'Post actualizado exitosamente',
    status: 200,
  },
  DELETED: {
    message: 'Post eliminado exitosamente',
    status: 200,
  },
  FETCHED_MANY: {
    message: 'Posts encontrados exitosamente',
    status: 200,
  },
  FETCHED_ONE: {
    message: 'Post encontrado exitosamente',
    status: 200,
  },
};

export const SUBSCRIBER_SUCCESS = {
  CREATED: {
    message:
      'Estás suscrito! Por favor, revisa tu bandeja de entrada para verificar tu correo.',
    status: 201,
  },
  INVITATION_SENT: {
    message: 'Invitación enviada exitosamente',
    status: 200,
  },
  UPDATED: {
    message: 'Suscriptor actualizado exitosamente',
    status: 200,
  },
  SUBSCRIBED: {
    message: 'Suscrito exitosamente',
    status: 200,
  },
  UNSUBSCRIBED: {
    message: 'Suscripción cancelada exitosamente',
    status: 200,
  },
  DELETED: {
    message: 'Suscriptor eliminado exitosamente',
    status: 200,
  },
  FETCHED_MANY: {
    message: 'Suscriptores encontrados exitosamente',
    status: 200,
  },
  FETCHED_ONE: {
    message: 'Suscriptor encontrado exitosamente',
    status: 200,
  },
};

export const SUBSCRIBER_ERRORS = {
  UNSUBSCRIBED: {
    message: 'El suscriptor ya está dado de baja',
    status: 400,
  },
  DUPLICATE: {
    message: 'El suscriptor ya existe',
    status: 409,
  },
  LIMIT_EXCEEDED: {
    message:
      'Límite de suscriptores alcanzado. Favor de contactar al administrador.',
    status: 409,
  },
};
