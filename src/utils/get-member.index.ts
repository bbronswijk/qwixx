/**
 * Use the game pin as randomizer so people with the A or B in their name not always start with the same configuration
 */
export const getMemberIndex = (nickname: string, members: { nickname: string }[], gamePin: number): number => {
  const names = members.map((member) => member.nickname).toSorted();
  return names.indexOf(nickname) + Number(gamePin.toString()[0]);
};
