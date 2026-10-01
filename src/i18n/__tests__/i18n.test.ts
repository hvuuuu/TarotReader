import { describe, expect, it } from 'vitest';
import en from '../en.json';
import vi from '../vi.json';
import {
  detectDefaultLanguage,
  LANGUAGE_STORAGE_KEY,
  translate,
} from '../I18nContext';

describe('i18n translations', () => {
  it('every key in en.json exists in vi.json', () => {
    const enKeys = Object.keys(en) as Array<keyof typeof en>;
    const viKeys = new Set(Object.keys(vi));

    for (const key of enKeys) {
      expect(viKeys.has(key)).toBe(true);
      expect(typeof vi[key]).toBe('string');
      expect((vi[key] as string).trim().length).toBeGreaterThan(0);
    }
  });

  it('every key in vi.json exists in en.json', () => {
    const viKeys = Object.keys(vi) as Array<keyof typeof vi>;
    const enKeys = new Set(Object.keys(en));

    for (const key of viKeys) {
      expect(enKeys.has(key)).toBe(true);
      expect(typeof en[key as keyof typeof en]).toBe('string');
      expect((en[key as keyof typeof en] as string).trim().length).toBeGreaterThan(0);
    }
  });

  it('translate function interpolates dynamic parameters', () => {
    const textEn = translate('en', 'drawing.card_drawn_count', {
      current: 2,
      total: 5,
    });
    expect(textEn).toBe('2 of 5 cards drawn');

    const textVi = translate('vi', 'drawing.card_drawn_count', {
      current: 2,
      total: 5,
    });
    expect(textVi).toBe('Đã rút 2/5 lá bài');
  });

  it('detectDefaultLanguage handles localStorage and navigator.language', () => {
    // When no localStorage and navigator.language starts with vi
    const originalNavigator = globalThis.navigator;
    const originalLocalStorage = globalThis.localStorage;

    try {
      // Mock localStorage
      const storage: Record<string, string> = {};
      const mockStorage = {
        getItem: (k: string) => storage[k] ?? null,
        setItem: (k: string, v: string) => {
          storage[k] = v;
        },
        removeItem: (k: string) => {
          delete storage[k];
        },
        clear: () => {
          for (const k in storage) delete storage[k];
        },
        length: 0,
        key: () => null,
      };

      Object.defineProperty(globalThis, 'localStorage', {
        value: mockStorage,
        configurable: true,
        writable: true,
      });

      // 1. Vietnamese browser language -> 'vi'
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'vi-VN' },
        configurable: true,
        writable: true,
      });
      expect(detectDefaultLanguage()).toBe('vi');

      // 2. English browser language -> 'en'
      Object.defineProperty(globalThis, 'navigator', {
        value: { language: 'en-US' },
        configurable: true,
        writable: true,
      });
      expect(detectDefaultLanguage()).toBe('en');

      // 3. Stored preference overrides browser language
      localStorage.setItem(LANGUAGE_STORAGE_KEY, 'vi');
      expect(detectDefaultLanguage()).toBe('vi');

      localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
      expect(detectDefaultLanguage()).toBe('en');
    } finally {
      Object.defineProperty(globalThis, 'navigator', {
        value: originalNavigator,
        configurable: true,
        writable: true,
      });
      Object.defineProperty(globalThis, 'localStorage', {
        value: originalLocalStorage,
        configurable: true,
        writable: true,
      });
    }
  });
});
