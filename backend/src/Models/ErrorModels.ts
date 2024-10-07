import { FollowerType } from "./FollowerModel";

export type ErrorType = {
  message: string;
  status: number;
};

// RouteNotFound
export const RouteNotFoundError = (route: string) => {
  const error: ErrorType = { message: `Route: ${route} NOT exists`, status: 404 };
  throw error;
};

// ValidationError
export const ValidationError = (message: string) => {
  const error: ErrorType = { message, status: 403 };
  throw error;
};

// UnauthorizedError
export const UnauthorizedError = (message: string) => {
  const error: ErrorType = { message, status: 401 };
  throw error;
};

// ResourceNotFound
export const ResourceNotFound = (resource: number|FollowerType) => {
  const error: ErrorType = {
    message: `can't find the resource you want:  ${resource}`,
    status: 404,
  };
  throw error;
};
