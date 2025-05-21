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
