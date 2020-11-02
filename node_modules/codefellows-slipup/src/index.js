// @ts-check
/**
 * Student Name
 * @type {string}
 */
const studentName = 'jon';

/**
 * Student Name
 * @type {string}
 */
const studentPLay = 'John doe';

/**
 * Array of number
 * @type {Array<number>}
 */
const numbers = [1,2,3,4,5,6,6];

/**
 * @type {{id: number|string, text: string}}
 *
 */

const todo = {
  id: 1,
  text: 'hello'
};
/**
 * Calculate Tax
 * @param {number} amount - Total amount
 * @param {number} tax - Tax percentage
 * @param {boolean} boolean - some shit whether true or false
 * @returns {string} - Total with a dollar sign
 */
const calculateTax = (amount, tax, boolean)=>{
  return `$${amount + tax * amount}`;
};

