# OhNoLogger Prep 4

**As A User I Want**
```
Be able to store my console logs in a database
```
#
**As A User I Want**
```


```
#
**As A User I Want**
```


```
#
**As A User I Want**
```


```
#
**As A User I Want**
```


```

## Modeling

- [UML](./assets/phaseuml.md)

## Database Table Model
```
Be sure to identify the relationships (if any) between each of the tables:

1-to-1 relationships
1-to-many relationships
many-to-many relationships
Also, include in each table:

The name of column
The required data type
Indication if the column is a key (Example: Primary Key, Foreign Key, Composite Key)
```
- [Diagram UML](./assets/databaseuml.md) 


### npm
```
npm init
name it
create an index.js
create function export.printmsg = funtion(){
    console.log('test package')
}
npm publish
npm install 


```
## update npm package
```
npm publish will update
run npm uninstall 
run npm i 


```

function userLogin(name){
  let  USERNAME = `${name}`
    return USERNAME
}
module.exports = userLogin;

proccess.env.USERNAME

one file for name
one file for password
user would have to npm run name -- name
then npm run password -- password
both files would have to be exported so that env could hear the variables
comman line args type -- password 
fs

export PRISM_USERNAME=“your_user_name” PRISM_PASSWORD=“your_password”


process.env.PRISM_PASSWORD
“after installing, please run export PRISM_USERNAME=“your_user_name” PRISM_PASSWORD=“your_password”\
DATABASE_URL=“postgresql://`${process.env.PRISM_USERNAME}:${process.env.PRISM_PASSWORD}@localhost:5432/blahblablah