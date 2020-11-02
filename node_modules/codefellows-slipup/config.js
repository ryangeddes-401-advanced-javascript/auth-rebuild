'use strict';

const inquirer = require('inquirer');
const fs = require('fs');
const pg = require('pg');


async function input(){
try{
  let cliInput = await inquirer.prompt([
    {
      name: 'username',
      message: 'What is your PostGres username?'
    },
    {
      name: 'password',
      message: 'What is your PostGres password?',
      type: 'password'
    },
    {
      name: 'port',
      message: 'What is your desired PostGres port?  If empty, will default to 5432.' ,
      default: '5432'
    },
    {
      name: 'database',
      message: 'What is your desired PostGres db?  If empty, will default to splunk.',
      default: 'splunk'
    },
    {
      name: 'table',
      message: 'What is your desired PostGres table name?  If empty, will default to errevents.',
      default: 'errevents'
    }
]);

  let config = {
    username: cliInput.username,
    password: cliInput.password,
    port: cliInput.port,
    database: cliInput.database,
    table: cliInput.table 
  }

  let data = `DATABASE_URL=postgresql://${cliInput.username}:${cliInput.password}@localhost:${cliInput.port}/${cliInput.database}?schema=public`

  fs.writeFile('.env', data, (err) => {   
    if (err) throw err; 
  });

  let jsdata = JSON.stringify(config);
  fs.writeFileSync('config.json', jsdata);
  console.log('prisma env written')
  }catch(e){
    console.error(e);
  }
};


async function setupPg(){
try{
    const config = require('./config.json')
    const username = config.username;
    const password = config.password;
    const port = config.port;
    const database = config.database.toLowerCase();
    const table = config.table.toLowerCase();

    //INITIALIZE DB
    //CREATE code copied from https://notathoughtexperiment.me/blog/how-to-do-create-database-dbname-if-not-exists-in-postgres-in-golang/

    //POSTGRES doesn't support the CREATE DATABASE IF NOT EXISTS syntax, so we have to:
    //1. connect to default postgres db
    //2.  select all the dbs that exist using the pg_catalog object
    //3. query with user provided db name, this query will return a t/f boolean
    //4. if false, create the database and proceed, if true, db already exists so just proceed
    //5. once db is created/confirmed, reconnect our pg client from default postgres db to correct splunk db

    let client = new pg.Client(`postgres://${username}:${password}@localhost:${port}/postgres?schema=public`);
    client.connect();
    
    let checkDB = `SELECT EXISTS(SELECT datname FROM pg_catalog.pg_database WHERE datname = '${database}');`
    let result = await client.query(checkDB);
    let dbresult = result.rows[0];
    let checkVal =Object.values(dbresult)[0];

    if (checkVal == false) {
      let SQLDB = `CREATE DATABASE ${database};`;
      await client.query(SQLDB);
      console.log(`database ${database} created succesfully`)
    }else{
      console.log(`database ${database} already exists`)
    }

    client = new pg.Client(`postgres://${username}:${password}@localhost:${port}/${database}?schema=public`);
    client.connect();

    //INITIALIZE TABLE

    const SQL = `CREATE TABLE ${table} (
      id SERIAL PRIMARY KEY,
      date DATE,
      userid VARCHAR(1000),
      errortype VARCHAR(1000),
      errormessage VARCHAR(1000),
      userparam VARCHAR(1000),
      usernote VARCHAR(1000),
      stack TEXT)
      ;`

      

    await client.query(SQL);
    await client.end();
    console.log(`table ${table} created succesfully`)
  }catch(e){
    console.error(e);

  }

}


async function execute(){
  await input();
  await setupPg();
  process.exit()
};



execute();
