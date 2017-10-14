/**
 * 接口文档：https://www.npmjs.com/package/jsdom
 */
import jsdom from 'jsdom';
const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
const win = doc.window;

/**
 * 将jsdom创建的document和window暴露在全局
 */
global.document = doc;
global.window = win;


/**
 * 将jsdom window对象包含的属性放在nodejs环境的document对象中
 */
Object.keys(global.window).forEach((key) => {
  if (!(key in global)) {
    global[key] = global.window[key];
  }
});
