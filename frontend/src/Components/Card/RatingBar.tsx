import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { RatingType } from '../../Models/RatingModel';
import { addRating, getRatingsByVacationId } from '../../services/ratingServices';
import { useUser } from '../../Context/Context';

interface Props {
    vacationId: number;
    max: number;
    value: number;
    children?: React.ReactNode;
}

const RatingBar: React.FC<Props> = ({ vacationId, max, value }) => {
    const [ratings, setRatings] = useState<RatingType[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [userRating, setUserRating] = useState<number>(0);
    const { user } = useUser();

    useEffect(() => {
        const fetchRatings = async () => {
            setLoading(true);
            try {
                const ratingsData = await getRatingsByVacationId(vacationId);
                setRatings(ratingsData);

                const totalRating = ratingsData.reduce((acc, curr) => acc + curr.rating, 0);
                const avgRating = ratingsData.length > 0 ? totalRating / ratingsData.length : 0;
                setAverageRating(avgRating);

                const userRated = ratingsData.find(rating => rating.userId === user?.id);
                if (userRated) {
                    setUserRating(userRated.rating);
                }
            } catch (error) {
                console.error('Error fetching ratings:', error);
                setError('Failed to fetch ratings');
            } finally {
                setLoading(false);
            }
        };

        fetchRatings();
    }, [vacationId, user]);

    const handleStarClick = async (rating: number) => {
        if (!user) {
            setError('You must be logged in to rate.');
            return;
        }
        try {
            const addedRating = await addRating(vacationId, user.id, rating);
            setUserRating(addedRating.rating);
            setRatings(prevRatings => [...prevRatings, addedRating]);

            const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) + rating;
            const avgRating = (ratings.length + 1) > 0 ? totalRating / (ratings.length + 1) : 0;
            setAverageRating(avgRating);
        } catch (error) {
            console.error('Error adding rating:', error);
            setError('Failed to add rating');
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= max; i++) {
            stars.push(
                i <= rating ? (
                    <StarIcon key={i} color="primary" onClick={() => handleStarClick(i)} />
                ) : (
                    <StarBorderIcon key={i} color="primary" onClick={() => handleStarClick(i)} />
                )
            );
        }
        return stars;
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <p>Average Rating: {averageRating.toFixed(1)}/5</p>
            <div>
                {renderStars(userRating || averageRating)}
            </div>
        </div>
    );
};

export default RatingBar;
