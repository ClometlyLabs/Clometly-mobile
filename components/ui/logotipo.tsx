import { Image, Text, View } from "react-native";

export default function Logotipo() {
    return (
 <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 0, top: -710, right: 0, bottom: 0, zIndex: 1000
                }}>
               <Image source={ require('@/assets/images/logoclometly.png') } style={{ width: 24, height: 24, marginTop: 40, marginLeft: 20}} />
              <Text style={{ fontSize: 30, marginTop: 40,marginLeft: 10, position: 'relative', color: '#FFFF' }}>
                Clometly
              </Text>
              </View>
    )
}