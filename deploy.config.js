
<!DOCTYPE html><html lang=en><head><meta charset=UTF-8><title>學測.大平台</title>
<meta http-equiv='X-UA-Compatible' content='IE=edge'>
<meta name='description' content='學測.大平台。轉換歷屆學測分數的小幫手'>
<link rel='canonical' href='https://sat-transtable.firebaseapp.com/'>
<link rel='manifest' href='manifest.json'>
<meta name='mobile-web-app-capable' content='yes'>
<meta name='apple-mobile-web-app-capable' content='yes'>
<meta name='application-name' content='學測.大平台'>
<meta name='apple-mobile-web-app-status-bar-style' content='black'>
<meta name='apple-mobile-web-app-title' content='學測.大平台'>
<link rel="icon" href="./src/favicon.ico" type="image/x-icon"/>
<link rel=apple-touch-icon href=./src/favicon.ico>
<meta name='msapplication-TileImage' content='./src/image/sat144x144.png'>
<meta name='msapplication-TileColor' content='#2196F3'>
<meta name='theme-color' content='#2196F3'>
<meta property='og:title' content='學測.大平台'>
<meta property='og:type' content='website'>
<meta property='og:image' content='https://sat-transtable.firebaseapp.com/src/image/sat144x144.png'>
<meta property='og:url' content='https://sat-transtable.firebaseapp.com/'>
<meta property='og:description' content='學測.大平台。轉換歷屆學測分數的小幫手'>
<meta name='twitter:card' content='summary'>
<meta name='twitter:url' content='https://sat-transtable.firebaseapp.com/'>
<meta name='twitter:title' content='學測.大平台'>
<meta name='twitter:description' content='學測.大平台。轉換歷屆學測分數的小幫手'>
<meta name='twitter:image' content='https://sat-transtable.firebaseapp.com/src/image/sat144x144.png'>
<meta name='twitter:creator' content=''>
<link rel="icon" href="./src/favicon.ico" type="image/x-icon"/>
<link rel="shortcut icon" href="./src/favicon.ico" type="image/x-icon"/>


{
  "rules": {
    ".read": "auth != null",
    "users": {
      "$uid": {
        ".write": "$uid === auth.uid"
      }
    },
    "table": {
      ".write": false
    }
  }
}