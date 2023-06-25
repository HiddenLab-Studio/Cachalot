# Cachalot.
Projet de développement logiciel de fin de 3ème année.  
Par Aurélien ROGÉ, Lucas HABOUSSI, Antoine MIGNIEN, Guillaume LEROY et Maxime BONNEL

___

## Comment redéployer notre projet ?

Il y a deux serveurs différents et deux installation npm différentes :

1. Pour l'installation du serveur côté **front**:
```
cd Cachalot
npm i
```

2. Pour l'installation du serveur côté **back** :
```
cd server
npm i
```

3. Puis on lance nos deux serveurs
4. Serveur front :
   Ouvrir un terminal à la racine du projet
   ```
   cd Cachalot
   npm run dev
   ```
5. Serveur back :
   Ouvrir un terminal à la racine du projet
   ```
   cd server
   ```
   Puis effectuer une des deux options suivantes:

     
5.1 **Soit** en utilisant **Node**
   ```
   cd src
   node app
   ```
5.2 **Soit** en utilisant **Nodemon**
   ```
   nodemon app
   ```
