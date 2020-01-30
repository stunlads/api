const Links = new Mongo.Collection('links');

const Schema = new SimpleSchema({});

Links.attachBehaviour('timestampable');
Links.attachSchema(Schema);

export { Links, Schema };
