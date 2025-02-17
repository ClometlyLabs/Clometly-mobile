import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button, HelperText, DefaultTheme } from 'react-native-paper';
import { useNavigation, CommonActions } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<any>();

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password') {
      // Restablecer el historial de navegación y navegar a la pantalla de pestañas
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: '(tabs)', params: { screen: 'index' } }],
        })
      );
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1f1f1f' }}>
      <Image source={require('@/assets/images/newbg.png')} style={{width: "100%", height: "50%", top: -100}} />
      <View style={styles.container}>
        <Text style={styles.title}>Inicia sesión en Clometly!</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: customTheme.colors.primary } }}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: customTheme.colors.primary } }}
        />
        {error ? <HelperText type="error">{error}</HelperText> : null}
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
        >
          Iniciar sesión
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -100,
    padding: 16,
    backgroundColor: '#1f1f1f',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#c48cd4',
    padding: 8,
  },
});

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#c48cd4',
  },
};

export default LoginScreen;
