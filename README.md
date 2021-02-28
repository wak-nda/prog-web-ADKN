# Programmation web (Server Side ~ Client Side) 2020-2021 - Polytech Nice-Sophia
## Authors: **Team ADKN**
  * AINADOU Florian
  * DJEKINOU Paul-Marie
  * KOFFI Paul
  * NABAGOU Djotiham

## Context of the project
As part of the implementation of web technologies learned during web programming (client side & server side) at Polyech Nice-Sophia, 
we have implemented an application to show the data collected on COVID-19 **only in France** since the appearance of the epidemic. 
To do this, we used official and free-to-use hospital data from the French government. 
These data can be found [here](https://www.data.gouv.fr/fr/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19).

## Implemented features
**1- Visualisation :**\
Nous avon implémenté 4 types de visualisation :
* **Un résumé en chiffres** (Voir figure suivante - partie 1) permettant d'avoir un aperçu rapide des chiffres clés de l'épidémie.
* **Une carte de la France** (Voir figure suivante - partie 2) qui permet d'avoir un visuel sur les départements et le nombre de cas relevés dans chaque département.\

  
  <p align="center">
        <img src="./resources/architecture.jpg"/>
    </p>

## Project architecture

## How to use this repository ?
* The `main` branch (the default branch) contains the latest stable version of the system.
* The `develop` branch represents the system under development in parallel with other development branches specific to functionalities or relating to the various assigned tasks.
    * Issues can be created using the [Github ticket system](https://github.com/wak-nda/prog-web-ADKN/issues)

### Project cloning
1. Perform a classic clone of the project by making ```git clone https://github.com/wak-nda/prog-web-ADKN.git``` or by getting the zip from this page.
2. By default, you are on the Main branch, otherwise switch to Main.
3. At the root of the project are the [frontend](./frontend) in React and the [backend](./backend) in Node JS.

### Compilation & Execution
**1- Run online**

The developed website has been hosted on a server and can be viewed at this address: [Covid Tracking](http://paulkoffi.fr). The identifiers to connect are:
* Email : ``pkoffi5@gmail.com``
* Password : ``paul``

**2- Run locally**

* Backend (Node JS)
  * Move to the backend directory located at the root of the project
  * Run the `npm install` command to compile the web project and install all Node JS dependencies.
  * Then run the `npm start` command to start the backend server.
  * The listening port is ``5000``, so requests can be made to the address `http://localhost:5000/`. The list of routes can be found [ici](./backend/app.js)

* Frontend (React)
  * Move to the frontend directory located at the root of the project 
  * Run the `npm install` command to compile the web project and install all React dependencies.
  * Then run the `npm start` command to start the web project (make sure you have started the backend beforehand).
  * The listening port is ``3000``, the site can therefore be consulted at the address `http://localhost:3000/`.
  * A login interface is displayed on the home page of the site. To connect, you must enter the following information:
    * Email : ``pkoffi5@gmail.com``
    * Password : ``paul``
  
