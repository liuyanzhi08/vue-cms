import resource from 'resource-axios';
import axios from 'axios';

const Article = resource('/api/article', axios);

export default Article;
