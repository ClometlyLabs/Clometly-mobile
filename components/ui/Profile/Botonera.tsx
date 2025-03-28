import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { SegmentedButtons, Text, Icon, MD3Colors } from "react-native-paper";
import axios from "axios";
import { iData } from "@/app/profile";
import Cargando from "@/components/ui/Cargando";

interface PostType {
  id: string;
  content: string;
  createdAt: string;
  author: {
    profile_pic: string;
    first_names: string;
    last_names: string;
    user: {
      username: string;
    };
  };
}

const Botonera = ({ profileId, userId }: { profileId: string; userId: string }) => {
  const [value, setValue] = useState("posts");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [data, setData] = useState<iData | null>(null);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profileId) return;

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_IP}/post/${profileId}`);
        setPosts(response.data.reverse()); // Invirtiendo el array aquí
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_IP}/profile/${userId}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    Promise.all([fetchPosts(), fetchData()]).finally(() => setLoading(false));
  }, [profileId]);

  if (loading) return <Cargando />;

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleBookmark = (postId: string) => {
    setBookmarkedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        style={styles.botonera}
        onValueChange={setValue}
        buttons={[
            { value: "posts", label: "Posts" },
            { value: "about", label: "Sobre mí" },
        ]}
      />
      <View style={styles.contentContainer}>
        {value === "posts" ? (
          <View style={styles.postsContainer}>
            {posts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <Image source={{ uri: data?.profile.profile_pic }} style={styles.profilePic} />
                <View style={styles.postContent}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.userName}>
                      {data?.profile.first_names} {data?.profile.last_names}
                    </Text>
                    <Text style={{ color: "gray" }}> | @{data?.username}</Text>
                  </View>
                  <Text style={{ color: "white" }}>{post.content}</Text>
                  <View style={styles.postActions}>
                    <TouchableOpacity onPress={() => handleLike(post.id)}>
                      <Icon
                        source="heart"
                        color={likedPosts[post.id] ? MD3Colors.error50 : MD3Colors.neutralVariant40}
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon source="comment" color={MD3Colors.neutralVariant40} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleBookmark(post.id)}>
                      <Icon
                        source="bookmark"
                        color={bookmarkedPosts[post.id] ? MD3Colors.tertiary70 : MD3Colors.neutralVariant40}
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon source="share" color={MD3Colors.neutralVariant40} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>Edad: {data?.profile.age || "No disponible"}</Text>
            <Text style={styles.aboutText}>Número de Contacto: {data?.profile.phone || "No disponible"}</Text>
            <Text style={styles.aboutText}>Correo: {data?.email || "No disponible"}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1f1f1f" },
  botonera: { width: "100%", backgroundColor: "#1f1f1f" },
  contentContainer: { flex: 1, width: "100%", marginTop: 10 },
  postsContainer: { flex: 1, paddingBottom: 20 },
  postCard: { flexDirection: "row", backgroundColor: "#161616", marginBottom: 10, borderRadius: 10 },
  profilePic: { width: 40, height: 40, marginTop: 20, marginLeft: 20, borderRadius: 50 },
  postContent: { padding: 20, paddingLeft: 10, flex: 1 },
  userName: { color: "white", fontWeight: "bold", marginBottom: 5 },
  postActions: { flexDirection: "row", alignItems: "center", marginTop: 10, justifyContent: "space-between" },
  aboutContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2e2e35", padding: 20, borderRadius: 10, marginTop: 20 },
  aboutText: { color: "white", fontSize: 16, marginBottom: 8, textAlign: "center" },
});

export default Botonera;


