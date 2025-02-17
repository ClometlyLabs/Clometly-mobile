import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, DefaultTheme } from 'react-native-paper';


const ClotPoster = () => {
  const [clotPost, setClotPost] = useState('');


  const handlePost = () => {
    console.log('Post:', clotPost);
    setClotPost('');
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
