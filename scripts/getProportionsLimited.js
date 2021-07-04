const getProportionsLimited = (data) => {
  const proportions = [];

  for (let firstPoint = 0; firstPoint < data.length; firstPoint += 1) {
    for (let secondPoint = 0; secondPoint < data.length; secondPoint += 1) {
      for (let thirdPoint = 0; thirdPoint < data.length; thirdPoint += 1) {
          const dist1 = Math.sqrt(
            Math.pow((data[firstPoint][0] - data[secondPoint][0]), 2) +
            Math.pow((data[firstPoint][1] - data[secondPoint][1]), 2) +
            Math.pow((data[firstPoint][2] - data[secondPoint][2]), 2)
          );

          const dist2 = Math.sqrt(
            Math.pow((data[firstPoint][0] - data[thirdPoint][0]), 2) +
            Math.pow((data[firstPoint][1] - data[thirdPoint][1]), 2) +
            Math.pow((data[firstPoint][2] - data[thirdPoint][2]), 2)
          );

          if (
            dist1 >= dist2
            && dist1 !== 0
            && (dist2 / dist1) !== 1
            && (dist2 / dist1) !== 0
          ) {
            proportions.push(dist2 / dist1);
          } else if (
            dist1 < dist2
            && dist2 !== 0
            && (dist1 / dist2) !== 1
            && (dist1 / dist2) !== 0
          ) {
            proportions.push(dist1 / dist2);
          }
      }
    }
  }

  proportionsObject = Object.assign({}, proportions);

  return proportionsObject;
};
