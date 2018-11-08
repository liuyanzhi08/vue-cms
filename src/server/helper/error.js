import _ from 'lodash';

const errorMap = {
  sleeping: [0, 'We\'re sleeping'],
  authUserMissing: [1, '123 username or password'],
  authUnmatched: [2, 'username and password are unmatched'],
  authUserNotExisted: [3, 'username is not existed'],
  authUnauthorized: [4, 'unauthorized'],
  404: [5, 'resource not found'],
};

const error = _.mapValues(errorMap, value => ({
  code: value[0],
  msg: value[1],
}));

if (module.hot) {
  module.hot.accept();
}

export default error;
