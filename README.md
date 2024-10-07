# Gestion Recette API

Cette API permet de gérer des recettes avec des opérations de création, de lecture, de mise à jour et de suppression (CRUD).

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [MySQL](https://dev.mysql.com/downloads/installer/) (version 5.7 ou supérieure)
- Un outil de gestion de requêtes API comme [Insomnia](https://insomnia.rest/download) .
- [Docker](https://www.docker.com/products/docker-desktop/)

## Étapes d'installation

- Clonez le dépôt :

```
git clone https://github.com/Ehya-Ag/Gestion_API_RESTful.git
```

## Accédez au répertoire du projet :

```
cd Gestion_API_RESTful
```

## Installez les dépendances :

```
npm install
```

## Endpoints de l'API

### 1. `GET /api/recettes`

Récupère la liste de toutes les recettes.

**Réponse :**

- 200 OK

```
[
    {
        "id": 1,
        "titre": "Recette 1",
        "ingredients": "Ingrédient 1, Ingrédient 2",
        "type": "entrée"
    },
]
```

## 2. POST /api/recettes

Crée une nouvelle recette.

- Corps de la requête :

```
{
    "titre": "Recette 2",
    "ingredients": "Ingrédient A, Ingrédient B",
    "type": "dessert"
}
```

Réponse :

201

```
{
    "id": 2,
    "titre": "Recette 2",
    "ingredients": "Ingrédient A, Ingrédient B",
    "type": "plat"
}
```

## 3. GET /api/recettes/{id}

Récupère les détails d'une recette par son ID.

- Réponse :

200 OK

```
{
    "id": 1,
    "titre": "Recette 1",
    "ingredients": "Ingrédient 1, Ingrédient 2",
    "type": "plat"
}
```

404 Not Found (si la recette n'existe pas)

## Configurez les paramètres de connexion à la base de données dans le fichier de configuration.

- Configurer l'environnement
  Renommer le fichier .env.exemple en .env à la racine du projet et ajoutez les configurations nécessaires (par exemple, pour la base de données).

- Exemple .env :

```
DB_HOST=localhost
MYSQL_ROOT_PASSWORD=votreMotDePasse
DB_DATABASE=votreBaseDeDonnée
DB_USER=votreNomUtilisateur
DB_PASSWORD=votreMotDePasse
PORT=3000
```

- Démarrer le projet

```
npm start
```

L'API sera accessible à [http://localhost:3000](http://localhost:3000)

- Exécution des tests unitaires
  Assurez-vous que jasmine un framework de test est installé :

Lancez les tests avec la commande suivante :

```
npm test
```

## Tests ESLint et formater avec Prettier

- Pour s'assurer que le code respecte les standards de style définis par ESLint, vous pouvez exécuter les tests ESLint :

```
npm run lint
```

- Corriger automatiquement les erreurs avec ESLint

```
npm run lint:fix
```

- Formatage du commande

```
npm run format
```

# Docker

## Construction et lancement de l'image Docker

- Pour construire l'image Docker, exécutez :

```
docker-compose up --build
```


L'API sera accessible à http://localhost:3000.

## Auteur

Projet réalisé par [Ehya Agg](https://github.com/Ehya-Ag)
