export const matchSkills = (candidateSkills: string[], jobSkills: string[]) => {
  return candidateSkills.filter(skill => jobSkills.includes(skill)).length;
};