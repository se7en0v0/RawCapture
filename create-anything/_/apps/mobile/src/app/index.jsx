import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Camera,
  RotateCcw,
  X,
  FlipHorizontal,
  Settings,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import useI18n from "@/utils/i18n";

export default function CameraApp() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const insets = useSafeAreaInsets();
  const { t, isLoading } = useI18n();

  if (isLoading || !permission) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <StatusBar style="light" />
        <Camera size={64} color="#fff" style={{ marginBottom: 20 }} />
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          {t("cameraPermissionTitle")}
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 25,
          }}
        >
          <Text style={{ color: "#000", fontSize: 16, fontWeight: "600" }}>
            {t("grantPermission")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function takePicture() {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        skipProcessing: true, // This prevents automatic enhancements
      });
      setCapturedPhoto(photo);
    } catch (error) {
      console.error(t("failedToTakePhoto"), error);
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function retakePhoto() {
    setCapturedPhoto(null);
  }

  if (capturedPhoto) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <StatusBar style="light" />
        <Image
          source={{ uri: capturedPhoto.uri }}
          style={{ flex: 1 }}
          resizeMode="contain"
        />

        {/* Controls overlay */}
        <View
          style={{
            position: "absolute",
            top: insets.top + 20,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={retakePhoto}
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <X size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: insets.bottom + 40,
            left: 0,
            right: 0,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={retakePhoto}
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 40,
              paddingVertical: 15,
              borderRadius: 25,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <RotateCcw size={20} color="#000" />
            <Text style={{ color: "#000", fontSize: 16, fontWeight: "600" }}>
              {t("retakePhoto")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar style="light" />
      <CameraView style={{ flex: 1 }} facing={facing} ref={cameraRef}>
        {/* Top controls */}
        <View
          style={{
            position: "absolute",
            top: insets.top + 20,
            left: 0,
            right: 0,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 14, fontWeight: "500" }}>
              {t("rawPhotoMode")}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/settings")}
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              width: 44,
              height: 44,
              borderRadius: 22,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Settings size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Bottom controls */}
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom + 40,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: 40,
          }}
        >
          {/* Flip camera button */}
          <TouchableOpacity
            onPress={toggleCameraFacing}
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlipHorizontal size={28} color="#fff" />
          </TouchableOpacity>

          {/* Capture button */}
          <TouchableOpacity
            onPress={takePicture}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "rgba(255,255,255,0.3)",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 4,
              borderColor: "#fff",
            }}
          >
            <View
              style={{
                width: 68,
                height: 68,
                borderRadius: 34,
                backgroundColor: "#fff",
              }}
            />
          </TouchableOpacity>

          {/* Spacer for symmetry */}
          <View style={{ width: 60 }} />
        </View>
      </CameraView>
    </View>
  );
}
