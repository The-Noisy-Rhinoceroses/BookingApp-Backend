const adder = (appointment, targetKey) => {
  let total = 0;

  for (let i = 0; i < appointment.length; i++) {
    let currentService = appointment[i];
    total += currentService[targetKey];
  }

  return total;
};

module.exports = adder;
