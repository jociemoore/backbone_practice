describe('Scrabble', function() {
  xit("scores an empty word as zero",function() {
    expect(Scrabble("")).toEqual(0);
  });

  xit("scores a null as zero",function() {
    expect(Scrabble(null)).toEqual(0);
  });

  xit("scores a very short word",function() {
    expect(Scrabble("a")).toEqual(1);
  });

  xit("scores the word by the number of letters",function() {
    expect(Scrabble("street")).toEqual(6);
  });

  xit("scores more complicated words with more",function() {
    expect(Scrabble("quirky")).toEqual(22);
  });

  xit("scores case insensitive words",function() {
    expect(Scrabble("MULTIBILLIONAIRE")).toEqual(20);
  });
});
