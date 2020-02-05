import Api from '../../utils/api';
import { LinksPublicFragment } from './fragments';
import { Links } from './links';

Api.addCollection(Links, {
  excludedEndpoints: ['patch'],

  routeOptions: {
    authRequired: true
  },

  endpoints: {
    getAll: {
      action() {
        const linksQuery = Links.createQuery({
          $filters: { createdBy: this.user._id },
          ...LinksPublicFragment
        });

        return {
          status: 'success',
          data: linksQuery.fetch()
        };
      }
    },

    post: {
      action() {
        const body = this.bodyParams;
        const linksQuery = Links.createQuery({
          $filters: { createdBy: this.user._id }
        });

        // new Link
        const _id = Links.insert({
          ...body,

          // last index
          sorting: -linksQuery.getCount(),

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
        const filters = {
          _id: this.urlParams.id,
          createdBy: this.user._id
        };

        // get link
        const linkQuery = Links.createQuery({
          $filters: filters
        });

        if (linkQuery.fetchOne()) {
          // update
          Links.update(filters, { $set: body });

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
    },

    delete: {
      action() {
        const { id } = this.urlParams;
        const link = Links.createQuery({
          $filters: {
            _id: id,
            createdBy: this.user._id
          }
        });

        if (link.fetchOne()) {

          // remove Link
          Links.remove(id);

          return {
            status: 'success',
            data: {
              id
            }
          }
        }

        return {
          status: 'error',
          data: {
            message: `${id} link not found!`
          }
        }
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
