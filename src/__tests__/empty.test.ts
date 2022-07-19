describe('test', () => {
  test.each([1, 2, 3, 4])('%#', (index) => {
    expect(index).toBe(index);
  });
});
