const size = 9;
const unit = "vmin";
const height = size * 2;
const width = Math.sqrt(3) / 2 * size * 2;

const hexesPerRow = 10;
const hexesPerColumn = 10;

const axialDirections = [
  [+1, 0],
  [+1, -1],
  [0, -1],
  [-1, 0],
  [-1, +1],
  [0, +1],
];

const direction = direction => {
  return axialDirections[direction];
};

const toHex = cube => {
  var q = cube[0];
  var r = cube[2];
  return [q, r];
};

const toCube = hex => {
  var x = hex[0];
  var z = hex[1];
  var y = -x - z;
  return [x, y, z];
};

const neighbor = (hex, directionKey) => {
  const directionModifier = direction(directionKey);
  return [hex[0] + directionModifier[0], hex[1] + directionModifier[1]];
};

const distanceBetweenCubes = (a, b) => {
  return Math.max(
    Math.abs(a[0] - b[0]),
    Math.abs(a[1] - b[1]),
    Math.abs(a[2] - b[2])
  );
};

const distanceBetween = (a, b) => {
  const ac = toCube(a);
  const bc = toCube(b);
  return distanceBetweenCubes(ac, bc);
};

const hexesWithin = (hex, N) => {
  const cube = toCube(hex);
  let results = [];
  let dx = 0;
  let dy = 0;

  while (-N <= dx <= N) {
    while (Math.max(-N, -dx - N) <= dy <= Math.min(N, -dx + N)) {
      const dz = -dx - dy;
      results.push(toHex([cube[0] + dx, cube[1] + dy, cube[2] + dz]));
      dy++;
    }
    dx++;
  }

  return results;
};

const ringFrom = (hex, N) => {
  // function cube_ring(center, radius):
  //   var results = []
  //   # this code doesn't work for radius == 0; can you see why?
  //   var cube = cube_add(center,
  //                       cube_scale(cube_direction(4), radius))
  //   for each 0 ≤ i < 6:
  //       for each 0 ≤ j < radius:
  //           results.append(cube)
  //           cube = cube_neighbor(cube, i)
  //   return results
};

const pixelCoordinates = hex => {
  const x = size * Math.sqrt(3) * (hex[0] + hex[1] / 2);
  const y = height / 2 * 3 / 2 * hex[1];
  return [x, y];
};

export default {
  size: size,
  unit: unit,
  height: height,
  width: width,
  hexesPerRow: hexesPerRow,
  hexesPerColumn: hexesPerColumn,

  direction: direction,
  toHex: toHex,
  toCube: toCube,
  neighbor: neighbor,
  distanceBetweenCubes: distanceBetweenCubes,
  distanceBetween: distanceBetween,
  hexesWithin: hexesWithin,
  ringFrom: ringFrom,
  pixelCoordinates: pixelCoordinates,
};
