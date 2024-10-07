import fsPromises from 'fs/promises';

export const logger = async (message: string): Promise<void> => {
    const now = new Date();
    const line = `\n${now.toLocaleDateString()} - ${message}\n-----------------------------------------------------------------------------------------`
    await fsPromises.appendFile('./logger.txt', line);
}