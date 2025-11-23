import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const translations = {
  en: {
    // Permission screen
    cameraPermissionTitle: "We need camera permission to take unedited photos",
    grantPermission: "Grant Permission",

    // Camera interface
    rawPhotoMode: "Raw Photo Mode",
    retakePhoto: "Retake Photo",

    // Settings
    settings: "Settings",
    language: "Language",
    changeLanguage: "Change Language",
    cancel: "Cancel",
    change: "Change",
    switchToLanguage: "Switch to {language}?",

    // Errors
    failedToTakePhoto: "Failed to take picture",
  },
  es: {
    // Permission screen
    cameraPermissionTitle:
      "Necesitamos permiso de cámara para tomar fotos sin editar",
    grantPermission: "Otorgar Permiso",

    // Camera interface
    rawPhotoMode: "Modo Foto Raw",
    retakePhoto: "Tomar Otra Foto",

    // Settings
    settings: "Configuración",
    language: "Idioma",
    changeLanguage: "Cambiar Idioma",
    cancel: "Cancelar",
    change: "Cambiar",
    switchToLanguage: "¿Cambiar a {language}?",

    // Errors
    failedToTakePhoto: "Error al tomar la foto",
  },
  fr: {
    // Permission screen
    cameraPermissionTitle:
      "Nous avons besoin de la permission caméra pour prendre des photos non modifiées",
    grantPermission: "Accorder la Permission",

    // Camera interface
    rawPhotoMode: "Mode Photo Brute",
    retakePhoto: "Reprendre Photo",

    // Settings
    settings: "Paramètres",
    language: "Langue",
    changeLanguage: "Changer de Langue",
    cancel: "Annuler",
    change: "Changer",
    switchToLanguage: "Passer à {language}?",

    // Errors
    failedToTakePhoto: "Échec de la prise de photo",
  },
  de: {
    // Permission screen
    cameraPermissionTitle:
      "Wir benötigen Kamera-Berechtigung für unbearbeitete Fotos",
    grantPermission: "Berechtigung Erteilen",

    // Camera interface
    rawPhotoMode: "Raw-Foto-Modus",
    retakePhoto: "Foto Wiederholen",

    // Settings
    settings: "Einstellungen",
    language: "Sprache",
    changeLanguage: "Sprache Ändern",
    cancel: "Abbrechen",
    change: "Ändern",
    switchToLanguage: "Zu {language} wechseln?",

    // Errors
    failedToTakePhoto: "Foto aufnehmen fehlgeschlagen",
  },
  it: {
    // Permission screen
    cameraPermissionTitle:
      "Abbiamo bisogno del permesso della fotocamera per scattare foto non modificate",
    grantPermission: "Concedi Permesso",

    // Camera interface
    rawPhotoMode: "Modalità Foto Raw",
    retakePhoto: "Rifai Foto",

    // Settings
    settings: "Impostazioni",
    language: "Lingua",
    changeLanguage: "Cambia Lingua",
    cancel: "Annulla",
    change: "Cambia",
    switchToLanguage: "Passare a {language}?",

    // Errors
    failedToTakePhoto: "Impossibile scattare la foto",
  },
  pt: {
    // Permission screen
    cameraPermissionTitle:
      "Precisamos de permissão da câmera para tirar fotos não editadas",
    grantPermission: "Conceder Permissão",

    // Camera interface
    rawPhotoMode: "Modo Foto Raw",
    retakePhoto: "Tirar Outra Foto",

    // Settings
    settings: "Configurações",
    language: "Idioma",
    changeLanguage: "Alterar Idioma",
    cancel: "Cancelar",
    change: "Alterar",
    switchToLanguage: "Mudar para {language}?",

    // Errors
    failedToTakePhoto: "Falha ao tirar a foto",
  },
  zh: {
    // Permission screen
    cameraPermissionTitle: "我们需要相机权限来拍摄未经编辑的照片",
    grantPermission: "授予权限",

    // Camera interface
    rawPhotoMode: "原始照片模式",
    retakePhoto: "重新拍摄",

    // Settings
    settings: "设置",
    language: "语言",
    changeLanguage: "更改语言",
    cancel: "取消",
    change: "更改",
    switchToLanguage: "切换到{language}?",

    // Errors
    failedToTakePhoto: "拍照失败",
  },
  ja: {
    // Permission screen
    cameraPermissionTitle: "未編集の写真を撮るためにカメラの許可が必要です",
    grantPermission: "許可を与える",

    // Camera interface
    rawPhotoMode: "Raw写真モード",
    retakePhoto: "写真を撮り直す",

    // Settings
    settings: "設定",
    language: "言語",
    changeLanguage: "言語を変更",
    cancel: "キャンセル",
    change: "変更",
    switchToLanguage: "{language}に切り替えますか?",

    // Errors
    failedToTakePhoto: "写真の撮影に失敗しました",
  },
  ko: {
    // Permission screen
    cameraPermissionTitle:
      "편집되지 않은 사진을 찍기 위해 카메라 권한이 필요합니다",
    grantPermission: "권한 부여",

    // Camera interface
    rawPhotoMode: "Raw 사진 모드",
    retakePhoto: "다시 촬영",

    // Settings
    settings: "설정",
    language: "언어",
    changeLanguage: "언어 변경",
    cancel: "취소",
    change: "변경",
    switchToLanguage: "{language}로 전환하시겠습니까?",

    // Errors
    failedToTakePhoto: "사진 촬영에 실패했습니다",
  },
  ru: {
    // Permission screen
    cameraPermissionTitle:
      "Нам нужно разрешение камеры для съемки необработанных фотографий",
    grantPermission: "Предоставить Разрешение",

    // Camera interface
    rawPhotoMode: "Режим Raw Фото",
    retakePhoto: "Переснять Фото",

    // Settings
    settings: "Настройки",
    language: "Язык",
    changeLanguage: "Изменить Язык",
    cancel: "Отмена",
    change: "Изменить",
    switchToLanguage: "Переключить на {language}?",

    // Errors
    failedToTakePhoto: "Не удалось сделать снимок",
  },
  ar: {
    // Permission screen
    cameraPermissionTitle: "نحتاج إذن الكاميرا لالتقاط صور غير محررة",
    grantPermission: "منح الإذن",

    // Camera interface
    rawPhotoMode: "وضع الصورة الخام",
    retakePhoto: "إعادة التقاط الصورة",

    // Settings
    settings: "الإعدادات",
    language: "اللغة",
    changeLanguage: "تغيير اللغة",
    cancel: "إلغاء",
    change: "تغيير",
    switchToLanguage: "التبديل إلى {language}؟",

    // Errors
    failedToTakePhoto: "فشل في التقاط الصورة",
  },
};

const STORAGE_KEY = "@camera_app_language";

function useI18n() {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      // Try to load saved language
      const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedLanguage && translations[savedLanguage]) {
        setCurrentLanguage(savedLanguage);
      } else {
        // Use device locale as fallback if available
        const systemLocale = Constants.locale || "en-US";
        const languageCode = systemLocale.split("-")[0].toLowerCase();

        if (translations[languageCode]) {
          setCurrentLanguage(languageCode);
        } else {
          setCurrentLanguage("en"); // Default to English
        }
      }
    } catch (error) {
      console.error("Failed to load language:", error);
      setCurrentLanguage("en");
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (languageCode) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, languageCode);
      } catch (error) {
        console.error("Failed to save language:", error);
      }
    }
  };

  const t = (key, replacements = {}) => {
    let text =
      translations[currentLanguage]?.[key] || translations.en[key] || key;

    // Simple template replacement
    Object.keys(replacements).forEach((placeholder) => {
      text = text.replace(`{${placeholder}}`, replacements[placeholder]);
    });

    return text;
  };

  const getAvailableLanguages = () => {
    return [
      { code: "en", name: "English", nativeName: "English" },
      { code: "es", name: "Spanish", nativeName: "Español" },
      { code: "fr", name: "French", nativeName: "Français" },
      { code: "de", name: "German", nativeName: "Deutsch" },
      { code: "it", name: "Italian", nativeName: "Italiano" },
      { code: "pt", name: "Portuguese", nativeName: "Português" },
      { code: "zh", name: "Chinese", nativeName: "中文" },
      { code: "ja", name: "Japanese", nativeName: "日本語" },
      { code: "ko", name: "Korean", nativeName: "한국어" },
      { code: "ru", name: "Russian", nativeName: "Русский" },
      { code: "ar", name: "Arabic", nativeName: "العربية" },
    ];
  };

  return {
    t,
    currentLanguage,
    changeLanguage,
    getAvailableLanguages,
    isLoading,
  };
}

export default useI18n;
