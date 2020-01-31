const Links = new Mongo.Collection('links');

const Schema = new SimpleSchema({
  title: { type: String },
  url: { type: String },
  active: { type: Boolean, defaultValue: false }
});

Links.attachBehaviour('timestampable');
Links.attachSchema(Schema);

export { Links, Schema };
