/* eslint-disable object-shorthand */
const createPerson = (name, age) => {
  return {
    name: name,
    // eslint-disable-next-line object-shorthand
    age: age
  };
};

const getName = object => {
  return object.name;
};

const getProperty = (property, object) => {
  return object[property];
};

const hasProperty = (property, object) => {
  // eslint-disable-next-line no-prototype-builtins
  return object.hasOwnProperty(property);
};

const isOver65 = person => {
  return person.age > 65;
};

const getAges = people => {
  return people.map(person => {
    return person.age;
  });
};

const findByName = (name, people) => {
  return people.find(obj => {
    return obj.name === name;
  });
};

const findHondas = cars => {
  return cars.filter(car => {
    return car.manufacturer === 'Honda';
  });
};

const averageAge = people => {
  const totalAge = people.reduce((prevAge, currentPerson) => {
    return prevAge + currentPerson.age;
  }, 0);

  return totalAge / people.length;
};

const createTalkingPerson = (name, age) => {
  return {
    name,
    age,
    introduce(strangerName) {
      return `Hi ${strangerName}, my name is ${this.name} and I am ${this.age}!`;
    }
  };
};

module.exports = {
  createPerson,
  getName,
  getProperty,
  hasProperty,
  isOver65,
  getAges,
  findByName,
  findHondas,
  averageAge,
  createTalkingPerson
};
