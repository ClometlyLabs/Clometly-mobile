import { Image, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";


export default function Logotipo({ tipo }: { tipo: string }) {
      const [background, setBackground] = useState('');
      const [shadow, setShadow] = useState('');

      useEffect(() => {
        if (tipo === 'explore') {
          setBackground('#1f1f1f');
          setShadow('0px 10px 3px rgba(0, 0, 0, 0.12)');
        } else {
          setBackground('');
        }


      }, [tipo]);

    return (
      <View
        style={{
          backgroundColor: background,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          top: 7,
          right: 0,
          height: 80,
          zIndex: 1,
          pointerEvents: 'none',
          marginBottom: 12,
          boxShadow: shadow,
        }}
      >
        <Image
          source={require('@/assets/images/logoclometly.png')}
          style={{ width: 24, height: 24, marginTop: 40, marginLeft: 20 }}
        />
        <Text
          style={{
            fontSize: 30,
            marginTop: 40,
            marginLeft: 10,
            color: '#FFFF',
          }}
        >
          Clometly
        </Text>
      </View>
    )
}