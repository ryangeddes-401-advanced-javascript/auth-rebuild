'use strict';

const chalk = require('chalk');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class SearchHead {

  async getRecord(argv) {
    try {

      const valid = {
        id: 'id',
        userid: 'userid',
        errortype: 'errortype',
        userparam: 'userparam'
      }
      
      let queryObj = {};

      Object.keys(argv).forEach(key => {
        if(valid[key]) {
          queryObj[key] = argv[key];
        } else if(key === 'date') {
          queryObj.date = {equals: new Date(argv.date)}
        } else if (key !== '$0' && key !== '_') {
          //  DO NOT FIX THE INDENTATION OR SPACING FOR THIS ERROR
          //  IT WILL AFFECT THE WAY IT SHOWS IN THE TERMINAL
          throw new Error(`
${chalk.red(key)} IS NOT A VALID TAG

Only the following tags are allowed:
  --id
  --userid
  --date
  --errortype
  --userparam
`)
        }
      })

      const records = await prisma.errevents.findMany({
        where: queryObj,
      });

      if(!records.length) {
        console.log('')
        console.log(chalk.red('=================================================================================='));
        console.log('NOTHING RETURNED FROM DATABASE. TRY USING LESS FILTERS OR CHECK YOUR SPELLING');
        console.log(chalk.red('=================================================================================='));
        console.log('')
      } else {
        records.forEach(record => {
          console.log(chalk.blue('=================================  ERROR RECORD  ================================='));
          console.log(record);
          console.log(chalk.blue('=================================================================================='));
        })
      }
    } catch (e) {
      console.log(chalk.red('=================================================================================='));
      console.log('Something went wrong getting data:');
      console.log(e.message);
      console.log(chalk.red('=================================================================================='));
    } finally {
      await prisma.$disconnect();
    }
  }


  async update(id, usernote) {
    try {
      const updated = await prisma.errevents.update({
        where: { id: id },
        data: {usernote: usernote}
      });
      console.log(chalk.blue('===============================  UPDATED RECORD  ==============================='))
      console.log(updated);
      console.log(chalk.blue('================================================================================'))
    } catch (e) {
      console.log(chalk.red('=================================================================================='));
      console.log('Something went wrong when updating from database:');
      console.log(e);
      console.log(chalk.red('=================================================================================='));
    } finally {
      await prisma.$disconnect();
    }
  }


  async delete(id) {
    try {
      const deleted = await prisma.errevents.delete({
        where: { id: id },
      });
      console.log(chalk.red('===============================  DELETED RECORD  ==============================='))
      console.log(deleted);
      console.log(chalk.red('================================================================================'))
    } catch (e) {
      console.log(chalk.red('=================================================================================='));
      console.log('Something went wrong when deleting from database:');
      console.log(e);
      console.log(chalk.red('=================================================================================='));
    } finally {
      await prisma.$disconnect();
    }
  }
}

module.exports = new SearchHead();
