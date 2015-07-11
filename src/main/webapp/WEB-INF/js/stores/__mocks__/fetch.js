let buildMockGallery = id => ({
  galleryId: id,
  order: 0,
  name: "Test Gallery " + id,
  description: "Test Description " + id,
});

let fetch = url => {
  var data;
  switch (url) {
    case '/api/galleries/':
      data = Array(5).map((val, i) => buildMockGallery(i));
  };

  return Promise.resolve(data);
};

module.exports = fetch;
