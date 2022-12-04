Une application utilisée pour avoir accès à YouTube et avoir accès à ses vidéos en fonction des préférences de l'utilisateur et commenter sur une vidéo, construite avec React, Node js , Express et CSS. L'état du projet

Ce projet est actuellement en développement. Les utilisateurs peuvent se connecter via leurs comptes Google. Certaines fonctionnalitées sont encore en développement. Instructions d'installation et de configuration

Clonez ce référentiel. Vous aurez besoin node et npm installé globalement sur votre machine.

Installation:

npm install

Pour démarrer l'application :

npm run dev

Vous aurez besoin au préalable de créer un projet sur Google Console afin d'obtenir les clés necessaire pour que l'application tourne. L'exemple des clés se trouve dans le fichier .env.sample.

Si vous souhaitez faire l'authentification avec Firebase , référer vous au fichier .env.sample afin de compléter toutes les clés nécessaires : VITE_APP_APIKEY= Api Key VITE_APP_APPID= fournie par firease VITE_APP_MESSAGE_SENDER_ID = fournie par firease VITE_APP_STORAGE_BUCKET = fournie par firease VITE_APP_AUTH_DOMAIN = fournie par firease VITE_APP_PROJECT_ID = fournie par firease Reflexion

Il s'agit d'un projet de 3 semaines construit au cours de ma formation au sein de la Kinshasa Digital Academy. Les objectifs du projet comprenaient l'utilisation des technologies apprises jusqu'à présent et la familiarisation avec la documentation des nouvelles fonctionnalités.

L'authentification était l'un des principaux défis auxquels j'ai été confronté. Cela m'a amené à passer quelques jours sur un pic de recherche sur OAuth, Auth0 et l'authentification à deux facteurs à l'aide de Firebase ou d'autres tiers. En raison des contraintes de temps du projet, j'ai dû tabler l'authentification et me concentrer davantage sur la visualisation des données à partir de parties de l'API qui n'étaient pas réservées aux utilisateurs authentifiés.

En fin de compte, les technologies mises en œuvre dans ce projet sont React, React-Router-Dom v6, Firebase, et une quantité importante d'autres dépendances React tel que : Moment, React-Show-More-Text, React-Numeral,.....