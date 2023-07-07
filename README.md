# notes so far 

## Prisma
    - First to install prisma globally
        - npm install -g prisma
    - Then to install prisma client
        - npm install @prisma/client
    - Create a file in the lib folder called prismadb.ts
        - check the file for the code
    - Then to initialize prisma
        - npx prisma init
    - Then to generate prisma client
        - npx prisma generate (this will connect prisma and every table in the database to the app)
    - Then to push prisma changes to planetScale 
        npx prisma db push

## Planet Scale (DB provider that deals with mysql)
    - Create an account or login to planetScale
    - Create a new database
    - After the database (needed tables) is created, 
        - click on the database and click on the "Connect" button
        - select the connection method as "Prisma"
        - copy the connection string that contains the database name, username, password, host, port, and db name
        - paste the connection string in the .env file

