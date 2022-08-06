test("our first test should succeed", () => {
  expect(2+2).toBe(4);
})

test("our first test should fail", () => {
  throw new Error("failing test");
})