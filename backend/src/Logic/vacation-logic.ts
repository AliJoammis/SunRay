import { ResourceNotFound, ValidationError } from "../Models/ErrorModels";
import { VacationType, validateVacation } from "../Models/VacationModel";
import { VacationWithNumOfFollowers } from "../Models/VacationWithNumOfFollowers";
import { executeSqlQuery } from "../Utils/dal";
import { OkPacket } from "mysql";

export const getAllVacationsLogic = async (): Promise<VacationType[]> => {
    const getAllVacationsQuery = `
  SELECT * FROM vacations`;
  
    const vacations = (await executeSqlQuery(getAllVacationsQuery)) as VacationType[];
  
    return vacations;
  };

  
  export const getOneVacationLogic = async (id: number): Promise<VacationType> => {
    const getOneVacationQuery = `
      SELECT * FROM vacations
      WHERE id = "${id}"
      `;
  
    const sqlResult = (await executeSqlQuery(getOneVacationQuery)) as VacationType[];
  
    if (sqlResult.length === 0) ResourceNotFound(id);
  
    const vacation = sqlResult[0];
  
    return vacation;
  };
  

  export const addOneVacationLogic = async (newVacation: VacationType): Promise<VacationType> => {
    validateVacation(newVacation);
  
//     const checkVacationExistQuery = `
//   SELECT * FROM theaters
//   WHERE id = "${newTheater.id}"
//   `;

  const checkVacationExistQuery = `
  SELECT * FROM vacations
  WHERE destination = "${newVacation.destination}" And 
        description = "${newVacation.description}" And
        start_date = "${newVacation.start_date}" And
        end_date = "${newVacation.end_date}" And 
        price = ${newVacation.price} And
        image = "${newVacation.image}"
  `;
  
    const isVacationExists = await executeSqlQuery(checkVacationExistQuery);
  
    if (isVacationExists.length !== 0) ValidationError("Vacation is already exists.");
  
    const addVacationQuery = `
  INSERT INTO vacations (id, destination, description, start_date, end_date, price, image)
  VALUES (null, "${newVacation.destination}", "${newVacation.description}", "${newVacation.start_date}", "${newVacation.end_date}", ${newVacation.price}, "${newVacation.image}")`;
  
    const addVacationInfo: OkPacket = await executeSqlQuery(addVacationQuery);
  
    if (addVacationInfo.affectedRows < 1) ValidationError(addVacationInfo.message);
  
    newVacation.id = +addVacationInfo.insertId;
  
    return newVacation;
  };
  

  export const updateVacationLogic = async (vacation: VacationType): Promise<VacationType> => {
    validateVacation(vacation);
  
    const checkVacationExistQuery = `
      SELECT * FROM vacations
      WHERE id = "${vacation.id}"
      `;
  
    const isVacationExists = await executeSqlQuery(checkVacationExistQuery);
  
    if (isVacationExists.length === 0) ValidationError("Vacation is not exists.");
  
    const updateVacationQuery = `
      UPDATE vacations SET destination = "${vacation.destination}",
      description = "${vacation.description}",
      start_date = "${vacation.start_date}",
      end_date = "${vacation.end_date}",
      price = ${vacation.price},
      image = "${vacation.image}"
      WHERE id = "${vacation.id}"
      `;
  
    const info: OkPacket = await executeSqlQuery(updateVacationQuery);
  
    if (info.affectedRows <= 0) ValidationError(info.message);
  
    return vacation;
  };
  
  export const deleteVacationLogic = async (id: number): Promise<void> => {
    const checkVacationExistQuery = `
      SELECT * FROM vacations
      WHERE id = "${id}"
      `;
  
    const isVacationExists = await executeSqlQuery(checkVacationExistQuery);
  
    if (isVacationExists.length === 0) ValidationError("Vacation is not exists, Can't be deleted");
  
    const deleteVacationQuery = `
    DELETE FROM vacations
    WHERE id = "${id}"
    `;
  
    const info: OkPacket = await executeSqlQuery(deleteVacationQuery);
  
    if (info.affectedRows <= 0) ResourceNotFound(id);
  };
  
  export const getUpcomingVacations = async (): Promise<VacationWithNumOfFollowers[]> => {
    const getUpcomingVacationsQuery = `
    SELECT v.*, COUNT(f.user_id) AS numberOfFollowers
    FROM vacations v
    LEFT JOIN followers f ON v.id = f.vacation_id
    WHERE v.start_date > CURDATE()
    GROUP BY v.id
    ORDER BY v.start_date;
    `;
  
    const upComingVacations = (await executeSqlQuery(getUpcomingVacationsQuery)) as VacationWithNumOfFollowers[];
  
    return upComingVacations;
  };

  export const getCurrentVacations = async (): Promise<VacationWithNumOfFollowers[]> => {
    const getActiveVacationsQuery = `
    SELECT v.*, COUNT(f.user_id) AS numberOfFollowers
    FROM vacations v
    LEFT JOIN followers f ON v.id = f.vacation_id
    WHERE start_date <= CURDATE() AND end_date >= CURDATE()
    GROUP BY v.id
    ORDER BY v.start_date;
    `;
  
    const activeVacations = (await executeSqlQuery(getActiveVacationsQuery)) as VacationWithNumOfFollowers[];
  
    return activeVacations;
  };
