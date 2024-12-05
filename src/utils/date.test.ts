import { expect } from 'chai';
import { calculateTimeDifference } from './date';

describe('DateUtil', () => {
  it('should return the correct difference in seconds for two timestamps', () => {
    const timestamp1 = '2023-01-01T00:00:00Z';
    const timestamp2 = '2023-01-01T00:00:10Z';
    const difference = calculateTimeDifference(timestamp1, timestamp2);

    expect(difference).to.equal(10);
  });

  it('should return 0 for identical timestamps', () => {
    const timestamp1 = '2023-01-01T00:00:00Z';
    const timestamp2 = '2023-01-01T00:00:00Z';
    const difference = calculateTimeDifference(timestamp1, timestamp2);

    expect(difference).to.equal(0);
  });

  it('should return the correct difference in seconds for timestamps in different formats', () => {
    const timestamp1 = '2023-01-01T00:00:00Z';
    const timestamp2 = '2023-01-01T00:01:00+00:00';
    const difference = calculateTimeDifference(timestamp1, timestamp2);

    expect(difference).to.equal(60);
  });

  it('should handle timestamps with different time zones', () => {
    const timestamp1 = '2023-01-01T00:00:00Z';
    const timestamp2 = '2023-01-01T01:00:00+01:00';
    const difference = calculateTimeDifference(timestamp1, timestamp2);

    expect(difference).to.equal(0);
  });

  it('should handle timestamps with milliseconds', () => {
    const timestamp1 = '2023-01-01T00:00:00.000Z';
    const timestamp2 = '2023-01-01T00:00:01.500Z';
    const difference = calculateTimeDifference(timestamp1, timestamp2);

    expect(difference).to.equal(1.5);
  });
});
