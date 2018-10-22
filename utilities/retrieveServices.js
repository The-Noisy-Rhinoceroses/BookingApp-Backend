const retrieveServices = (db, services) => {
  return db
    .collection('services')
    .find({"serviceName" : { $in : services }})
    .toArray()
    .catch(console.log);
};

module.exports = retrieveServices;
