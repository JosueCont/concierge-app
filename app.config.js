const commonConfig = {
  name: "Staff Concierge",
  orientation: "portrait",
  icon: "./assets/icon_install.png",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  splash: {
    image: "./assets/splash_logo.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
  },
  notification: {
    iosDisplayInForeground: true,
  },
  extra: {
    production: true,
    URL_KHONNECT: "https://khonnect.khor2.com/",
    URL_KHONNECT_DEV: "https://api.khonnect.hiumanlab.com/",
    URL_TENANT_VALIDATE:
    "https://iu.people-api.khorplus.com/setup/validate-tenant-code/",
    URL_TENANT_VALIDATE_DEV: 
    "https://demo.api.people.hiumanlab.com/setup/validate-tenant-code/",
    URL_PEOPLE: "people-api.khorplus.com",
    URL_PEOPLE_DEV: "api.people.hiumanlab.mx",
    PROTOCOL: "https://",
    TENANT_DEFAULT: "demo",
    PRIVACY_NOTICE: 'https://www.grupohuman.com/aviso-privacidad',
    eas: {
      projectId: "332c662c-ee25-49b2-8e57-975397001082"
    }

  },
};

const ios = {
  bundleIdentifier: "com.hiumanlab.staffconcierge",
  supportsTablet: false,
  buildNumber: "8",
  infoPlist: {
    NSCameraUsageDescription:
      "Esta aplicación requiere el uso de la camara para escanear el QR.",
  },
};

const android = {
  versionCode: 8,
  package: "com.hiumanlab.staffconcierge",
  useNextNotificationsApi: true,
  permissions: ["CAMERA_ROLL", "CAMERA"],
  adaptiveIcon: {
    foregroundImage: "./assets/adaptive-icon.png",
    backgroundColor: "#FFFFFF",
  },
};

module.exports = () => {
  if (process.env.APP_ENV === "ios") {
    return {
      ...commonConfig,
      slug: "staffconcierge",
      version: "1.0.4",
      ios: ios,
    };
  } else if (process.env.APP_ENV === "android") {
    return {
      ...commonConfig,
      slug: "staffconcierge",
      version: "1.0.4",
      android: android,
    };
  } else if (process.env.APP_ENV === "expo") {
    return {
      ...commonConfig,
      slug: "staffconcierge-dev",
      version: "1.0.0",
      ios: ios,
      android: android,
    };
  }
};
