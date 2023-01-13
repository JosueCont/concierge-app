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
    URL_KHONNECT_DEV: "https://khonnect.khor2.com/",
    KeySecret: "KeQAranV2m9DnX4xy-HroaxPXNovIoElT6OXkyrwDOQ",
    ClientId: "612d0aac30976e8504806d92",
    ClientId_DEV: "612d0aac30976e8504806d92",
    URL_TENANT_VALIDATE:
    "https://iu.people-api.khorplus.com/setup/validate-tenant-code/",
    URL_PEOPLE: "people-api.khorplus.com",
    URL_PEOPLE_DEV: "people-api.khorplus.com",
    URL_QA: "https://iu.api.people.hiumanlab.mx/", 
    PROTOCOL: "https://",
    TENANT_DEFAULT: "demo"
  },
};

const ios = {
  bundleIdentifier: "com.hiumanlab.staffconcierge",
  supportsTablet: false,
  buildNumber: "5",
  infoPlist: {
    NSCameraUsageDescription:
      "Esta aplicación requiere el uso de la camara para escanear el QR.",
  },
};

const android = {
  versionCode: 5,
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
      version: "1.0.1",
      ios: ios,
    };
  } else if (process.env.APP_ENV === "android") {
    return {
      ...commonConfig,
      slug: "staffconcierge",
      version: "1.0.1",
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
