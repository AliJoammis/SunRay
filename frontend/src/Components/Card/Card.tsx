 
import React, { useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Alert, AlertColor, Box, CardActionArea, CardActions, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import "./Card.css";
import  PopUpMore  from "./PopUpMore";
import { FetchError } from "../Types/types";
import { deleteVacation, getUpcomingVacations, getActiveVacations, updateVacation } from "../../services/vacationsServices";
import { VacationType } from "../../Models/VacationModel";
import { Button } from "flowbite-react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LikeButton from "./LikeButton";
import { addFollower, deleteFollower, getAllVacationsFollowedByUser, getAllVacationsWithNumOfFollowers, getFollowedVacationsByUser } from "../../services/followersServices";
import { EditVacation } from "./EditVacation";
import { ConfirmationPopUp } from "./ConfirmationPopUp";
import { VacationWithNumOfFollowers } from "../../Models/VacationWithNumOfFollowers";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useUser } from '../../Context/Context';
import TuneIcon from '@mui/icons-material/Tune';

import Checkbox from '@mui/material/Checkbox';
import { appConfig } from "../../utils/appConfig";
import EventIcon from '@mui/icons-material/Event';
import {convertDateFormat} from "../../utils/utils";

import AddIcon from '@mui/icons-material/Add'
import BarChartIcon from '@mui/icons-material/BarChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { addVacation } from '../../services/vacationsServices';
import { useNavigate } from 'react-router-dom';
import ButtonMui from '@mui/material/Button';

interface MainCardProps {
  searchQuery: string;
}

export const MainCard: React.FC<MainCardProps> = ({ searchQuery }) => {
  const [vacations, setVacations] = useState<VacationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FetchError | null>(null);
  const [follow, setFollow] = useState<{ [key: number]:number }>({});
  const [editVacation, setEditVacation] = useState<VacationType | null>(null);
  const [addedVacation, setAddedVacation] = useState<VacationType>(
    {
      id:1,
      destination:"",
      description:"",
      start_date:"",
      end_date:"",
      price: 0,
      image: "NoImage.jpeg"
    }
  );
  const [deletingVacationId, setDeletingVacationId] = useState<number | null>(null);
  const [showDeletePopUp, setShowDeletePopUp] = useState<boolean>(false);

  const [vacationsFollowedByUser, setVacationsFollowedByUser] = useState<number[]>([]);
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [page, setPage] = useState(1);

  const [myFavoritesChecked, setMyFavoriteschecked] = React.useState(false);
  const [activeVacationsChecked, setActiveVacationsChecked] = React.useState(false);
  const [upcomingVacationsChecked, setUpcomingVacationsChecked] = React.useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("error");

  const [addVacationPopup, setAddVacationPopup] = useState(false);

  const {user} = useUser();
  const theme = useTheme();

  const navigate = useNavigate();

  const handleOnClick = () =>{
    navigate("/chart"); 
  }

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMyFavoritesChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    setMyFavoriteschecked(event.target.checked);
    let vacations = [];

    if (event.target.checked){
      vacations = await (getFollowedVacationsByUser(user.id));
      setActiveVacationsChecked(false);
      setUpcomingVacationsChecked(false);
    }else{
      vacations = await (getAllVacationsWithNumOfFollowers());
    }

    setVacations(vacations);
    const NumberOfPages = Math.ceil(vacations.length/10);
    setPagesCount(NumberOfPages);
    setPage(1);
    const offset = 0;
    setPageOffset(offset);

  };

  const handleActiveVacationsChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    setActiveVacationsChecked(event.target.checked);
    let vacations = [];

    if (event.target.checked){
      vacations = await (getActiveVacations());
      setMyFavoriteschecked(false);
      setUpcomingVacationsChecked(false);
    }else{
      vacations = await (getAllVacationsWithNumOfFollowers());
    }

    setVacations(vacations);
    const NumberOfPages = Math.ceil(vacations.length/10);
    setPagesCount(NumberOfPages);
    setPage(1);
    const offset = 0;
    setPageOffset(offset);

  };
  
  const handleUpcomingVacationsChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    setUpcomingVacationsChecked (event.target.checked);
    let vacations = [];

    if (event.target.checked){
      vacations = await (getUpcomingVacations());
      setMyFavoriteschecked(false);
      setActiveVacationsChecked(false);
    }else{
      vacations = await (getAllVacationsWithNumOfFollowers());
    }

    
    const NumberOfPages = Math.ceil(vacations.length/10);
    setPagesCount(NumberOfPages);
    setPage(1);
    setVacations(vacations);
    const offset = 0;
    setPageOffset(offset);

  };

  const handleEditSave = async (updatedVacation: VacationType) => {
    try {
      const newUpdatedVacation = await updateVacation(updatedVacation);
      setVacations((prevVacations) => 
        prevVacations.map((v) => (v.id === updatedVacation.id ? newUpdatedVacation : v))
      );
      handleEditCancel();
    } catch (err:any) {
      console.log("Failed to update vacation", err);
      setSnackbarMessage(err.response ?'An error occurred while updating the vacation : ' + err.response.data : 'An error occurred while updating the vacation.');
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleEditClick = (vacation: VacationType) => {
    setEditVacation(vacation);  
  };

  const handleEditCancel = () => {
    setEditVacation(null);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingVacationId(id);
    setShowDeletePopUp(true);
  };

  const handleAddSave = async (addedVacation:VacationType) => {
    try {
      const newAddedVacation = await addVacation(addedVacation);
      setVacations((prevVacations) => [...prevVacations, newAddedVacation]);
      console.log('Vacations updated:', vacations);
      handleAddCancel();
    } catch (err:any) {
      console.log("Failed to Add vacation", err);
      setSnackbarMessage(err.response ?'An error occurred while adding the vacation : ' + err.response.data : 'An error occurred while adding the vacation.');
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
 
  const handleAddClick = () => {
    setAddVacationPopup(true);
  };

  const handleAddCancel = () => {
    setAddVacationPopup(false);
  };


  const handleDeleteConfirm = async () => {
    if (deletingVacationId !== null) {
      try {
        await deleteVacation(deletingVacationId);
        setVacations((prevVacations) => prevVacations.filter((vacation) => vacation.id !== deletingVacationId));
      } catch (error) {
        console.error("Failed to delete vacation", error);
      } finally {
        setShowDeletePopUp(false);
        setDeletingVacationId(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeletePopUp(false);
    setDeletingVacationId(null);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    const offset = (value - 1) * 10;
    setPageOffset(offset);
    setPage(value);
    
  }

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        console.log("Fetching vacations...");
        const data = await getAllVacationsWithNumOfFollowers() as VacationWithNumOfFollowers[];
        setVacations(data);

        const NumberOfPages = Math.ceil(data.length/10);
        setPagesCount(NumberOfPages);

        setMyFavoriteschecked(false);  
        setActiveVacationsChecked(false);
        setUpcomingVacationsChecked(false);
        setAddedVacation(
          {
            id:1,
            destination:"",
            description:"",
            start_date:"",
            end_date:"",
            price: 0,
            image: "NoImage.jpeg"
          }
        );

        const followCounts: { [key: number]: number } = {};
        for (const vacation of data) {
          followCounts[vacation.id] = vacation.numberOfFollowers;
        }
        setFollow(followCounts);
        console.log(followCounts);
      } catch (error: any) {
        console.error("Error fetching vacations:", error);
        setError({
          message: error.message || "An unexpected error occurred",
          status: error.status || 500,
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchVacations();
  }, []);
  
  useEffect(() => {
    const fetchVacationsFollowedByUser = async() =>{
      try {
        console.log("Fetching vacations folowwed by current user...");
        const data = await getAllVacationsFollowedByUser((user.id).toString()) as VacationType[];
        console.log("Fetched data:", data); 
        const vacationIds = data.map(vacation => vacation.id);
        setVacationsFollowedByUser(vacationIds);
        console.log("id's" + vacationIds);
      } catch (error: any) {
        console.error("Error fetching vacations:", error);
        setError({
          message: error.message || "An unexpected error occurred",
          status: error.status || 500,
        });
      }
    };
    fetchVacationsFollowedByUser();
  },[user.id])

  const isVacationFollowedByCurrentUser = (vacationIds: number[], vacation_id: number): boolean => {
    return vacationIds.includes(vacation_id);
  };


  const addVacationIdToFollowedVacationsState = (id: number) => {
    setVacationsFollowedByUser((prevIds) => {
        if (!prevIds.includes(id)) {
            return [...prevIds, id];
        }
        return prevIds;
    });
  };

const removeVacationIdFromFollowedVacationsState = (id: number) => {
    setVacationsFollowedByUser((prevIds) => {
        return prevIds.filter((vacationId) => vacationId !== id);
    });
};

  const handleFollowChange = useCallback(async (id: number, liked: boolean) => {
    setFollow((prevFollowers) => {
      const newFollowers = liked
        ? (prevFollowers[id] || 0) + 1
        : Math.max((prevFollowers[id] || 1) - 1, 0);

      if (liked){
        addFollower({user_id:user.id, vacation_id:id});
      }else{
        deleteFollower({user_id:user.id, vacation_id:id});
      }

      if (vacationsFollowedByUser.includes(id)) {
        removeVacationIdFromFollowedVacationsState(id);
      } else {
        addVacationIdToFollowedVacationsState(id);
      }

      return {
        ...prevFollowers,
        [id]: newFollowers,
      };
    });
  }, [user.id, vacationsFollowedByUser]);
  const handleError = (e:any) => {
    e.target.src = appConfig.imagesFolder + "NoImage.jpg";
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error.message} (Status: {error.status})
      </div>
    );
    const filteredVacations = vacations.filter((vacation) =>
      vacation.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      {user?.role === "admin" && 
      (<div className="AdminActions">
        <div className="admin-h1">
          <AdminPanelSettingsIcon fontSize = "large" />
          <h1>Admin Panel</h1>
        </div>
        <Stack className="stack-buttons" direction="row" spacing={2}>
            <ButtonMui onClick= {() => handleAddClick()} variant="contained" size="large" startIcon={<AddIcon />}>
              Vacation
            </ButtonMui>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={snackbarOpen}
              autoHideDuration={10000}
              onClose={() => setSnackbarOpen(false)}
            >
              <Alert
                onClose={() => setSnackbarOpen(false)}
                severity={snackbarSeverity}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
            {addVacationPopup && (
              <EditVacation
                vacation= {addedVacation}
                open={!!addVacation}
                onClose={handleAddCancel}
                onSave={handleAddSave}
                isEditPopup = {false}
              />
            )}
            <ButtonMui onClick= {handleOnClick} variant="outlined" size="medium" endIcon={<BarChartIcon />}>
              Charts\Reports
            </ButtonMui>
        </Stack>
      </div>
      )}
      <div>
        {user?.role === "user" && 
        (<Stack className="stack-filters responsive-stack" direction="row" spacing={2}>
          <div className ="popular-filters">
            <TuneIcon/>
            <label>Popular Filters</label>
          </div>
          <div className="favorite">
            <Checkbox
              checked={myFavoritesChecked}
              onChange={handleMyFavoritesChange}
              inputProps={{ 'aria-label': 'controlled' }}
              color="secondary"
            />
            <label> My Favorites</label>
          </div>
          <div className="favorite">
            <Checkbox
              checked={activeVacationsChecked}
              onChange={handleActiveVacationsChange}
              inputProps={{ 'aria-label': 'controlled' }}
              color="success"
            />
            <label> Active Vacations</label>
          </div>
          <div className="favorite">
            <Checkbox
              checked={upcomingVacationsChecked}
              onChange={handleUpcomingVacationsChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <label> Upcoming Vacations</label>
          </div>
        </Stack>
        )}
        <Stack className = "pagination-stack" spacing={2}>
            <Pagination onChange={handleChangePage} size="large" page={page} count={pagesCount} color="primary" />
        </Stack>
       
        <div className="cardsSectionDiv">
        {filteredVacations.slice(pageOffset, pageOffset + 10).map((vacation) => (
          <Card key={vacation.id} className="card">
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image= {appConfig.imagesFolder + (vacation.image ? vacation.image : "NoImage.jpg")}
                onError={handleError}
                alt={vacation.destination}
                className="cardImg"
              />
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', gap: "15px" }}>
                <Typography gutterBottom variant="h6" component="div" sx={{borderBottom: '1px solid grey'}}>
                  {vacation.destination}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                {isMobile && (
                  <LikeButton
                  vacationId={vacation.id}
                  initialLiked={isVacationFollowedByCurrentUser(vacationsFollowedByUser, vacation.id)}
                  onLikeChange={handleFollowChange}
                  />
                )}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Typography
              sx={{ margin: "3%" , display: "flex" , 
                alignItems: "center", gap:"5px"}}
              variant="body2"
              color="text.secondary"
              component="div"
            >
              <EventIcon color="primary"/>
              {convertDateFormat(vacation.start_date)} - {convertDateFormat(vacation.end_date)}
            </Typography>
            <Box component={"div"} className="priceDiv">
              <Typography sx={{ margin: "3%" }} variant="body2" color="white">
                Price: ${vacation.price}
              </Typography>
              <Typography sx={{ margin: "3%" }} variant="body2" color="white">
                Followers: {follow[vacation.id] || 0}
              </Typography>
            </Box>
            <CardActions>
              <PopUpMore
              vacationId={vacation.id}
                description={vacation.description}
                title={vacation.destination}
                price={vacation.price}
                imagePopUp={appConfig.imagesFolder + (vacation.image ? vacation.image : "NoImage.jpg")}
                followers={follow[vacation.id] || 0}
              />
              {user?.role === "admin" && (
                <>
                  <Button onClick={() => handleEditClick(vacation)} className="adminUserBtn"><EditIcon /></Button>
                  <Button onClick={() => handleDeleteClick(vacation.id)} className="adminUserBtn"><DeleteForeverIcon /></Button>
                </>
              )}
              {user?.role === "user" && (
                <LikeButton
                  vacationId={vacation.id}
                  initialLiked={isVacationFollowedByCurrentUser(vacationsFollowedByUser, vacation.id)}
                  onLikeChange={handleFollowChange}
                />
              )}
            </CardActions>
          </Card>
        ))}

        {editVacation && (
          <EditVacation
            vacation={editVacation}
            open={!!editVacation}
            onClose={handleEditCancel}
            onSave={handleEditSave}
            isEditPopup={true}
          />
        )}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarOpen}
          autoHideDuration={10000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <ConfirmationPopUp
          open={showDeletePopUp}
          title="Delete Vacation"
          content="Are you sure you want to delete this vacation?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
        </div>
        <Stack className = "pagination-stack bottom" spacing={2}>
            <Pagination onChange={handleChangePage} size="large" page={page} count={pagesCount} color="primary" />
        </Stack>
      </div>
    </>
    
  );
};
