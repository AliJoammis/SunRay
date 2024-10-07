import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from "@mui/material";

interface LikeButtonProps {
  vacationId: number;
  initialLiked: boolean;
  onLikeChange: (id: number, liked: boolean) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ vacationId, initialLiked, onLikeChange }) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleClick = () => {
    setLiked((prevLiked) => {
      const newLiked = !prevLiked;
      onLikeChange(vacationId, newLiked);
      return newLiked;
    });
  };

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  return (
    <Button onClick={handleClick} style={{ color: liked ? "red" : "" }}>
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </Button>
  );
};

export default LikeButton;
