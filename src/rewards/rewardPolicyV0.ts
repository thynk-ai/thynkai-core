export interface RewardPolicyV0 {
  pointsForScore(score: number): number;
}

export const DefaultRewardPolicyV0: RewardPolicyV0 = {
  pointsForScore(score) {
    const s = Math.max(0, Math.min(1, score));
    return Math.round(s * 1000);
  },
};
