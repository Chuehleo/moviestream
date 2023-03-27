import axios from 'axios';
import React, { useCallback, useMemo } from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

import { HeartIconE } from '@/public/images/heartEmpty';
import { HeartIconF } from '@/public/images/heartFilled';


interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;

        if (isFavorite) {
            response = await axios.delete('/api/favorite', { data: { movieId }});
        } else {
            response = await axios.post('/api/favorite', { movieId })
        }
        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        });

        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);
       
    const Icon = isFavorite ? HeartIconF : HeartIconE;

    return (
        <div 
          onClick={toggleFavorites}
        className="
        cursor-pointer
        group/item
        w-4
        h-4
        lg:w-8
        lg:h-8
        rounded-full
        flex
        justify-center
        items-center
        transition
        "
    >
        <Icon className="text-white"
    />
    </div>    
    )

}

export default FavoriteButton;