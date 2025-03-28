import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableWithoutFeedback, AppState, AppStateStatus } from 'react-native';
import { Video, ResizeMode, Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

interface VideoPlayerProps {
  uri: string;
  isActive: boolean;
}

export default function VideoPlayer({ uri, isActive }: VideoPlayerProps) {
  const video = useRef<Video>(null);
  // Guarda si el usuario quiere reproducir el video
  const [isPlaying, setIsPlaying] = useState(isActive);
  // Guarda si la app está en primer plano (active) o no
  const [isAppActive, setIsAppActive] = useState(true);

  // Escucha el estado de la app y actualiza isAppActive
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      setIsAppActive(nextAppState === 'active');
    });
    return () => subscription.remove();
  }, []);

  // Configura el audio para que no se mantenga activo en segundo plano
  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: false,
      playsInSilentModeIOS: false,
      allowsRecordingIOS: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  // Permite pausar o reanudar el video con tap
  const togglePlayback = async () => {
    if (!video.current) return;
    try {
      const status = await video.current.getStatusAsync();
      if (!status.isLoaded) return;

      if (status.isPlaying) {
        await video.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await video.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.warn('Error toggling playback:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={togglePlayback}>
      <View style={styles.container}>
        <Video
          ref={video}
          source={{ uri }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          isLooping
          // Si la app no está activa, shouldPlay es false y el video se pausa
          shouldPlay={isActive && isAppActive && isPlaying}
          isMuted={Platform.OS === 'web'}
          useNativeControls={false}
          onError={(error) => console.warn('Video error:', error)}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
          pointerEvents="none"
        />
      </View>
    </TouchableWithoutFeedback>
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
