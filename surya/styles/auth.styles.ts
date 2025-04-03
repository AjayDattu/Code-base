import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT } from "@/constants/theme";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: height * 0.05,
        display:"flex",
        padding:20,
        position:"relative"
    },
    appName: {
        fontFamily: FONT.bold,
        fontSize: 35,
        color: COLORS.primary,
        marginTop: 30
    },
    tagline: {
        fontFamily: FONT.regular,
        fontSize: 16,
        color: COLORS.gray,
        marginTop: 5,
    },
    illustrationContainer: {
        height: height * 0.35,
        width: width * 0.8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: height * 0.05,
    },
    illustration: {
        width: 90,
        height: 90,
        position:"absolute",

    },
    googleButton: {
        flexDirection: "row",
        gap:10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        width: width * 0.8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.lightGray,
        borderRadius: 12,
        paddingHorizontal: 15,
        width: width * 0.8,
        height: 55,
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontFamily: FONT.regular,
        fontSize: 16,
        color: COLORS.darkGray,
    },
    phoneButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        width: width * 0.8,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        fontFamily: FONT.medium,
        fontSize: 16,
        color: "#000000",
        textAlign: "center",
    },
    verificationText: {
        fontFamily: FONT.medium,
        fontSize: 16,
        color: COLORS.darkGray,
        marginBottom: 20,
        textAlign: "center",
    },
    termsText: {
        fontFamily: FONT.regular,
        fontSize: 12,
        color: COLORS.gray,
        textAlign: "center",
        position: "absolute",
        bottom: height * 0.05,
        width: "100%",
    },
    logoImage: {
        width: 400,
        height: 400,
        resizeMode: "contain",
    },
});