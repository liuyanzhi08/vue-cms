export default {
  setDefaultCover: (articles) => {
    if (!articles) {
      return;
    }
    const items = articles.items ? articles.items : articles;
    items.forEach((article) => {
      if (!article.image_url) {
        article.image_url = '/dist/img/default-cover.png';
      }
    });
  },
};
