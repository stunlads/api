import Api from '../../utils/api';
import { Links } from './links';

Api.addCollection(Links, {
  excludedEndpoints: ['patch'],

  routeOptions: {
    authRequired: true
  },

  endpoints: {
    getAll: {
      action() {
        const links = Links.createQuery({
          $filters: { createdBy: this.user._id },
          $options: { sort: { sorting: 1 } },

          // fields
          title: 1,
          url: 1,
          sorting: 1
        });

        return {
          status: 'success',
          data: links.fetch()
        };
      }
    },

    post: {
      action() {
        const body = this.bodyParams;
        const links = Links.createQuery({
          $filters: { createdBy: this.user._id }
        });

        // new Link
        const _id = Links.insert({
          ...body,

          // last index
          sorting: -links.getCount(),

          // user
          createdBy: this.user._id
        });

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
        const body = this.bodyParams;
        const filter = {
          _id: this.urlParams.id,
          createdBy: this.user._id
        };

        // get link
        const link = Links.findOne(filter);

        if (link) {

          Links.update(filter, {
            $set: body
          });

          return {
            status: 'success',
            data: body
          };
        }

        return {
          status: 'error',
          data: {
            message: `${filter._id} link not found!`
          }
        };
      }
    }
  }
});

Api.addRoute(
  'links/sorting',
  { authRequired: true },
  {
    post() {
      const {
        user,
        bodyParams: { items }
      } = this;

      // update all links sorting.
      items.forEach(({ _id, sorting }) => {
        const link = Links.findOne({
          _id,
          createdBy: user._id
        });

        // Update Sorting.
        link.__sorting(sorting);
      });

      return {
        status: 'success',
        data: {}
      };
    }
  }
);
