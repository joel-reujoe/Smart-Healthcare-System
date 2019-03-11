"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false,
    cloud_bucket: `istats-dev.appspot.com`,
    realtime_database_url: `https://smarthealthcare-160f0.firebaseio.com/`,
    serviceaccountkey: require(`./serviceKey.json`),
    // serviceaccountkeyDriver:require(`./foodiloo-driver-firebase-adminsdk.json`),
    // serviceaccountkeyRestaurant:require(`./foodiloo-restaurant-firebase-adminsdk.json`),
    firebaseConfig: {
        apiKey: "AIzaSyB0ga6ikjDvGADhhd80r2Xeiaep3K22H-M",
        authDomain: "smarthealthcare-160f0.firebaseapp.com",
        databaseURL: "https://istats-dev.firebaseio.com",
        projectId: "smarthealthcare-160f0",
        storageBucket: "smarthealthcare-160f0.appspot.com",
        messagingSenderId: "488465131798"
    }
};
exports.firebase_storage = {
    admin_images: `Istats/admin/images/`,
    admin_csv: 'Istats/admin/csv/',
    android_images: 'Istats/android/images/',
    android_core_images: 'IstatsAndroidCore/'
};
exports.DBUsServer = {
    host: "localhost",
    user: "root",
    password: "",
    database: "beproject"
};
exports.DBIndiaServer = {
    host: `localhost`,
    user: 'id8937355_joel_reujoe',
    password: '7709776820',
    database: 'id8937355_beproject',
};
//# sourceMappingURL=environment.js.map