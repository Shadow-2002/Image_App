import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function PlayVideo({ navigation, route }) {

    return (
        <View>
            <Text style={{ textAlign: "center", fontSize: 20, color: "#000000", fontWeight: "bold", paddingTop: 50 }}>Video</Text>
            <View style={{ width: "95%", alignSelf: "center", paddingTop: 30 }}>
                <YoutubePlayer
                    height={300}
                    play={true}
                    videoId={route.params.Id}
                />
            </View>
            <View style={{alignSelf:"center"}}>
                <TouchableOpacity style={styles.subbutton} onPress={() => { navigation.navigate('Home') }}>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    subbutton: {
        borderRadius: 10,
        width: 300,
        height: 40,
        backgroundColor: "#34B27B",
        alignItems: "center",
        justifyContent: "center",
    },
});