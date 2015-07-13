let buildMockGallery = id => ({
  galleryId: id,
  galleryOrder: id,
  name: "Test Gallery " + id,
  description: "Test Description " + id,
});

let fetch = (url, params) => {
  var data;
  switch (url) {
    case '/api/galleries/':
      // create gallery
      if (params && params.method == 'post') {
        data = JSON.parse(params.body);
        data.galleryId = -1;
      }
      // index
      else {
        data = Array(5).map((val, i) => buildMockGallery(i));
      }
      
  };

  return Promise.resolve(data);
};

module.exports = fetch;
