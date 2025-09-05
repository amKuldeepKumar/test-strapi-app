import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalSeo extends Struct.ComponentSchema {
  collectionName: 'components_global_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    CanonicalURL: Schema.Attribute.String;
    MetaDescription: Schema.Attribute.Text;
    MetaKeywords: Schema.Attribute.Text;
    MetaTitle: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.seo': GlobalSeo;
    }
  }
}
