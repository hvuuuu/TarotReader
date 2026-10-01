import { describe, it, expect } from 'vitest';
import { buildSystemPrompt } from '../systemPrompt';

describe('buildSystemPrompt', () => {
  it('substitutes English language and 3-card word budget', () => {
    const result = buildSystemPrompt({
      language: 'en',
      wordBudget: '450-600',
    });

    expect(result).toContain('strictly in English');
    expect(result).toContain('about 450-600 words');
    expect(result).toContain('the whole output must be in English');
    // Must not contain template placeholders
    expect(result).not.toContain('{{LANGUAGE}}');
    expect(result).not.toContain('{{WORD_BUDGET}}');
  });

  it('substitutes Vietnamese language and 5-card word budget', () => {
    const result = buildSystemPrompt({
      language: 'vi',
      wordBudget: '650-850',
    });

    expect(result).toContain('strictly in Vietnamese');
    expect(result).toContain('about 650-850 words');
    expect(result).toContain('the whole output must be in Vietnamese');
    expect(result).not.toContain('{{LANGUAGE}}');
    expect(result).not.toContain('{{WORD_BUDGET}}');
  });

  it('replaces all occurrences of {{LANGUAGE}}', () => {
    const result = buildSystemPrompt({
      language: 'en',
      wordBudget: '450-600',
    });

    // LANGUAGE appears 3 times in the template (header, Vietnamese note, reminder)
    const count = (result.match(/English/g) ?? []).length;
    expect(count).toBeGreaterThanOrEqual(3);
  });

  it('includes the Vietnamese section headers in the template', () => {
    const result = buildSystemPrompt({
      language: 'vi',
      wordBudget: '450-600',
    });

    expect(result).toContain('Năng lượng hiện tại');
    expect(result).toContain('Giải nghĩa từng lá bài');
    expect(result).toContain('Nên làm');
    expect(result).toContain('Nên tránh');
    expect(result).toContain('Lời khuyên tổng quan');
  });
});
