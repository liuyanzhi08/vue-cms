import _ from 'lodash'
import Restfull from './_restfull'

const article = new Restfull('article', { auth: true });
export default article;
