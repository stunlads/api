import { DEFAULT_COLOR } from '../../utils/shortcuts';

// Collections
const Links = new Mongo.Collection('links');

const Schema = new SimpleSchema({
  title: { type: String, optional: true, defaultValue: '' },
  url: { type: String, optional: true, defaultValue: '' },
  sorting: { type: Number },
  color: { type: String, defaultValue: DEFAULT_COLOR },
  active: { type: Boolean, defaultValue: false }
});

Links.attachBehaviour('timestampable');
Links.attachSchema(Schema);

export { Links, Schema };
