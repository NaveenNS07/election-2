import { journeyStages } from '../utils/journeyData';

describe('Stage Progression Logic', () => {
  test('should have exactly 6 stages', () => {
    expect(journeyStages.length).toBe(6);
  });

  test('each stage should have required properties', () => {
    journeyStages.forEach(stage => {
      expect(stage).toHaveProperty('id');
      expect(stage).toHaveProperty('title');
      expect(stage).toHaveProperty('description');
      expect(stage).toHaveProperty('content');
    });
  });
});
