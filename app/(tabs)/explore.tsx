import ParallaxScrollView from '@/components/ParallaxScrollView';
import Logotipo from '@/components/ui/logotipo';
import { View, FlatList, Text, Image, TouchableOpacity, Keyboard, StyleSheet } from 'react-native';
import ClotPoster from '@/components/ClotPoster';
import React from 'react';
import { useEffect, useState } from 'react';
import { FAB, Portal, Modal, Divider, Icon, MD3Colors } from 'react-native-paper';
import axios from 'axios';
import authCache from '@/store/authCache';
import * as Updates from 'expo-updates';
import { hide } from 'expo-splash-screen';

interface iPost {
    id: string;
    content: string;
    author: {
      first_names: string;
      last_names: string;
      profile_pic: string;
      user: {
        username: string; 
    }
    };
}

export default function Explore() {
    const [visible, setVisible] = useState(false);
    const [token, setToken] = useState('');
    const [posts, setPosts] = useState<iPost[]>([]);
    const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
    const [bookmarkedPosts, setBookmarkedPosts] = useState<{ [key: string]: boolean }>({});


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

    const fetchPosts = async () => {
        try {
          const response = (await axios.get('http://192.168.100.10:4000/post', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`}
          }));
          setPosts(response.data);
        } catch (error) {
          console.error(error);
        }
      };


      useEffect(() => {
        const getToken = async () => {
            const storedToken = await authCache.get('token');
            if (storedToken) {
                setToken(storedToken);
            } else {
                Updates.reloadAsync();
            }
        };
        getToken();
    }, []);
    
    useEffect(() => {
        if (token) {
            fetchPosts();
        }
    }, [token, posts]);
    



    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const handleLike = (postId: string) => {
        setLikedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId] // Alterna el estado de like para el post específico
        }));
    };

    const handleBookmark = (postId: string) => {
        setBookmarkedPosts((prev) => ({
            ...prev,   
            [postId]: !prev[postId] // Alterna el estado de like para el post específico
        }));
    };
    

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
        
        
        <View style={{ flex: 1, backgroundColor: '#1f1f1f', padding: 10, paddingBottom:0, zIndex:1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 0, top: -710, right: 0, bottom: 0
                }}>
               <Image source={ require('@/assets/images/logoclometly.png') } style={{ width: 24, height: 24, marginTop: 40, marginLeft: 20}} />
              <Text style={{ fontSize: 30, marginTop: 40,marginLeft: 10, position: 'relative', color: '#FFFF' }}>
                Clometly
              </Text>
              </View>
   
            
    <FlatList
        data={posts}
        keyExtractor={(post) => post.id}
        contentContainerStyle={{ marginTop: 70,paddingBottom: 70, zIndex: 1, backgroundColor: '#1f1f1f' }}
        keyboardShouldPersistTaps="handled"  // <-- Esto permite tocar los elementos después de escribir algo
        renderItem={({ item: post }) => (
            <TouchableOpacity activeOpacity={0.7}>
                <View style={{ flexDirection: 'row', backgroundColor: '#161616', marginBottom: 10, borderRadius: 10 }}>
                    <Image source={{ uri: post.author.profile_pic }} style={{ width: 40, height: 40, marginTop: 20, marginLeft: 20, borderRadius: 50 }} />
                    <View style={{ padding: 20, paddingLeft: 10, margin: 0, borderRadius: 10, flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 5 }}>{post.author.first_names} {post.author.last_names} </Text>
                            <Text style={{ color: 'gray' }}>| @{post.author.user.username} </Text>
                        </View>
                        <Text style={{ color: 'white' }}>{post.content}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ marginRight: 10, zIndex: 1 }} onPress={() => handleLike(post.id)}>
                                <Icon
                                    source="heart"
                                    color={likedPosts[post.id] ? MD3Colors.error50 : MD3Colors.neutralVariant40}
                                    size={20}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 10, zIndex: 1 }}>
                                <Icon source="comment" color={MD3Colors.neutralVariant40} size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 10, zIndex: 1 }} onPress={() => handleBookmark(post.id)}>
                                <Icon source="bookmark" color={bookmarkedPosts[post.id] ? MD3Colors.tertiary70 : MD3Colors.neutralVariant40} size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 10, zIndex: 1 }}>
                                <Icon source="share" color={MD3Colors.neutralVariant40} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )}
    />
</View>


    </View>
  );
  
}

