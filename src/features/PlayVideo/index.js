import React from 'react';
import { Text, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function PlayVideo() {

    return (
        <View>
            <Text style={{ textAlign: "center",fontSize:20,color:"#000000",fontWeight:"bold",paddingTop:50 }}>Video</Text>
            <View style={{ width: "95%", alignSelf: "center",paddingTop:30 }}>
                <YoutubePlayer
                    height={300}
                    play={true}
                    videoId={'ZOIdBWPydZY'}
                />
            </View>
        </View>
    );
}
