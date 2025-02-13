import ParallaxScrollView from '@/components/ParallaxScrollView';
import { View, Text, Image } from 'react-native';
export default function Explore() {
    return (
            <View style={{ flex: 1 }}>
                   <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 0, top: -710, right: 0, bottom: 0, zIndex: 1000
                    }}>
                   <Image source={ require('@/assets/images/logoclometly.png') } style={{ width: 24, height: 24, marginTop: 40, marginLeft: 20}} />
                  <Text style={{ fontSize: 30, marginTop: 40,marginLeft: 10, position: 'relative', color: '#FFFF' }}>
                    Clometly
                  </Text>
                  </View>
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