export const commonConfig = {
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
        URL_KHONNECT: "https://khonnect.khor2.com",
        URL_KHONNECT_DEV: "https://khonnect.khor2.com",
        KeySecret: "9HMn_qvOYcb6K__aG-J0dVAZ8zg-MZFP7fFsELpJL9A",
        ClientId: "612d0a8630976e8504806d91",
        ClientId_DEV: "612d0a8630976e8504806d91",
        URL_PEOPLE: "https://demo.people-api.khorplus.com",
        URL_PEOPLE_DEV: "https://demo.people-api.khorplus.com"
    }
};