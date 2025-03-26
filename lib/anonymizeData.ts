export const anonymizeData = (resumeData: any) => {
  const { name, email, phone, ...rest } = resumeData;
  return { ...rest, anonymized: true };
};