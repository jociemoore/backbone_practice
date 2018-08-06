var points = {
  1: 'AEIOULNRST',
  2: 'DG',
  3: 'BCMP',
  4: 'FHVWY',
  5: 'K',
  8: 'JX',
  10: 'QZ'
}

function Scrabble(word) {
  var total = 0;
  var letters;

  if (word) {
    word = word.toUpperCase();
    letters = word.split('');

    letters.forEach(function(letter) {
      for (var category in points) {
        if (points[category].includes(letter)) {
          total += Number(category);
        }
      };
    });
  }

  return total;
}