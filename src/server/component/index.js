import config from '../config';
import Article from './article';
import Category from './category';
import Auth from './auth';
import User from './user';
import Theme from './theme';
import Common from './common';
import Publish from './publish';
import Upload from './upload';
import Search from './search';
import Spider from './spider';

export default {
  article: new Article('article'),
  category: new Category('category'),
  auth: new Auth('auth'),
  user: new User(`${config.db.prefix}_user`),
  theme: new Theme('theme'),
  common: new Common(`${config.db.prefix}_common`),
  publish: new Publish(),
  upload: new Upload(),
  search: new Search('article'),
  spider: new Spider(),
};
