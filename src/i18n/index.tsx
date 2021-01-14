import en from "./en_US/index.json";
import en_code from "./en_US/code.json";
import en_page from "./en_US/page.json";
import en_locale from "./en_US/locale.json";
import zh from "./zh_CN/index.json";
import zh_code from "./zh_CN/code.json";
import zh_page from "./zh_CN/page.json";
import zh_locale from "./zh_CN/locale.json";

export default {
  en: Object.assign(en, en_code, en_page, en_locale),
  zh: Object.assign(zh, zh_code, zh_page, zh_locale),
};
