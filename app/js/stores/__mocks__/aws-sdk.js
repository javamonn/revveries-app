var awsMock = jest.genMockFromModule('aws-sdk');
awsMock.S3.putObject = (obj, cb) => {
  console.log('put object mock');
  return cb(null, obj);
}
module.exports = awsMock;
