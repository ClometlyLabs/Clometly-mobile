import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, DefaultTheme } from 'react-native-paper';
import authCache from '@/store/authCache';
import * as Updates from 'expo-updates';

const ClotPoster = () => {
  const [clotPost, setClotPost] = useState('');

  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = await authCache.get('token');
      if (token) {
        setToken(token);
      }else{
        Updates.reloadAsync();
      }
    };
    getToken();
  }, []);


  const handlePost = () => {
    console.log('Post:', clotPost);
  
    axios.post(
      `${process.env.EXPO_PUBLIC_IP}/post`,
      {
        content: clotPost
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {
      console.log('Post response:', response.data);
      
      setClotPost('');
    })
    .catch(error => {
      console.error('Post error:', error);
      console.log(`Tu IP es ${process.env.EXPO_PUBLIC_IP}`);
    });
  };
  

  return (
      <View style={styles.container}>
        <TextInput
          label="What's happening?"
          value={clotPost}
          onChangeText={text => setClotPost(text)}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.textInput}
          theme={{ colors: { primary: customTheme.colors.primary } }}
        />
        <Button
          mode="contained"
          onPress={handlePost}
          style={styles.button}
        >
          Post
        </Button>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  textInput: {
    marginBottom: 16,
    
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#c48cd4',
  
  },
});

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#c48cd4',
  },
};

export default ClotPoster;
