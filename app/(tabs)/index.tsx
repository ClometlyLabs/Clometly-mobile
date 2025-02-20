import React, { useState, useRef, useCallback} from 'react';
import { Image, StyleSheet, Text, Platform, View,  FlatList, Dimensions, ViewToken  } from 'react-native';
import VideoPlayer from '@/components/VideoPlayer';
import VideoInfo from '@/components/VideoInfo';
import Logotipo from '@/components/ui/logotipo';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const VIDEOS = [
  {
    id: '1',

    uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    username: 'nature_lover',
    description: '🌸 Spring is here! #nature #beautiful #spring',
    likes: 1234,
    comments: 123,
    shares: 45,
  },
  {
    id: '2',
    uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    username: 'yoga_life',
    description: '🧘‍♀️ Morning yoga routine #yoga #wellness #morning',
    likes: 2345,
    comments: 234,
    shares: 67,
  },
  {
    id: '3',
    uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    username: 'ocean_vibes',
    description: '🌊 Ocean therapy #beach #waves #relaxing',
    likes: 3456,
    comments: 345,
    shares: 89,
  },
];

export default function HomeScreen() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveVideoIndex(viewableItems[0].index ?? 0);
    }
  }, []);

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: WINDOW_HEIGHT,
    offset: WINDOW_HEIGHT * index,
    index,
  }), []);

  const renderItem = useCallback(({ item, index }: { item: typeof VIDEOS[0]; index: number }) => (
    <View style={styles.videoContainer}>
      <VideoPlayer uri={item.uri} isActive={index === activeVideoIndex} />
      <VideoInfo
        username={item.username}
        description={item.description}
        likes={item.likes}
        comments={item.comments}
        shares={item.shares}
      />
    </View>
  ), [activeVideoIndex]);

  const keyExtractor = useCallback((item: typeof VIDEOS[0]) => item.id, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          top: -1,
          right: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <Image
          source={require('@/assets/images/logoclometly.png')}
          style={{ width: 24, height: 24, marginTop: 40, marginLeft: 20 }}
        />
        <Text
          style={{
            fontSize: 30,
            marginTop: 40,
            marginLeft: 10,
            color: '#FFFF',
          }}
        >
          Clometly
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={VIDEOS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={WINDOW_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={onViewableItemsChanged}
        removeClippedSubviews
        windowSize={3}
        maxToRenderPerBatch={2}
        initialNumToRender={1}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
      />
      </View>
      


   
  
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  videoContainer: {
    height : WINDOW_HEIGHT,
    backgroundColor: 'black',
  },
});
