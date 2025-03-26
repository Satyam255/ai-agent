import { matchSkills } from "./matchSkills";

export const rankCandidates = (candidates: any[], jobSkills: string[]) => {
  return candidates.map(candidate => ({
    ...candidate,
    score: matchSkills(candidate.skills, jobSkills),
  })).sort((a, b) => b.score - a.score);
};
