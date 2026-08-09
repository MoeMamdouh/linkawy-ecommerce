// import { useColorScheme } from '@shared/hooks/use-color-scheme';
// import { Image } from 'expo-image';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native';
// import { BannerSlide } from '../../types/home.types';
// import { createPromoSliderStyles, SLIDER_WIDTH } from './promoSlider.styles';

// interface PromoSliderViewProps {
//   slides: BannerSlide[];
//   autoScrollInterval?: number; // ms, default 4000
// }

// const PromoSliderView: React.FC<PromoSliderViewProps> = ({
//   slides,
//   autoScrollInterval = 4000,
// }) => {
//   const theme = useColorScheme() ?? 'light';
//   const styles = createPromoSliderStyles(theme);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const flatListRef = useRef<FlatList<BannerSlide>>(null);
//   const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
//   const activeIndexRef = useRef(0); // ref to avoid stale closure in setInterval

//   // Track scroll position to update active dot (safer than onViewableItemsChanged)
//   const handleScroll = useCallback(
//     (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//       const offsetX = event.nativeEvent.contentOffset.x;
//       const index = Math.round(offsetX / SLIDER_WIDTH);
//       if (index >= 0 && index < slides.length) {
//         setActiveIndex(index);
//         activeIndexRef.current = index;
//       }
//     },
//     [slides.length]
//   );

//   // Auto-scroll logic
//   useEffect(() => {
//     if (slides.length <= 1) return;

//     autoScrollTimer.current = setInterval(() => {
//       const nextIndex = (activeIndexRef.current + 1) % slides.length;
//       activeIndexRef.current = nextIndex;
//       setActiveIndex(nextIndex);
//       flatListRef.current?.scrollToIndex({
//         index: nextIndex,
//         animated: true,
//       });
//     }, autoScrollInterval);

//     return () => {
//       if (autoScrollTimer.current) {
//         clearInterval(autoScrollTimer.current);
//       }
//     };
//   }, [slides.length, autoScrollInterval]);

//   const renderSlide = useCallback(
//     ({ item }: { item: BannerSlide }) => (
//       <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
//         <View style={styles.slideContent}>
//           <View style={styles.tagBadge}>
//             <Text style={styles.tagText}>{item.tag}</Text>
//           </View>
//           <Text style={styles.titleText}>{item.title}</Text>
//           <Text style={styles.subtitleText}>{item.subtitle}</Text>
//         </View>
//         <Image
//           source={{ uri: item.image }}
//           style={styles.slideImage}
//           contentFit="cover"
//           transition={300}
//         />
//       </View>
//     ),
//     [styles]
//   );

//   if (slides.length === 0) return null;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         ref={flatListRef}
//         data={slides}
//         renderItem={renderSlide}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={SLIDER_WIDTH}
//         decelerationRate="fast"
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         getItemLayout={(_, index) => ({
//           length: SLIDER_WIDTH,
//           offset: SLIDER_WIDTH * index,
//           index,
//         })}
//       />
//       {/* Pagination Dots */}
//       <View style={styles.paginationContainer}>
//         {slides.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.dot,
//               index === activeIndex ? styles.activeDot : styles.inactiveDot,
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// export default PromoSliderView;
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { Image } from 'expo-image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native';
import { BannerSlide } from '../../types/home.types';
import { createPromoSliderStyles, SLIDER_WIDTH } from './promoSlider.styles';

interface PromoSliderViewProps {
  slides?: BannerSlide[]; // جعل الخاصية اختيارية
  autoScrollInterval?: number;
}

export const PromoSliderView: React.FC<PromoSliderViewProps> = ({
  slides = [], // قيمة افتراضية مصفوفة فارغة
  autoScrollInterval = 4000,
}) => {
  const theme = useColorScheme() ?? 'light';
  const styles = createPromoSliderStyles(theme);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<BannerSlide>>(null);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeIndexRef = useRef(0);

  const slidesCount = slides?.length ?? 0;

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!slidesCount) return;
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / SLIDER_WIDTH);
      if (index >= 0 && index < slidesCount) {
        setActiveIndex(index);
        activeIndexRef.current = index;
      }
    },
    [slidesCount]
  );

  useEffect(() => {
    if (slidesCount <= 1) return;

    autoScrollTimer.current = setInterval(() => {
      const nextIndex = (activeIndexRef.current + 1) % slidesCount;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, autoScrollInterval);

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [slidesCount, autoScrollInterval]);

  const renderSlide = useCallback(
    ({ item }: { item: BannerSlide }) => (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <View style={styles.slideContent}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.subtitleText}>{item.subtitle}</Text>
        </View>
        <Image
          source={{ uri: item.image }}
          style={styles.slideImage}
          contentFit="cover"
          transition={300}
        />
      </View>
    ),
    [styles]
  );

  if (!slides || slidesCount === 0) return null;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SLIDER_WIDTH}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: SLIDER_WIDTH,
          offset: SLIDER_WIDTH * index,
          index,
        })}
      />
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default PromoSliderView;