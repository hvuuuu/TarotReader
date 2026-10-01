/**
 * Returns a cryptographically secure, unbiased random integer in the range [0, maxExclusive - 1].
 * Uses rejection sampling to completely avoid modulo bias.
 */
export function getSecureRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 1) {
    return 0;
  }

  const uint32Max = 0x100000000; // 2^32
  const limit = Math.floor(uint32Max / maxExclusive) * maxExclusive;
  const buffer = new Uint32Array(1);

  let rand: number;
  do {
    crypto.getRandomValues(buffer);
    rand = buffer[0];
  } while (rand >= limit);

  return rand % maxExclusive;
}

/**
 * Fisher-Yates shuffle using crypto.getRandomValues (unbiased).
 * Returns a new shuffled array without mutating the original input array.
 */
export function shuffle<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}
