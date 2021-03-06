---
layout: leaflet
title: Chargement de la configuration
level: 2
order: 000100
api: leaflet
---

# Chargement de la configuration associée à votre clé de contrat

## Présentation générale

Afin d'utiliser certaines fonctionnalités de l'extension Leaflet (notamment l'ajout simple de couche WMS ou WMTS), il est nécessaire de charger préalablement les paramètres de configuration associés à votre clé de contrat.

Pour cela, deux méthodes se présentent à l'utilisateur :
1. Récupération automatique de la configuration au chargement de la page, par le biais de la balise \<*script*\> de chargement de l'extension Leaflet.
2. Appel au service d'auto-configuration via la bibliothèque d'accès (embarquée dans l'Extension Leaflet)

## Méthode 1 : Récupération de la configuration au chargement de la page par l'Extension Leaflet

C'est la méthode que nous vous conseillons, car elle est plus simple à mettre en oeuvre.

### Mise en oeuvre

L'extension Leaflet propose de récupérer, lors du chargement de la page, la configuration associée à la clé de contrat de l'utilisateur. Pour cela, il lui suffit simplement de renseigner sa clé dans la balise de chargement du fichier JavaScript contenant l'extension, de la manière suivante :

``` html
<script src="GpPluginLeaflet.js" data-key="CLEAPI"></script>
```

De cette manière, la configuration sera récupérée via le service d'auto-configuration des API du Géoportail.
L'utilisateur peut aussi spécifier une URL vers un fichier d'auto-configuration (chemin relatif vers un fichier en local par exemple) :

``` html
<script src="GpPluginLeaflet.js" data-url="AutoConf.json"></script>
```

Les paramètres possibles sont les suivants :

Paramètre | Type | Opt. | Valeur
- |-|-|-|
data-key  | String  | Optionnel   | Clé d'accès à la plateforme Géoportail (prise sur [professionnels.ign.fr](http://professionnels.ign.fr/api-web) )
data-url  | String  | Optionnel     | URL d'accès au service d'autoconfiguration (contenant la clé de contrat), ou chemin relatif vers un fichier d'auto-configuration stocké en local.
data-timeout | Object | Optionnel   | Délai d’attente maximal (en ms) de la réponse du service d'auto-configuration (à partir de l’envoi de la requête). Par défaut, aucun timeOut n’est pris en compte (timeOut= 0).

Remarque : si aucun des paramètres n'est ajouté à la balise \<*script*\>, l'extension Leaflet se chargera normalement, mais la configuration ne sera pas récupérée : il sera alors nécessaire de la charger d'une autre manière, par exemple en utilisant la méthode 2 ci-dessous.

### Exemples d'utilisation

Récupération de la configuration au chargement de la page, en passant par le service d'auto-configuration des API du Géoportail :

``` html
<html>
    <head>
        <!-- Library Leaflet -->
        <link rel="stylesheet" href="leaflet.css" />
        <script src="leaflet.js"></script>
        <!-- Extension Géoportail pour Leaflet -->
        <script src="GpPluginLeaflet.js" data-key="CLEAPI" data-timeout="10000"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                // utilisation de l'extension Géoportail pour Leaflet
            }
        </script>
    </body>
</html>
```

Récupération de la configuration au chargement de la page, à partir d'un fichier local :

``` html
<html>
    <head>
        <!-- Library Leaflet -->
        <link rel="stylesheet" href="leaflet.css" />
        <script src="leaflet.js"></script>
        <!-- Extension Géoportail pour Leaflet -->
        <script src="GpPluginLeaflet.js" data-url="AutoConf.xml"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                // utilisation de l'extension Géoportail pour Leaflet
            }
        </script>
    </body>
</html>
```


## Méthode 2 : Appel au service d'auto-configuration via la bibliothèque d'accès

Cette méthode est une alternative à la précédente : vous utilisez une fonction proposée par la bibliothèque d'accès pour appeler le service d'auto-configuration du Géoportail. 

### Mise en oeuvre

La [Bibliothèque d'accès](./../bibacces/presentation.html) aux services de la plateforme du Géoportail, embarquée dans l'Extension Leaflet, propose une fonction d'accès au service d'autoconfiguration du Géoportail : 

``` javascript
Gp.Services.getConfig(options)
```

Vous pouvez choisir d'utiliser directement cette fonction dans votre script, avant d'utiliser les fonctionnalités de l'extension (ajout de couche simplifié, etc.) qui seront alors conditionnées à l'exécution de la fonction de rappel onSuccess passée en paramètres de Gp.Services.getConfig().

Pour plus de détails, consulter la [page de description de cette fonctionnalité](./../bibacces/dd_services_autoconf.html).


### Exemple d'utilisation

Utilisation simple de la fonction *Gp.Services.getConfig* :

``` html
<html>
    <head>
        <!-- Library Leaflet -->
        <link rel="stylesheet" href="leaflet.css" />
        <script src="leaflet.js"></script>
        <!-- Extension Géoportail pour Leaflet -->
        <script src="GpPluginLeaflet.js"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                Gp.Services.getConfig({
                    apiKey: 'CLEAPI',
                    onSuccess: function (response) {
                        // utilisation de l'extension Géoportail pour Leaflet
                    }
                });
            }
        </script>
    </body>
</html>
```
