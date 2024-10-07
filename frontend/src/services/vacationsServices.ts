import axios from "axios";
import { appConfig } from "../utils/appConfig";
import { VacationType } from "../Models/VacationModel";
import { VacationWithNumOfFollowers } from "../Models/VacationWithNumOfFollowers";

export const getAllVacations = async (): Promise<VacationType[]> => {
  const fullUrl = appConfig.baseUrl + appConfig.get.allVacations;

  const data = await axios
    .get(fullUrl)
    .then((res) => res.data as VacationType[])
    .catch(e => console.log(e));

  return data ? data as VacationType[] : [];
};

export const getOneVacation = async (id: string): Promise<VacationType> => {
  const fullUrl = appConfig.baseUrl + appConfig.get.oneVacation + id;

  const data = await axios
    .get(fullUrl)
    .then((res) => res.data)
    .catch(e => console.log(e));

  return data as VacationType;
};

export const addVacation = async (vacation: VacationType): Promise<VacationType> => {
  const fullUrl = appConfig.baseUrl + appConfig.post.vacation;

  const formData = new FormData();
  formData.append('destination', vacation.destination);
  formData.append('description', vacation.description);
  formData.append('start_date', vacation.start_date);
  formData.append('end_date', vacation.end_date);
  formData.append('price', vacation.price.toString());
  formData.append('image', vacation.image);

  const data = await axios
    .post(fullUrl, formData)
    .then((res) => res.data)
    .catch(e => {
      console.log(e);
      console.error('Error uploading file:', e.response ? e.response.data : e.message);
      throw e;
    });

  return data as VacationType;
};

export const updateVacation = async (vacation: VacationType): Promise<VacationType> => {
  const fullUrl = appConfig.baseUrl + appConfig.update.vacation + vacation.id;

  const formData = new FormData();
  formData.append('destination', vacation.destination);
  formData.append('description', vacation.description);
  formData.append('start_date', vacation.start_date);
  formData.append('end_date', vacation.end_date);
  formData.append('price', vacation.price.toString());
  formData.append('image', vacation.image);

  const data = await axios
    .put(fullUrl, formData)
    .then((res) => res.data as VacationType)
    .catch(e => {
      console.log(e);
      throw e;
    });

  return data as VacationType;
};

export const deleteVacation = async (id: number): Promise<void> => {
  const fullUrl = appConfig.baseUrl + appConfig.delete.vacation + id;

  await axios
    .delete(fullUrl)
    .then((res) => console.log("Vacation Was Deleted, status: " + res.status))
    .catch(e => console.log(e));
};

export const getUpcomingVacations = async (): Promise<VacationWithNumOfFollowers[]> => {
  const fullUrl = appConfig.baseUrl + appConfig.get.upcomingVacations;

  const data = await axios
    .get(fullUrl)
    .then((res) => res.data as VacationWithNumOfFollowers[])
    .catch(e => console.log(e));

  return data ? data as VacationWithNumOfFollowers[] : [];
};

export const getActiveVacations = async (): Promise<VacationWithNumOfFollowers[]> => {
  const fullUrl = appConfig.baseUrl + appConfig.get.activeVacations;

  const data = await axios
    .get(fullUrl)
    .then((res) => res.data as VacationWithNumOfFollowers[])
    .catch(e => console.log(e));

  return data ? data as VacationWithNumOfFollowers[] : [];
};
