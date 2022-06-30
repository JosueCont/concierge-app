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
        production: false,
        URL_KHONNECT: "https://khonnect.hiumanlab.com/",
        URL_KHONNECT_DEV: "https://khonnect.hiumanlab.com/",
        KeySecret: "1LaNXFHqau-o8qH3BM7xBdZ9NPlQRCSyDWlcaWniLcQ",
        ClientId: "5fa42a1ca6f5f821bbe7fbea",
        ClientId_DEV: "5fa42a1ca6f5f821bbe7fbea",
        URL_PEOPLE: "https://gape.people-api.khorplus.com/",
        URL_PEOPLE_DEV: "http://demo.api.people.hiumanlab.com/"
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