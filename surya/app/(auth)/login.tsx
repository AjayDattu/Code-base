import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { useSSO, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function login() {
  const { startSSOFlow } = useSSO();
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        // Store user session in AsyncStorage
        await AsyncStorage.setItem("userSession", createdSessionId);

        setActive({ session: createdSessionId });
        router.replace("/home");
      }
    } catch (error) {
      console.error("OAuth error:", error);
      setIsLoading(false);
    }
  };

  // Show loader while checking authentication
  if (isLoading) {
    return (
      <View style={styles.logoContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.illustration}
          source={require("@/assets/images/sign.png")}
        />
        <Text style={styles.appName}>surya</Text>
        <Text style={styles.tagline}>don't miss anything</Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logoImage}
        />
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
      >
        <Ionicons name="logo-google" size={24} color="#000" />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By continuing, you agree to our Terms and Privacy Policy
      </Text>
    </View>
  );
}
