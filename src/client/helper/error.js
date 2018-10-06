import _ from 'lodash';

const errorMap = {
  sleeping: [0, 'We\'re sleeping'],
  routerNotFound: [1, 'router: none matches the context.url'],
};

const error = _.mapValues(errorMap, value => ({
  code: value[0],
  msg: value[1],
  info: `code: ${value[0]}, msg: ${value[1]}`,
}));

export default error;
