import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, Globe } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import useI18n from "@/utils/i18n";

export default function Settings() {
  const insets = useSafeAreaInsets();
  const { t, currentLanguage, changeLanguage, getAvailableLanguages } =
    useI18n();

  const languages = getAvailableLanguages();

  const handleLanguageSelect = (languageCode) => {
    const selectedLanguage = languages.find(
      (lang) => lang.code === languageCode,
    );
    Alert.alert(
      t("changeLanguage"),
      t("switchToLanguage", { language: selectedLanguage?.nativeName }),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("change"),
          onPress: () => changeLanguage(languageCode),
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 10,
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#333",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity>

          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {t("settings")}
          </Text>

          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Language Section */}
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Globe size={24} color="#fff" style={{ marginRight: 12 }} />
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {t("language")}
            </Text>
          </View>

          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              onPress={() => handleLanguageSelect(language.code)}
              style={{
                backgroundColor:
                  currentLanguage === language.code
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(255,255,255,0.05)",
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: currentLanguage === language.code ? 2 : 1,
                borderColor:
                  currentLanguage === language.code
                    ? "#fff"
                    : "rgba(255,255,255,0.1)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight:
                        currentLanguage === language.code ? "600" : "400",
                    }}
                  >
                    {language.nativeName}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      marginTop: 2,
                    }}
                  >
                    {language.name}
                  </Text>
                </View>

                {currentLanguage === language.code && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#fff",
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
