import mysql from 'mysql';
import { appConfig } from './appConfig';

// Create a pool of connection to mysql
const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database
});

// execute sql query with parameters
export const executeSqlQuery = (sql: string, params?: any[]): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, params, (error, result) => {
            if (error) {
                reject(error);
                return;
            } else {
                resolve(result);
            }
        });
    });
};
