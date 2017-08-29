import inc from './inc'; 

describe('INCREMENT', () => {

	it('inc(1) === 2', () => {
		expect(inc(1)).toBe(2);

	});

	it('inc(2) === 3', () => {
		expect(inc(2)).toBe(3);
	});

	it('inc(6) === 7', () => {
		expect(inc(6)).toBe(8);
	});

});
