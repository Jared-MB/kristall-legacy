import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
});

export const warehouseRegex = /almac[eéèêëEÉÈÊË]n/i;

const GENERIC_ERRORS = {
  FORBIDDEN: {
    message: 'Forbidden',
    status: 403,
  },
  NOT_FOUND: {
    message: 'Not found',
    status: 404,
  },
  UNAUTHORIZED: {
    message: 'Unauthorized',
    status: 401,
  },
  BAD_REQUEST: {
    message: 'Bad request',
    status: 400,
  },
};

export const ERRORS_STATUS = {
  INVALID_TOKEN: GENERIC_ERRORS.FORBIDDEN,
  NO_OBJECT_FOUND: GENERIC_ERRORS.BAD_REQUEST,
};

export const USER_PERMISSIONS = {
  DASHBOARD: {
    ACCESS: 'dashboard:Ingresar',
  },
  LOCATIONS: {
    ACCESS: 'locations:Ingresar',
    CREATE: 'locations:Crear ubicaciones',
    EDIT: 'locations:Editar ubicaciones',
    DELETE: 'locations:Eliminar ubicaciones',
  },
  USERS: {
    ACCESS: 'users:Ingresar',
    CREATE: 'users:Crear usuarios',
    EDIT: 'users:Editar usuarios',
    DELETE: 'users:Eliminar usuarios',
  },
  SALES: {
    ACCESS: 'sales:Ingresar',
  },
  INVENTORY: {
    ACCESS: 'inventory:Ingresar',
    CREATE: 'inventory:Crear ubicaciones',
    EDIT: 'inventory:Editar ubicaciones',
    DELETE: 'inventory:Eliminar ubicaciones',
  },
  ORDERS: {
    ACCESS: 'orders:Ingresar',
    CREATE: 'orders:Crear ubicaciones',
    EDIT: 'orders:Editar ubicaciones',
    DELETE: 'orders:Eliminar ubicaciones',
  },
  NOTES: {
    ACCESS: 'notes:Ingresar',
    CREATE: 'notes:Crear ubicaciones',
    EDIT: 'notes:Editar ubicaciones',
    DELETE: 'notes:Eliminar ubicaciones',
  },
  CLIENTS: {
    ACCESS: 'clients:Ingresar',
    CREATE: 'clients:Crear ubicaciones',
    EDIT: 'clients:Editar ubicaciones',
    DELETE: 'clients:Eliminar ubicaciones',
  },
  SHOP: {
    ACCESS: 'shop:Ingresar',
  },
};

export const PERMISSIONS = [
  'dashboard:Ingresar',
  'locations:Ingresar',
  'locations:Crear ubicaciones',
  'locations:Editar ubicaciones',
  'locations:Eliminar ubicaciones',
  'users:Ingresar',
  'users:Crear usuarios',
  'users:Editar usuarios',
  'users:Eliminar usuarios',
  'sales:Ingresar',
  'inventory:Ingresar',
  'inventory:Crear productos',
  'inventory:Editar productos',
  'inventory:Eliminar productos',
  'orders:Ingresar',
  'orders:Crear ordenes',
  'orders:Editar ordenes',
  'orders:Eliminar ordenes',
  'notes:Ingresar',
  'notes:Crear notas',
  'notes:Editar notas',
  'notes:Eliminar notas',
  'clients:Ingresar',
  'clients:Crear clientes',
  'clients:Editar clientes',
  'clients:Eliminar clientes',
  'shop:Ingresar',
];

export const RESTRICTIONS = {
  MAX_LOCATIONS: {
    basic: 1,
    standard: 2,
    plus: 4,
  },
  MAX_USERS: {
    basic: 1,
    standard: 2,
    plus: 4,
  },
} as const