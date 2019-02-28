export const environment = {
    production: false,
    cloud_bucket:`istats-dev.appspot.com`,
    realtime_database_url:`https://smarthealthcare-160f0.firebaseio.com/`,
    serviceaccountkey:require(`./serviceKey.json`),
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

export const firebase_storage = {
    admin_images: `Istats/admin/images/`,
    admin_csv: 'Istats/admin/csv/',
    android_images: 'Istats/android/images/',
    android_core_images: 'IstatsAndroidCore/'
}

export const DBUsServer={
    host: "localhost",
    user: "root",
    password: "",
    database: "beproject" 
}

export const DBIndiaServer = {
    host: `sd`,
    user: 'dd',
    password: 'dd',
    database: 'dd'
}
