export function calculateScoreAndStars({ correct, cluesUsed }) {
  if (!correct) {
    return { score: 0, stars: 0 };
  }

  const baseScore = 100;
  const bonus = Math.max(0, 100 - cluesUsed * 25); // penalty for using clues
  const totalScore = baseScore + bonus;

  let stars = 4 - cluesUsed;
  if (stars < 0) stars = 0;

  return { score: totalScore, stars };
}
