
'use strict';

module.exports = (permissions) =>{

  try{
    return (req, res, next)=> {
      if (req.user.can(permissions)){
        next();
      }else{
        next('insufficient permissions');
      }
    };
  }catch(e){
    console.log('Permissions Error:', e);
  }
};

