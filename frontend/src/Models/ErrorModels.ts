export const ResourceNotFound = (message: string): never => {
    throw new Error(message);
};

export const ValidationError = (message: string): never => {
    throw new Error(message);
};
