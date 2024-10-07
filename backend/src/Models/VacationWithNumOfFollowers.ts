import { VacationType } from "./VacationModel";
 
export interface VacationWithNumOfFollowers extends VacationType {
    numberOfFollowers: number;
}
