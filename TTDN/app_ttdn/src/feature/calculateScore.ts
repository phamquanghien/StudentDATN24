export const calculateScore = (
  fNumber?: number | null,
  sNumber?: number | null,
  tNumber?: number | null,
) => {
  if (fNumber && sNumber && !fNumber) return (fNumber + sNumber) / 2;
  if (fNumber && sNumber && tNumber) return (fNumber + tNumber + tNumber) / 3;
  return null;
};

export const convertToCharacter = (score: number | null) => {
  if (score === null) return null;
  if (score >= 8.5) return "A";
  if (score >= 8.0) return "B+";
  if (score >= 7) return "B";
  if (score >= 6.5) return "C+";
  if (score >= 5.5) return "C";
  if (score >= 5) return "D+";
  if (score >= 4) return "D";
  return "F";
};

export const convertTo4Score = (score: string | null) => {
  if (score === null) return null;
  if (score === "A") return 4.0;
  if (score === "B+") return 3.5;
  if (score === "B") return 3.0;
  if (score === "C+") return 2.5;
  if (score === "C") return 2.0;
  if (score === "D+") return 1.5;
  if (score === "D") return 1.0;
  return 0;
};
