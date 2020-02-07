import Api from '../../utils/api';
import Users from './users';
import { Links } from '../links/links';

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
  excludedEndpoints: ['getAll', 'patch'],
  routeOptions: {
    authRequired: true
  },

  endpoints: {
    get: {
      action() {
        const { user } = this;

        return {
          status: 'success',
          data: {
            _id: user._id,
            name: user.profile.name,
            username: user.username,
            email: user.email()
          }
        };
      }
    },

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

    put: {
      action() {
        const { name } = this.bodyParams;
        
        // Update User
        // XXX: For now, only the name is updated.
        Users.update(this.user._id, {
          $set: {
            profile: {
              name
            }
          }
        });

        return {
          status: 'success',
          data: {
            name
          }
        };
      }
    },

    delete: {
      roleRequired: 'admin'
    }
  }
});
