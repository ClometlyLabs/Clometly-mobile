import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Cargando = () => (
  <ActivityIndicator animating={true} color={MD2Colors.purple500} />
);

export default Cargando;