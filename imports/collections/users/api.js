import Api from '../../utils/api';
import Users from './users';

const ERRORS = {
  email: {
    hasError: true,
    error: 'An account already exists linked to that email address.'
  },

  username(username) {
    return {
      hasError: true,
      error: `The username "${username}" is already taken.`
    };
  }
};

Api.addCollection(Users, {
  excludedEndpoints: ['getAll', 'put', 'patch'],
  routeOptions: {
    authRequired: true
  },
  endpoints: {
    post: {
      authRequired: false,
      action() {
        const body = this.bodyParams;
        const hasEmail = Users.findOne({ 'emails.address': body.email });
        const hasUsername = Users.findOne({ username: body.username });

        if (hasEmail || hasUsername) {
          return {
            status: 'error',
            data: {
              email: hasEmail ? ERRORS.email : {},
              username: hasUsername ? ERRORS.username(body.username) : {}
            }
          };
        }

        // Register User
        const _id = Accounts.createUser(body);

        return {
          status: 'success',
          data: {
            _id
          }
        };
      }
    },
    delete: {
      roleRequired: 'admin'
    }
  }
});
