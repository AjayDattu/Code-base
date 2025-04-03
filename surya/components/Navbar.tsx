import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, FONT } from "@/constants/theme";

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const router = useRouter()
  // Handle loading state while Clerk loads user data
  if (!user) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <BlurView intensity={80} tint="light" style={styles.blurContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>surya</Text>
            <View style={styles.profileSkeleton} />
          </View>
        </BlurView>
      </View>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
    setProfileMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>surya</Text>

          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => setProfileMenuVisible(true)}
          >
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.firstName || "User"}</Text>
              <Text style={styles.userEmail} numberOfLines={1}>
                {user.primaryEmailAddress?.emailAddress ||
                  user.phoneNumbers?.[0]?.phoneNumber ||
                  ""}
              </Text>
            </View>

            {user.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileFallback}>
                <Text style={styles.profileFallbackText}>
                  {user.firstName?.charAt(0) || user.lastName?.charAt(0) || "U"}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </BlurView>

      {/* Profile Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={profileMenuVisible}
        onRequestClose={() => setProfileMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setProfileMenuVisible(false)}
        >
          <View
            style={[styles.profileMenu, { top: insets.top + 60, right: 16 }]}
          >
            <BlurView
              intensity={90}
              tint="light"
              style={styles.profileMenuBlur}
            >
              <View style={styles.profileMenuHeader}>
                {user.imageUrl ? (
                  <Image
                    source={{ uri: user.imageUrl }}
                    style={styles.menuProfileImage}
                  />
                ) : (
                  <View style={styles.menuProfileFallback}>
                    <Text style={styles.profileFallbackText}>
                      {user.firstName?.charAt(0) ||
                        user.lastName?.charAt(0) ||
                        "U"}
                    </Text>
                  </View>
                )}
                <View style={styles.menuUserInfo}>
                  <Text style={styles.menuUserName}>
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text style={styles.menuUserEmail} numberOfLines={1}>
                    {user.primaryEmailAddress?.emailAddress ||
                      user.phoneNumbers?.[0]?.phoneNumber ||
                      ""}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  // Handle profile navigation here
                  setProfileMenuVisible(false);
                }}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS?.darkGray || "#333"}
                />
                <Text style={styles.menuItemText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  // Handle settings navigation here
                  setProfileMenuVisible(false);
                }}
              >
                <Ionicons
                  name="settings-outline"
                  size={20}
                  color={COLORS?.darkGray || "#333"}
                />
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color={COLORS?.error || "#F44336"}
                />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  blurContainer: {
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(200, 200, 200, 0.3)",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: FONT?.bold || "System",
    color: COLORS?.primary || "#4CAF50",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    marginRight: 12,
    maxWidth: 150,
  },
  userName: {
    fontSize: 14,
    fontFamily: FONT?.medium || "System",
    color: COLORS?.darkGray || "#333",
  },
  userEmail: {
    fontSize: 12,
    fontFamily: FONT?.regular || "System",
    color: COLORS?.gray || "#666",
    opacity: 0.7,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS?.lightGray || "#eee",
  },
  profileFallback: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS?.primary || "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  profileFallbackText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: FONT?.medium || "System",
  },
  profileSkeleton: {
    width: 120,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(200, 200, 200, 0.2)",
  },

  // Profile Menu Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  profileMenu: {
    position: "absolute",
    width: 240,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  profileMenuBlur: {
    overflow: "hidden",
  },
  profileMenuHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(200, 200, 200, 0.3)",
  },
  menuProfileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS?.lightGray || "#eee",
  },
  menuProfileFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS?.primary || "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  menuUserInfo: {
    marginLeft: 12,
    flex: 1,
  },
  menuUserName: {
    fontSize: 16,
    fontFamily: FONT?.medium || "System",
    color: COLORS?.darkGray || "#333",
  },
  menuUserEmail: {
    fontSize: 12,
    fontFamily: FONT?.regular || "System",
    color: COLORS?.gray || "#666",
    marginTop: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: FONT?.regular || "System",
    color: COLORS?.darkGray || "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(200, 200, 200, 0.3)",
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  logoutButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: FONT?.medium || "System",
    color: "#F44336",
  },
});
