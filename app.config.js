import {commonConfig} from "./eas/easJson";

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