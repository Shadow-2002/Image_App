import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import PlayVideo from '../PlayVideo';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TouchableWithoutFeedback,
    Platform,
    PermissionsAndroid,
    TouchableOpacity
} from 'react-native';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';

export default function Home() {

    const [modalVisible, setModalVisible] = useState(false);
    const [file, setFile] = useState({});
    const { width, height } = Dimensions.get('screen');

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    // Open camera to capture Image
    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            quality: 10,
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                // console.log('Response = ', response);

                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                setFile(response);
            });
        }
        setModalVisible(!modalVisible);
    };

    //Open Galery to chose Image
    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            quality: 10,
        };
        launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            setFile(response);
        });
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.centeredView}>

            <TouchableWithoutFeedback onPress={() => { setModalVisible(!modalVisible) }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <TouchableWithoutFeedback onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <View style={{ flex: 1 }} >
                            <TouchableWithoutFeedback onPress={() => { }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => captureImage('photo')}>
                                            <Text style={styles.textStyle}>Open Camera</Text>
                                        </Pressable>
                                        <View style={{ paddingTop: 20 }}>
                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => chooseFile('photo')}>
                                                <Text style={styles.textStyle}>Select from Galery</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </TouchableWithoutFeedback>


            <TouchableWithoutFeedback onPress={() => { setModalVisible(true) }}>
                {Object.keys(file).length === 0 ?
                    (<View style={{
                        paddingLeft: 10,
                        width: "90%",
                        height: 200,
                        borderWidth: 2,
                        borderStyle: 'dotted',
                        borderColor: '#000',
                        borderRadius: 16,
                        alignSelf: "center",
                        justifyContent: "center",
                    }}>
                        <Text style={{ textAlign: "center" }}><Icon name="file-image-plus-outline" size={30} /></Text>
                        <Text style={{ textAlign: "center" }}>Select Image</Text>
                    </View>) :
                    (
                        <View>
                            <View style={styles.imageWrapper}>
                                <Image
                                    style={{ width: width / 1.2, height: height / 5, borderRadius: 10 }}
                                    source={{
                                        uri: file.assets[0].uri,
                                    }}
                                />
                            </View>
                            <View style={{ paddingTop: 30 }}>
                                <TouchableOpacity style={styles.subbutton} onPress={() => { console.log("Predict") }}>
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>Predict</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
            </TouchableWithoutFeedback>
        </View >
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginVertical: 10,
    },
    subbutton: {
        borderRadius: 10,
        width: 300,
        height: 40,
        backgroundColor: "#34B27B",
        alignItems: "center",
        justifyContent: "center"
    },
});