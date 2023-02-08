import React, { useState,useContext } from "react";
import { TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import { UserContext } from "../../../App";

//Validation
import { Formik } from "formik";
import * as yup from "yup";

function Login({ navigation }) {

    const [hidePass, setHidePass] = useState([true, false]);
    const [fonticon, setfonticon] = useState(["eye", "eye-slash"]);
    const [passcount, setpasscount] = useState(0);
    const [error, seterror] = useState("");

    const { setloggedIn } = useContext(UserContext);

    const Loginfun = (val) => {

        fetch('http://192.168.244.26:3000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: val.email,
                password: val.password,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.message);
                if (responseJson.message === 'Success') {
                    console.log("Success");
                    setloggedIn(true);
                } else {
                    console.log("error");
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.headingtext}>Welcome back</Text>
                    <Text style={styles.subtext}>Sign in to your account</Text>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => { Loginfun(values) }}
                        validationSchema={yup.object().shape({
                            email: yup
                                .string()
                                .email()
                                .required('Email id is required'),
                            password: yup
                                .string()
                                .required('Password is required'),
                        })}
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                            <View>
                                <View>
                                    <Text style={styles.labletext}>Email</Text>
                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        onBlur={() => setFieldTouched('email')}
                                        value={values.email}
                                        style={styles.input}
                                        placeholder="you@example.com"
                                        placeholderTextColor="#949392" />
                                    {touched.email && errors.email &&
                                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
                                    }
                                </View>
                                <View>
                                    <Text style={styles.labletext}>Password</Text>
                                    <View>
                                        <TextInput
                                            onChangeText={handleChange('password')}
                                            onBlur={() => setFieldTouched('password')}
                                            value={values.password}
                                            placeholderTextColor="#949392"
                                            style={styles.input}
                                            placeholder="••••••••"
                                            secureTextEntry={hidePass[passcount % 2]} />
                                        <Text style={{ position: 'absolute', left: 260, top: 9 }} onPress={(e) => { setpasscount(passcount + 1) }}><Icon name={fonticon[passcount % 2]} size={20} color="black" /></Text>
                                        {touched.password && errors.password &&
                                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                                        }
                                    </View>
                                </View>
                                {error ? <Text style={{ fontSize: 15, color: '#FF0D10', textAlign: "center", top: 10 }}>{error}</Text> : ""}
                                <View style={{ paddingTop: 30 }}>
                                    <TouchableOpacity style={styles.button} onPress={handleSubmit}
                                        disabled={!isValid}>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 25 }}>
                                    <Text style={{ color: "#7E7E7E" }}>
                                        Don't have an account ?{" "}
                                    </Text>
                                    <Text style={{ color: "#949392", textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Signup')}>
                                        Sign Up Now
                                    </Text>
                                </View> */}
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 40,
        backgroundColor: "#FFFFFF07",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: "#707070",
        color: "black",
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 16,
    },
    button: {
        borderRadius: 10,
        width: 300,
        height: 40,
        backgroundColor: "#34B27B",
        alignItems: "center",
        justifyContent: "center"
    },
    headingtext: {
        color: "black",
        fontSize: 30,
        fontWeight: "bold"
    },
    subtext: {
        color: "#696868",
        fontSize: 15,
        paddingTop: 3
    },
    labletext: {
        color: "#696868",
        fontSize: 15,
        paddingTop: 25,
        paddingBottom: 5
    },
    container: {
        paddingLeft: "12%",
        top: "25%"
    }
});

export default Login;