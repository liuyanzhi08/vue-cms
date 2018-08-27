import resource from 'resource-axios';
import axios from 'axios';

const Category = resource('/api/category', axios);

export default Category;
