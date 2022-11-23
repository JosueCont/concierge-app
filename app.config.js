const commonConfig = {
    name: "Staff Concierge",
    orientation: "portrait",
    icon: "./assets/icon_install.png",
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
        "**/*"
    ],
    splash: {
        image: "./assets/splash_logo.png",
        resizeMode: "cover",
        backgroundColor: "#ffffff"
    },
    notification: {
        iosDisplayInForeground: true
    },
    extra: {
        production: true,
        URL_KHONNECT: "https://khonnect.khor2.com/",
        URL_KHONNECT_DEV: "https://khonnect.hiumanlab.com/",
        KeySecret: "1LaNXFHqau-o8qH3BM7xBdZ9NPlQRCSyDWlcaWniLcQ",
        ClientId: "62a13e7eb7089b08990e3cd5",
        ClientId_DEV: "62a13e7eb7089b08990e3cd5",
        URL_PEOPLE: "https://demo.people-api.khorplus.com/",
        URL_PEOPLE_DEV: "https://demo.people-api.khorplus.com/",
        URL_QA: "https://nominaqa.api.people.hiumanlab.mx/"
    }
};

const ios = {
    bundleIdentifier: "com.hiumanlab.staffconcierge",
    supportsTablet: false,
    buildNumber: "5"
};

const android = {
    versionCode: 5,
    package: "com.hiumanlab.staffconcierge",
    useNextNotificationsApi: true,
    permissions: ["CAMERA_ROLL"],
    adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
    }
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