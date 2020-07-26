# template-api-typescript
Simple application TypeScript and Node.js.  
This is a simple back-end application to practice TypeScript and Node.js in a Rest API,  
the functions of application is only connection to database and to execute migrations.

## Required
There's a file name as `.env.stage.example` with the variables that need to be createds in a file called as `.env.[stage]`:
  
###### File content of the `.env.stage.example`
```
DB_HOST=[HOST DATABASE]
DB_NAME=[NAME DATABASE]
DB_USER=[USER DATABASE]
DB_PASS=[PASSWORD DATABASE]
DB_PORT=[PORT DATABASE]

```
  
Where `[stage]` should be replaced with one of the stages of the application:  
#### `prod`
This stage is not recommended to use, this is only a application of test and practice.  
#### `dev`
This stage is runned in development mode.
#### `test`
This stage is used to make TDD tests of the application.  
  
## Scripts available
#### `yarn start`
Run a static `index.js` transpiled with the TypeScript in the path directory is `./dist/index.js`.  
⚠️ **Stage:** `prod`  
#### `yarn dev`
Run back-end application in development mode.  
⚠️ **Stage:** `dev`  
#### `yarn node:dev`
Used to execute some file Node.js transpiled by TypeScript to path `./dist`.  
⚠️ **Stage:** `dev`  
#### `yarn pretest`
Is runned automatically before to execute `yarn test`.  
⚠️ **Stage:** `test`  
#### `yarn test`
Used to run TDD tests of the back-end application.  
⚠️ **Stage:** `test` 
#### `yarn posttest`
Is runned automatically after to execute `yarn test`.  
⚠️ **Stage:** `test`  
#### `yarn tsc`
Used to transpile files in `.ts` to `.js` to path `./dist`.

