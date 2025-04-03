import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT } from "@/constants/theme";

// Initial route component for handling authentication flow
function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        if (!isLoaded) return;

        // Check if the user is already in a protected segment
        const inProtectedRoute = segments[0] === "(protected)";

        // Check if user is signed in with Clerk
        if (isSignedIn) {
          // User is authenticated, route to home if not already in protected route
          if (!inProtectedRoute) {
            router.replace("/home");
          }
          return;
        }

        // Clerk says user is not signed in, check AsyncStorage as fallback
        const userSession = await AsyncStorage.getItem("userSession");
        if (userSession) {
          // Found session in AsyncStorage, route to home
          router.replace("/home");
        } else if (inProtectedRoute) {
          // No session found but in protected route, redirect to login
          router.replace("/login");
        } else if (segments[0] !== "(auth)") {
          // Not in auth route, redirect to login
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // On error, default to login page
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, [isLoaded, isSignedIn, segments]);

  // Show loader while checking authentication
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Render stack navigator once authentication check is complete
  return <Stack screenOptions={{ headerShown: false }} />;
}
