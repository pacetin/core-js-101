/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => this.width * this.height;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = Object.create(proto);
  const o = Object.assign(obj, JSON.parse(json));
  return o;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  elem: null,
  elemId: null,
  elemClass: [],
  elemAttr: null,
  elemPseudoClass: [],
  elemPseudoElem: null,
  combinator: null,
  selector1: null,
  selector2: null,

  element(value) {
    this.elem = value;
    return this;
  },

  id(value) {
    this.elemId = value;
    return this;
  },

  class(value) {
    this.elemClass.push(value);
    return this;
  },

  attr(value) {
    this.elemAttr = value;
    return this;
  },

  pseudoClass(value) {
    this.elemPseudoClass.push(value);
    return this;
  },

  pseudoElement(value) {
    this.elemPseudoElem = value;
    return this;
  },

  combine(/* selector1, combinator, selector2 */) {
    /* this.selector1 = Object.assign({}, selector1).stringify();
    console.log(this.selector1);
    this.selector2 = Object.assign({}, selector2).stringify();
    console.log(this.selector2);
    this.combinator = combinator;
    return this; */
    throw new Error('Not implemented');
  },

  stringify() {
    let str = '';
    if (this.elem) str += `${this.elem}`;
    if (this.elemId) str += `#${this.elemId}`;
    if (this.elemClass.length !== 0) {
      this.elemClass.forEach((item) => {
        str += `.${item}`;
      });
    }
    if (this.elemAttr) str += `[${this.elemAttr}]`;
    if (this.elemPseudoClass.length !== 0) {
      this.elemPseudoClass.forEach((item) => {
        str += `:${item}`;
      });
    }
    if (this.elemPseudoElem) str += `::${this.elemPseudoElem}`;
    if (typeof this.selector1 === 'string' && typeof this.selector2 === 'string' && this.combinator) {
      const selector = `${this.selector1} ${this.combinator} ${this.selector2}`;
      this.resetSelectors();
      return selector;
    }
    this.reset();
    return str;
  },

  reset() {
    this.elem = null;
    this.elemId = null;
    this.elemClass = [];
    this.elemAttr = null;
    this.elemPseudoClass = [];
    this.elemPseudoElem = null;
  },

  resetSelectors() {
    this.combinator = null;
    this.selector1 = null;
    this.selector2 = null;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
