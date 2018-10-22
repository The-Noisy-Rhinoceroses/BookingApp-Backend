const adder = (appointment, targetKey) => {
  let total = 0;

  for (let key in appointment) {
    if (appointment.hasOwnProperty(key)) {
      let currentService = appointment[key];
      total += currentService[targetKey];
    }
  }

  return total;
};

module.exports = adder;
