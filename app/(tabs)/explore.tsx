import ParallaxScrollView from '@/components/ParallaxScrollView';
import Logotipo from '@/components/ui/logotipo';
import { View, Text, Image, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import ClotPoster from '@/components/clotPoster';
import React from 'react';
import { FAB, Portal, Modal } from 'react-native-paper';

export default function Explore() {
    const styles = StyleSheet.create({
        fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex:2, 
        backgroundColor: '#9d20c2' //Buen color morado, capaz lo usamos en otras partes.
        },
    });


    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = { backgroundColor: 'rgb(35, 37, 41)', padding: 20, margin: 10, borderRadius: 10 };

  return (
    <View style={{ flex: 1}}>
        <Logotipo />
        <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => (showModal())}
        />

        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <ClotPoster />
            </Modal>
        </Portal>
        

        

    </View>
  );
  
}

