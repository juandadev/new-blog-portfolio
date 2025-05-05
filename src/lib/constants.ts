export const LOGIN_ERRORS = {
  NO_INVITATION: 'No se ha encontrado una invitación para esta cuenta',
  INACTIVE: 'Tu cuenta está inactiva, por favor contacta al administrador',
  DEFAULT: 'Error desconocido, por favor intenta más tarde',
};

export type LoginErrorKey = keyof typeof LOGIN_ERRORS;
