module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    console.log("data--------->",data);
    
    if (!data.seo) {
      data.seo = {};
    }

    // Meta Title
    if (!data.seo.metaTitle && data.title) {
      data.seo.metaTitle = `${data.title} | SRP US Logistics`;
    }

    // Meta Description
    if (!data.seo.metaDescription && data.description) {
      data.seo.metaDescription = data.description.substring(0, 160);
    }

    // Meta Keywords
    if (!data.seo.metaKeywords && data.description) {
      data.seo.metaKeywords = data.description
        .split(" ")
        .slice(0, 6)
        .join(", ");
    }

    // Canonical URL
    if (!data.seo.canonicalUrl && data.slug) {
      data.seo.canonicalUrl = `https://yourdomain.com/blog/${data.slug}`;
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if (!data.seo) {
      data.seo = {};
    }

    if (!data.seo.metaTitle && data.title) {
      data.seo.metaTitle = `${data?.title} | SRP US Logistics`;
    }

    if (!data.seo.metaDescription && data.description) {
      data.seo.metaDescription = data.description.substring(0, 160);
    }

    if (!data.seo.metaKeywords && data.description) {
      data.seo.metaKeywords = data.description
        .split(" ")
        .slice(0, 6)
        .join(", ");
    }

    if (!data.seo.canonicalUrl && data.slug) {
      data.seo.canonicalUrl = `https://yourdomain.com/blog/${data.slug}`;
    }
  },
};
