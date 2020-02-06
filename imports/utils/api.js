import Users from '../collections/users/users';
import { Links } from '../collections/links/links';
import { LinksPublicFragment } from '../collections/links/fragments';

const Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true,
  defaultOptionsEndpoint: {
    action() {
      this.response.writeHead(201, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key, X-Auth-Token, X-User-Id',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      });

      this.done();

      return {
        status: 'success',
        data: {
          message: 'We love OPTIONS'
        }
      };
    }
  }
});

Api.addRoute(
  'preview/:username',
  { authRequired: false },
  {
    get() {
      const { username } = this.urlParams;
      const user = Users.findOne({ username });

      if (user) {
        const links = Links.createQuery({
          $filters: { createdBy: user._id, active: true },
          ...LinksPublicFragment
        });

        return {
          status: 'success',
          data: {
            username: user.username,
            links: links.fetch()
          }
        };
      }

      return {
        status: 'error',
        data: {
          message: `${username} user is not found!`
        }
      };
    }
  }
);

export default Api;
