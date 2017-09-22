import {Rectangle, Circle, Model} from './model'

test('Square example test case 1 from assignment', () => {
  const square = new Rectangle(5, 5);
  const model = new Model(square, 1, 2);
  expect(model.getRobotPosition()).toBe('1 2 N');
  expect(model.performCommands('HGHGGHGHG')).toBe('1 3 N');
});

test('Circle example test case 2 from assignment', () => {
  const circle = new Circle(10);
  const model = new Model(circle, 0, 0);
  expect(model.getRobotPosition()).toBe('0 0 N');
  expect(model.performCommands('RRFLFFLRF')).toBe('3 1 E');
});

test('Rectangle - It shouldn\'t be possible to walk out of it', () => {
  // Walking from corner to corner, trying to cross the walls
  const rectangle = new Rectangle(8, 4);
  const model = new Model(rectangle, 0, 0);
  expect(model.getRobotPosition()).toBe('0 0 N');
  let cmdSequence = 'FGVGF';
  expect(model.performCommands(cmdSequence)).toBe('0 0 W');
  cmdSequence += 'RHR'
  expect(model.performCommands(cmdSequence)).toBe('0 0 S');
  cmdSequence += 'FFFFFFFF'
  expect(model.performCommands(cmdSequence)).toBe('0 4 S');
  cmdSequence += 'LFFFFGGGGGGGG'
  expect(model.performCommands(cmdSequence)).toBe('8 4 E');
});

test('Circle - It shouldn\'t be possible to walk out of it', () => {
  // Walking around, trying to cross the walls
  const circle = new Circle(4);
  const model = new Model(circle, -1, -2);
  expect(model.getRobotPosition()).toBe('-1 -2 N');
  let cmdSequence = 'HHFFVF';
  expect(model.performCommands(cmdSequence)).toBe('0 0 E');
  cmdSequence += 'FFFF'
  // Cannot reach edge of 4 because of floating point rounding error
  expect(model.performCommands(cmdSequence)).toBe('3 0 E');
  cmdSequence += 'VFFFF'
  expect(model.performCommands(cmdSequence)).toBe('3 -2 N');
});

// Only accepts valid commands, eng/swe
test('Rectangle - Only accept valid commands', () => {
  // Walking from corner to corner, trying to cross the walls
  const rectangle = new Rectangle(2, 5);
  const model = new Model(rectangle, 2, 3);

  // Try invalid characters [A-z]
  let charSequence = ''
  for (let i = 'A'.charCodeAt(); i <= 122; i++) {
    charSequence += String.fromCharCode(i);
  }
  // Remove valid commands
  charSequence = charSequence.replace(/L|l|R|r|F|f|G|g/g,'');
  expect(model.performCommands(charSequence)).toBe('2 3 N');
});