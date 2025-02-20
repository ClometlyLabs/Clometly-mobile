import React, { useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

interface VideoPlayerProps {
  uri: string;
  isActive: boolean;
}

export default function VideoPlayer({ uri, isActive }: VideoPlayerProps) {
  const video = useRef<Video>(null);

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    
    if (status.didJustFinish && Platform.OS === 'web') {
      video.current?.setPositionAsync(0);
    }
  }, []);

  useEffect(() => {
    if (!video.current) return;

    const loadAndPlayVideo = async () => {
      try {
        if (isActive) {
          await video.current?.playAsync();
        } else {
          await video.current?.pauseAsync();
          if (Platform.OS === 'web') {
            await video.current?.setPositionAsync(0);
          }
        }
      } catch (error) {
        console.warn('Error controlling video:', error);
      }
    };

    loadAndPlayVideo();

    return () => {
      video.current?.pauseAsync();
    };
  }, [isActive]);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={{ uri }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={isActive}
        isMuted={Platform.OS === 'web'}
        useNativeControls={false}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        onError={(error) => console.warn('Video error:', error)}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  video: {
    flex: 1,
    backgroundColor: 'black',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
  },
});