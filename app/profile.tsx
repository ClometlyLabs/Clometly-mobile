import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Divider, FAB, Modal, Portal } from "react-native-paper";
import axios from "axios";
import * as Updates from "expo-updates";
import authCache from "@/store/authCache";
import Cargando from "@/components/ui/Cargando";
import Botonera from "@/components/ui/Profile/Botonera";
import ClotPoster from "@/components/ClotPoster";
export interface iData {
  username: string;
  email: string;
  profile: {
    first_names: string;
    last_names: string;
    profile_pic: string;
    banner_pic: string;
    description: string;
    id: string;
    age: number;
    birthdate: string;
    phone: string;
  };
}

export default function Profile() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState("");
  const [data, setData] = useState<iData | null>(null);

  const [visible, setVisible] = useState(false);


  useEffect(() => {
    const getToken = async () => {
      const storedToken = await authCache.get("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        Updates.reloadAsync();
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_IP}/profile/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.userId);
      } catch (error) {
        console.error("Error encontrando al usuario:", error);
      }
    };

    fetchUser();
  }, [token]);

  useEffect(() => {
    if (!token || !user) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_IP}/profile/${user}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error recopilando informacion del usuario:", error);
      }
    };

    fetchData();
  }, [user, token]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: '#161616', padding: 20, margin: 10, borderRadius: 10 };
  return (
    <View style={{ flex: 1}}>
                            <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => (showModal())}
        />
                <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <ClotPoster/>
            </Modal>
        </Portal>
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>

      {data ? (
        <View>

          <View style={styles.topImages}>
            {data.profile?.banner_pic && (
              <Image source={{ uri: data.profile.banner_pic }} style={styles.banner} />
            )}
            {data.profile?.profile_pic && (
              <Image source={{ uri: data.profile.profile_pic }} style={styles.image} />
            )}
          </View>

          <View style={styles.topText}>
            <Text style={styles.name}>
              {data.profile?.first_names} {data.profile?.last_names}
            </Text>
            <Text style={styles.secName}> | @{data.username}</Text>
          </View>

          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              {data.profile?.description ||
                "Desarrollador Full Stack Jr || Javascript | React Native | ExpressJs || Me gusta hacer aplicaciones moviles"}
            </Text>
          </View>
          <Divider style={{ marginBottom: 20 }} />

          <Botonera profileId={data.profile?.id} userId={user} />
        </View>
      ) : (
        <Cargando />
      )}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#1f1f1f",
  },
  topImages: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  secName: {
    fontSize: 20,
    color: "gray",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: "gray",
    borderWidth: 4,
    borderColor: "#1f1f1f",
    position: "absolute",
    top: 140,
  },
  banner: {
    width: 360,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  topText: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  description: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2e2e35",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  descriptionText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  fab: {
        position: 'absolute',
        zIndex: 1,
        margin: 16,
        right: 0,
        bottom: 100,
        backgroundColor: '#9d20c2' //Buen color morado, capaz lo usamos en otras partes.
        },
});
