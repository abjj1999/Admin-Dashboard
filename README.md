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
    - To reset the database
        npx prisma migrate reset

## Planet Scale (DB provider that deals with mysql)
    - Create an account or login to planetScale
    - Create a new database
    - After the database (needed tables) is created, 
        - click on the database and click on the "Connect" button
        - select the connection method as "Prisma"
        - copy the connection string that contains the database name, username, password, host, port, and db name
        - paste the connection string in the .env file

## shadcn ui
    A UI library that is used have already prebuilt components that can be used in the app
        To install shadcn ui
            - npx shadcn-ui@latest init
            - after you answer a couple of questions the app folder layout would look like 
                    ├── app
                    │   ├── layout.tsx
                    │   └── page.tsx
                    ├── components
                    │   {├── ui
                    │   │   ├── alert-dialog.tsx
                    │   │   ├── button.tsx
                    │   │   ├── dropdown-menu.tsx
                    │   │   └── ...} ----> here where the components are
                    │   ├── main-nav.tsx
                    │   ├── page-header.tsx
                    │   └── ...
                    ├── lib
                    │   └── utils.ts
                    ├── styles
                    │   └── globals.css
                    ├── next.config.js
                    ├── package.json
                    ├── postcss.config.js
                    ├── tailwind.config.js
                    └── tsconfig.json
            - to install a component
                - npx shadcn-ui@latest add <The Name of the component>
                    * ex: npx shadcn-ui@latest add button
