
# ToDO Task - Server App

Esta aplicacion fue desarrollada con NodeJS en su version 20.xx y Typescript. A continuacion recalcare algunas configuraciones que se deben de seguir para poder hacer que el proyecto funcione de manera local.




## Pasos a seguir:

1. Debemos crear un archivo `.env` en la raíz del proyecto con las siguientes varaibles de entorno:
    

`PORT`
`JWT_SECRET`
`JWT_EXPIRES_IN`
`GLOBAL_ROUTE`

2. Debes configurar el ambiente de desarrollo en la consola de Firebase.
3. Al tener configurado el proyecto en Firebase, debes de descargar las credenciales de autentificacion.
4. Se descargara un archivo de tipo `json` el cual debes de nombrar `firebase-admin-cert.json` y guardarlo en la carpeta `src/config/` del proyecto.
IMPORTANTE: En la linea 3 del archivo `src/config/firebase/firebase.config.ts` por `import serviceFirebase from '../firebase-admin-cert.json';`


## Comando para ejecutar el proyecto
1. `npm run dev`: Este comando ejecuta el proyecto para nuestro localhost.

## Configuraciones adicionales
1. `cors`: para configurar nuestro cors, en la carpeta `src/config/cors` encontraras el modulo el cual tiene las reglas para poder recibir las peticiones de diferentes hosts



## Estructura de proyecto

`src`: carpeta donde se encuentra el codigo fuente del proyecto

`config`: carpeta que almacena la configuracion inicial para la conexion a la base de datos

`controllers`: carpeta que almacena toda la logica que interactua con la base datos

`helpers`: carpeta que almacena funciones especificas para el funcionamiento de la aplicacion

`interfaces`: carpeta que almacena los modelos de firebase

`middleware`: almacena logica para la reglamentacion de la aplicacion

`routes`: almacena toda la logica de enrutamiento de los enpoints de la aplicacion

`shared`: almacena funciones de uso compartido

## Credenciales de acceso para pruebas

email: admin@todotask.com
IMPORTANTE: con esta credencial se accede a la app en prod.

## DATO DE IMPORTANCIA
1. El servidor que estoy usando para alojar la api, es un servidor gratuito por lo tanto se apaga cada cierto tiempo que el mismo no es usado.
2. Para que la app web de angular al momento de iniciar sesion, hay que esperar uns segundos hasta que el servicor vuelve a responder.
3. Podemos enviar la solicitud (Clikear 2 veces el boton de iniciar sesion) hasta que responde la api.
4. Tengo desplegada en un servidor privado la api pero desde firebase hostin no permite hacer peticiones HTTP
5. Les dejo la direccion para que puedan ejecutar en local la app de Angular y puedan hacer pruebas si asi lo requieren, dir: `http://129.213.57.94:3600/api-todo-task`
6. La direccion que les brinde la pueden agregar en la variable global de mi app en Angular la cual se encuentra en `src/app/data/contants/global.variable.constant.ts`, variable : `apiUrl`



