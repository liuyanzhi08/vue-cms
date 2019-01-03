import Article from './article';
import Category from './category';
import Auth from './auth';
import User from './user';
import Publish from './publish';
import Theme from './theme';
import Common from './common';
import config from '../config';

export default {
  article: new Article('article'),
  category: new Category('category'),
  auth: new Auth('auth'),
  user: new User(`${config.db.prefix}_user`),
  publish: new Publish('publish'),
  theme: new Theme('theme'),
  common: new Common(`${config.db.prefix}_common`),
};
