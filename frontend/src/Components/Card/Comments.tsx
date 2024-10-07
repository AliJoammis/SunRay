import React, { useEffect, useState } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { addComment, deleteComment, getCommentsByVacationId, CommentType } from "../../services/commentServices";
import { useUser } from "../../Context/Context";
import EditIcon from "@mui/icons-material/Edit";

interface CommentsProps {
    vacationId: number;
}

const Comments: React.FC<CommentsProps> = ({ vacationId }) => {
    const { user } = useUser();
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newComment, setNewComment] = useState<string>("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getCommentsByVacationId(vacationId);
                console.log("Fetched comments:", commentsData); // Add this line to log the fetched comments
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [vacationId]);

    const handleAddComment = async () => {
        try {
            const addedComment = await addComment(vacationId, user.id, newComment);
            setComments([...comments, addedComment]);
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
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

    const handleEditComment = (comment: CommentType) => {
        console.log("Editing comment:", comment);
    };

    return (
        <Box>
            <List>
                {comments.map((comment) => {
                    console.log("Comment:", comment);
                    console.log("User ID:", user.id);
                    console.log("Comment User ID:", comment.userId);

                    return (
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
                    );
                })}
            </List>
            {user && (
                <Box>
                    <TextField
                        label="Add a comment"
                        variant="outlined"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={handleAddComment} sx={{ marginTop: "10px" }}>
                        Add Comment
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Comments;
