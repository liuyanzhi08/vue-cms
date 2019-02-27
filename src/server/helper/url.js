import url from 'url';

const root = (urlStr) => {
  const urlObj = url.parse(urlStr);
  return urlObj.path !== '/' ? urlStr.slice(0, urlStr.indexOf(urlObj.path) + 1) : urlObj.href;
};

export default {
  root,
};
