import React from 'react';
import { View } from 'react-native';
import { Star } from 'lucide-react-native';
import { Palette } from '@shared/constants/theme';

interface StarRatingViewProps {
  rating: number;
  size?: number;
}

const StarRatingView: React.FC<StarRatingViewProps> = ({ rating, size = 11 }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={{ flexDirection: 'row', gap: 1 }}>
      {stars.map((star) => {
        const filled = rating >= star - 0.25;
        return (
          <Star
            key={star}
            size={size}
            color={Palette.amber500}
            fill={filled ? Palette.amber500 : 'transparent'}
          />
        );
      })}
    </View>
  );
};

export default StarRatingView;
