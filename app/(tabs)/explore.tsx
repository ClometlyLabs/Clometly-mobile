import ParallaxScrollView from '@/components/ParallaxScrollView';
import Logotipo from '@/components/ui/logotipo';
import { View, Text, Image } from 'react-native';
export default function Explore() {
    return (
            <View style={{ flex: 1 }}>
                <Logotipo />
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'grey'
            }}>  
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 20,
                    color: 'white'
                }}>
                Aca deberiamos tener los posteos de los usuarios
            </Text>
        </View>
            </View>
    )
}