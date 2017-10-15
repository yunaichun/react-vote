/**
 * 接口文档：https://www.npmjs.com/package/jsdom
 */
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;

global.window = window;
global.document = document;


//将jsdom创建的window属性暴露在全局
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
