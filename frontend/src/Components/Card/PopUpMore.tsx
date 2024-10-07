import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { CardMedia, Typography, Box, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { appConfig } from "../../utils/appConfig";
import { addComment, deleteComment, CommentType, getCommentsByVacationId, updateComment } from "../../services/commentServices";
import { useUser } from "../../Context/Context";
import RatingBar from "./RatingBar"; 
import {  getRatingsByVacationId } from "../../services/ratingServices";
import { RatingType } from "../../Models/RatingModel";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from "react-router-dom";

interface Props {
    description: string;
    title: string;
    price: number;
    imagePopUp: string | undefined;
    followers: number;
    vacationId: number;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const PopUpMore = ({
    description,
    title,
    price,
    imagePopUp,
    followers,
    vacationId,
}: Props) => {


    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [editingComment, setEditingComment] = useState<CommentType | null>(null);
    const [editText, setEditText] = useState<string>("");

    const [ratings, setRatings] = useState<RatingType[]>([]);

  const navigate = useNavigate();
  
    const handleNavigate = (path: string) => {
        navigate(path);
      };
    

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const ratingsData = await getRatingsByVacationId(vacationId);
                console.log("Fetched ratings:", ratingsData);
                setRatings(ratingsData);
            } catch (error) {
                console.error("Error fetching ratings:", error);
            }
        };
        fetchRatings();
    
    }, [vacationId]);
    
    const handleEditComment = (comment: CommentType) => {
        setEditingComment(comment);
        setEditText(comment.text);
    };

    const handleSaveEdit = async () => {
        if (!editingComment) return;
        try {
            const updatedComment = await updateComment({
                ...editingComment,
                text: editText,
            });
            setComments(comments.map((comment) =>
                comment.id === updatedComment.id ? updatedComment : comment
            ));
            setEditingComment(null);
            setEditText("");
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComment(commentId);
            setComments(comments.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleClickOpen = async () => {
        setOpen(true);
        await fetchComments();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleError = (e: any) => {
        e.target.src = appConfig.imagesFolder + "NoImage.jpg";
    };

    const fetchComments = async () => {
        try {
            const commentsData = await getCommentsByVacationId(vacationId);
            console.log("Fetched comments:", commentsData);
            setComments(commentsData);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    const handleAddComment = async () => {
        console.log("Adding comment with userId:", user.id, "and text:", newComment);
        try {
            const addedComment = await addComment(vacationId, user.id, newComment);
            setComments([...comments, addedComment]);
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                More
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ textAlign: "center" }}>{`${title}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {description}
                        <br />
                        <br />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image={imagePopUp}
                                onError={handleError}
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "450px",
                                    },
                                    height: {
                                        xs: "auto",
                                        sm: "250px",
                                    },
                                }}
                            />
                        </Box>

                        <br />
                        <br />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body2" color="green">
                                Price: {price}
                            </Typography>
                            <Typography variant="body2" color="green">
                                Followers: {followers}
                            </Typography>
                        </Typography>
                        <br />
                            {user?.id !== 0 && (<>
                        <RatingBar value={0} max={5} vacationId={vacationId}>

                        <List>
                                
                                {ratings.map((rating) => (
                                    <ListItem key={rating.id}>
                                    {Array.from({ length: rating.rating }, (_, index) => (
                                        <StarIcon key={index} color="info" />
                    ))}
                    {Array.from({ length: 5 - rating.rating }, (_, index) => (
                        <StarBorderIcon key={index} />
                    ))}
                    </ListItem>
                ))}
        </List>
                            </RatingBar>
                </>
            )}
                        <br />

                        <Typography variant="h6" component="div">
                            Comments
                        </Typography>
                        <List>
                            {comments.map((comment) => (
                                <ListItem key={comment.id}>
                                    <ListItemText primary={comment.text} />
                                    {comment.userId === user.id && (
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteComment(comment.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditComment(comment)}>
                                                <EditIcon color="error" />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    )}
                                </ListItem>
                            ))}
                        </List>

                            {user?.id !== 0 && (<>
                        {editingComment && (
                            <Box>
                                <TextField
                                    label="Edit comment"
                                    variant="outlined"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveEdit}
                                    sx={{ marginTop: "10px" }}
                                    >
                                    Save
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                        setEditingComment(null);
                                        setEditText("");
                                    }}
                                    sx={{ marginTop: "10px", marginLeft: "10px" }}
                                    >
                                    Cancel
                                </Button>
                            </Box>
                        )}

                        {user && (
                            <Box>
                                <TextField
                                    label="Add a comment"
                                    variant="outlined"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddComment}
                                    sx={{ marginTop: "10px" }}
                                    >
                                    Add Comment
                                </Button>
                            </Box>
                        )}
                    </>
                    )}
                            {user?.id === 0 && (
                            <>
                            <Box sx={{display:"flex"}}>

                            <Typography sx={{color:"black"}}>
                                <Button onClick={() => handleNavigate("/auth/login")} >LogIn</Button>
                                \ 
                                <Button  onClick={() => handleNavigate("/auth/login")}>Register</Button>
                            </Typography>
                            <Typography sx={{color:"black", marginTop:"1%"}}>To comment and rate...</Typography>
                            </Box>
                            </>
                            )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default PopUpMore;
