import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthStackNavigationType, RootStackNavigationType } from '../../utils/types/NavigationTypes';
import { COLORS } from "../../utils/theme";

const { width, height } = Dimensions.get("window");

const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();

  return (
    <View style={styles.container}>
      {/* Vector Background */}
      <Image
        source={require("../../../assets/images/Vector.png")}
        style={styles.vectorBackground}
      />

      {/* House Illustration */}
      <Image
        source={require("../../../assets/images/signin_illustration.png")}
        style={styles.houseIllustration}
      />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      {/* Sign In text */}
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Circular Images */}
      <Image
        source={require("../../../assets/images/human1.png")}
        style={[styles.circle, styles.circleLeft]}
      />
      <Image
        source={require("../../../assets/images/human3.png")}
        style={[styles.circle, styles.circleRight]}
      />
      <Image
        source={require("../../../assets/images/human2.png")}
        style={[styles.circleCenter]}
      />

      {/* Tagline */}
      <Text style={styles.tagline}>
        Trusted pet care right{"\n"}around the corner
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.findCareButton} 
          onPress={() => {
            navigation.navigate("Location");
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.findCareButtonText}>Find Pet care</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.createAccountButton} 
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.createAccountButtonText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  vectorBackground: {
    position: "absolute",
    top: height * 0.20,
    width: width,
    height: height * 0.45,
    resizeMode: "contain",
    zIndex: 0,
  },
  
  houseIllustration: {
    position: "absolute",
    top: height * 0.15,
    width: width,
    height: height * 0.65,
    resizeMode: "contain",
    zIndex: 5,
    marginTop: height * 0.06,
  },
  logoContainer: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.01,
    alignItems: "center",
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: "contain",
  },
  appName: {
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: "500",
    marginTop: height * 0.006,
  },
  signInButton: {
    position: "absolute",
    top: height * 0.08,
    right: width * 0.05,
  },
  signInButtonText: {
    fontSize: Math.min(width * 0.035, 14),
    color: "#404348",
    fontWeight: "600",
  },
  circle: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    position: "absolute",
    zIndex: 3,
  },
  circleLeft: {
    top: height * 0.30,
    left: width * 0.15,
    zIndex: 3,
  },
  circleRight: {
    top: height * 0.30,
    right: width * 0.15,
    zIndex: 3,
    marginRight: width * 0.025,
  },
  circleCenter: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.14,
    top: height * 0.25,
    marginBottom: height * 0.95,
    zIndex: 3,
  },
  tagline: {
    position: "absolute",
    top: height * 0.57,
    textAlign: "center",
    fontFamily: 'Pacifico_400Regular',
    fontSize: Math.min(width * 0.1, 40),
    color: "#404348",
    zIndex: 4,
  },
  buttonContainer: {
    position: "absolute",
    bottom: height * 0.1,
    width: width * 0.8,
    gap: height * 0.02,
    zIndex: 20,
  },
  findCareButton: {
    backgroundColor: COLORS.Primary,
    paddingVertical: height * 0.017,
    borderRadius: width * 0.09,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  findCareButtonText: {
    color: "white",
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: "600",
    textAlign: "center",
  },
  createAccountButton: {
    backgroundColor: COLORS.ButtonPrimary,
    borderColor: "#a9a59f",
    borderWidth: 1,
    paddingVertical: height * 0.017,
    borderRadius: width * 0.09,
  },
  createAccountButtonText: {
    color: "#404348",
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: "600",
    textAlign: "center",
  },
});

export default SignInScreen;
