import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SwiperCardRefType, Swiper } from 'rn-swiper-list';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Heart, Redo, RefreshCcwDot, X } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image, ImageBackground } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const ICON_SIZE = 20;

const IMAGES: { id: string; image: ImageSourcePropType; name: string; party: string }[] = [
  {
    id: '1',
    name: 'Balen Shah',
    party: 'Independent',
    image: require('../assets/people/balen.jpg'),
  },
  {
    id: '2',
    name: 'Harka Sapang',
    party: 'Independent',
    image: require('../assets/people/harka.jpg'),
  },
  {
    id: '3',
    name: 'Gopal Hamal',
    party: 'Independent',
    image: require('../assets/people/gopal.jpg'),
  },
  {
    id: '4',
    name: 'Sagar Dhakal',
    party: 'Independent',
    image: require('../assets/people/sagar.jpg'),
  },
  {
    id: '5',
    name: 'Sumana Shrestha',
    party: 'RSP',
    image: require('../assets/people/sumana.jpg'),
  },
  {
    id: '6',
    name: 'Rabi Lamichhane',
    party: 'RSP',
    image: require('../assets/people/rabi.jpg'),
  },
];

const MainScreen = () => {
  const [index, setIndex] = useState(0);
  const ref = React.useRef<SwiperCardRefType | undefined>(undefined);

  const renderCard = React.useCallback(
    (item: { id: string; image: ImageSourcePropType; name: string; party: string }) => {
      return (
        <View style={styles.renderCardContainer} className="blur-lg backdrop-blur-lg">
          <Image source={item.image} style={styles.renderCardImage} blurRadius={0} />

          <View className="absolute bottom-0 left-0 right-0 h-40 rounded-b-lg bg-primary/40 blur-xl backdrop-blur-lg">
            <Text className="text-xl font-semibold">{item.name}</Text>
            <Text className="text-md">{item.party}</Text>
          </View>
        </View>
      );
    },
    []
  );

  const renderFlippedCard = React.useCallback(
    (_: { id: string; image: ImageSourcePropType; name: string; party: string }, index: number) => {
      return (
        <View style={styles.renderFlippedCardContainer}>
          <Text style={styles.text}>Flipped content 🚀 {index}</Text>
        </View>
      );
    },
    []
  );

  const OverlayLabelRight = React.useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'green',
            opacity: 0.5,
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelLeft = React.useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'red',
            opacity: 0.5,
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelTop = React.useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'blue',
            opacity: 0.5,
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelBottom = React.useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'orange',
            opacity: 0.5,
          },
        ]}
      />
    );
  }, []);

  return (
      <GestureHandlerRootView style={styles.container}>        
        <ImageBackground
          blurRadius={90}
          source={IMAGES[index]?.image}
          style={{
            height: '100%',
            width: '100%',
          }}>
          <Text>{index}</Text>
          <View style={[styles.subContainer, { zIndex: 10 }]}>
            <Swiper
              ref={ref}
              data={IMAGES}
              cardStyle={styles.cardStyle}
              overlayLabelContainerStyle={styles.overlayLabelContainerStyle}
              renderCard={renderCard}
              onIndexChange={(idx) => {
                setIndex(idx);
                console.log('Current Active index', idx);
              }}
              onSwipeRight={(cardIndex) => {
                console.log('cardIndex', cardIndex);
              }}
              onPress={() => {
                console.log('onPress');
              }}
              onSwipedAll={() => {
                console.log('onSwipedAll');
              }}
              FlippedContent={renderFlippedCard}
              onSwipeLeft={(cardIndex) => {
                console.log('onSwipeLeft', cardIndex);
              }}
              onSwipeTop={(cardIndex) => {
                console.log('onSwipeTop', cardIndex);
              }}
              onSwipeBottom={(cardIndex) => {
                console.log('onSwipeBottom', cardIndex);
              }}
              OverlayLabelRight={OverlayLabelRight}
              OverlayLabelLeft={OverlayLabelLeft}
              OverlayLabelTop={OverlayLabelTop}
              OverlayLabelBottom={OverlayLabelBottom}
              onSwipeActive={() => {
                console.log('onSwipeActive');
              }}
              onSwipeStart={() => {
                console.log('onSwipeStart');
              }}
              onSwipeEnd={() => {
                console.log('onSwipeEnd');
              }}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              style={styles.button}
              onPress={() => {
                ref.current?.flipCard();
              }}>
              <Icon as={RefreshCcwDot} size={ICON_SIZE} color="white" />
            </Button>

            <Button
              style={styles.button}
              onPress={() => {
                ref.current?.swipeBack();
              }}>
              <Icon as={Redo} size={ICON_SIZE} color="white" />
            </Button>
            <Button
              style={styles.button}
              onPress={() => {
                ref.current?.swipeLeft();
              }}>
              <Icon as={X} size={ICON_SIZE} color="white" />
            </Button>
            <Button
              style={styles.button}
              onPress={() => {
                ref.current?.swipeBottom();
              }}>
              <Icon as={ArrowDown} size={ICON_SIZE} color="white" />
            </Button>
            <Button
              style={styles.button}
              onPress={() => {
                ref.current?.swipeTop();
              }}>
              <Icon as={ArrowUp} size={ICON_SIZE} color="white" />
            </Button>
            <Button
              style={styles.button}
              onPress={() => {
                ref.current?.swipeRight();
              }}>
              <Icon as={Heart} size={ICON_SIZE} color="white" />
            </Button>
          </View>
        </ImageBackground>
      </GestureHandlerRootView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    bottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    height: 50,
    borderRadius: 40,
    aspectRatio: 1,
    backgroundColor: '#3A3D45',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  renderCardContainer: {
    borderRadius: 15,
    width: '100%',
    height: '100%',
  },
  renderFlippedCardContainer: {
    borderRadius: 15,
    backgroundColor: '#baeee5',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardStyle: {
    width: '96%',
    height: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderCardImage: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayLabelContainer: {
    borderRadius: 15,
    height: '90%',
    width: '96%',
  },
  text: {
    color: '#001a72',
  },
  overlayLabelContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
