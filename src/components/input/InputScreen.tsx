import { useState, useRef, useEffect } from 'react';
import type { Category, Language, ReadingInput, SpreadId } from '../../app/types';
import { useI18n } from '../../i18n/I18nContext';
import { SPREAD_LIST } from '../../data/spreads';
import { AppHeader } from '../common/AppHeader';

export interface InputScreenProps {
  input: ReadingInput;
  language: Language;
  onInputChange: (field: keyof ReadingInput, value: ReadingInput[keyof ReadingInput]) => void;
  onLanguageChange: (lang: Language) => void;
  onStart: () => void;
}

const CATEGORIES: Array<{
  id: Category;
  labelKey:
  | 'categories.daily'
  | 'categories.love'
  | 'categories.career'
  | 'categories.finance'
  | 'categories.personal_growth';
  icon: string;
}> = [
    { id: 'daily', labelKey: 'categories.daily', icon: '☀️' },
    { id: 'love', labelKey: 'categories.love', icon: '✦' },
    { id: 'career', labelKey: 'categories.career', icon: '⚖' },
    { id: 'finance', labelKey: 'categories.finance', icon: '🪙' },
    { id: 'personal_growth', labelKey: 'categories.personal_growth', icon: '🌱' },
  ];

const MAX_CONTEXT_LENGTH = 1500;

export function InputScreen({
  input,
  language,
  onInputChange,
  onLanguageChange,
  onStart,
}: InputScreenProps) {
  const { t } = useI18n();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus first input on mount for keyboard & accessibility
    nameInputRef.current?.focus();
  }, []);

  const contextLength = input.context.length;
  const isContextTooLong = contextLength > MAX_CONTEXT_LENGTH;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isContextTooLong) {
      setErrorMessage(t('errors.context_too_long'));
      return;
    }

    setErrorMessage(null);
    onStart();
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <div>
        <AppHeader language={language} onLanguageChange={onLanguageChange} />

        <main className="w-full max-w-3xl mx-auto px-4 pb-12">
          {/* Card Form Container with mystical glassmorphism */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-amber-500/20 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-purple-950/20 space-y-8"
          >
            {/* Validation Error Banner */}
            {errorMessage && (
              <div
                role="alert"
                className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-4 text-sm text-rose-300 flex items-center gap-3 animate-fade-in"
              >
                <span className="text-lg">⚠</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="user-name"
                className="block text-sm font-medium text-amber-200"
              >
                {t('input.name_label')}
              </label>
              <input
                ref={nameInputRef}
                id="user-name"
                type="text"
                maxLength={80}
                value={input.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                placeholder={t('input.name_placeholder')}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 px-4 py-3 text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors"
              />
            </div>

            {/* 2. Category Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-amber-200">
                {t('input.category_label')}
              </label>
              <div
                role="radiogroup"
                aria-label={t('input.category_label')}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
              >
                {CATEGORIES.map((cat) => {
                  const isSelected = input.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => onInputChange('category', cat.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${isSelected
                        ? 'border-amber-400/80 bg-amber-500/15 shadow-md shadow-amber-500/10 text-amber-100 font-semibold ring-1 ring-amber-400/40'
                        : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50'
                        }`}
                    >
                      <span className="text-xl sm:text-2xl">{cat.icon}</span>
                      <span className="text-xs sm:text-sm leading-tight">
                        {t(cat.labelKey)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Context / Question Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="user-context"
                  className="block text-sm font-medium text-amber-200"
                >
                  {t('input.context_label')}
                </label>
                <span
                  className={`text-xs font-mono transition-colors ${isContextTooLong
                    ? 'text-rose-400 font-bold'
                    : contextLength > 1300
                      ? 'text-amber-400'
                      : 'text-slate-500'
                    }`}
                >
                  {t('input.character_count', {
                    count: contextLength,
                    max: MAX_CONTEXT_LENGTH,
                  })}
                </span>
              </div>
              <textarea
                id="user-context"
                rows={4}
                value={input.context}
                maxLength={MAX_CONTEXT_LENGTH + 50}
                onChange={(e) => {
                  onInputChange('context', e.target.value);
                  if (errorMessage && e.target.value.length <= MAX_CONTEXT_LENGTH) {
                    setErrorMessage(null);
                  }
                }}
                placeholder={t('input.context_placeholder')}
                className={`w-full rounded-xl border px-4 py-3 text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-1 transition-colors resize-y min-h-[110px] ${isContextTooLong
                  ? 'border-rose-500 bg-rose-950/20 focus:border-rose-400 focus:ring-rose-400'
                  : 'border-slate-700/80 bg-slate-950/70 focus:border-amber-400 focus:ring-amber-400'
                  }`}
              />
              <p className="text-[11px] text-slate-500">{t('input.context_hint')}</p>

              {/* Privacy Notice Callout */}
              <div
                role="note"
                aria-label="Privacy notice"
                className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-amber-200/80"
              >
                <span className="text-amber-400 text-sm shrink-0 select-none" aria-hidden="true">🔒</span>
                <p className="leading-relaxed">
                  {t('input.privacy_notice')}
                </p>
              </div>
            </div>

            {/* 4. Spread Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-amber-200">
                {t('input.spread_label')}
              </label>
              <div
                role="radiogroup"
                aria-label={t('input.spread_label')}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
              >
                {SPREAD_LIST.map((spread) => {
                  const isSelected = input.spreadId === spread.id;
                  const spreadName =
                    spread.id === 'three_cards'
                      ? t('spreads.three_cards.name')
                      : t('spreads.five_cards.name');
                  const spreadDesc =
                    spread.id === 'three_cards'
                      ? t('spreads.three_cards.description')
                      : t('spreads.five_cards.description');

                  return (
                    <button
                      key={spread.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => onInputChange('spreadId', spread.id as SpreadId)}
                      className={`relative flex flex-col justify-between p-4 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${isSelected
                        ? 'border-amber-400 bg-gradient-to-br from-amber-500/15 via-slate-900/80 to-purple-950/30 ring-1 ring-amber-400/50 shadow-lg shadow-amber-950/30'
                        : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/50'
                        }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span
                          className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-amber-200' : 'text-slate-200'
                            }`}
                        >
                          {spreadName}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium border border-amber-500/30 bg-amber-500/10 text-amber-300">
                          {spread.cardCount} cards
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {spreadDesc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Start Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isContextTooLong}
                className="w-full py-4 px-6 rounded-xl font-bold text-base sm:text-lg text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-amber-500/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer"
              >
                {t('input.start_button')}
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-3xl mx-auto px-4 py-6 text-center space-y-2 border-t border-slate-800/60 text-xs text-slate-500">
        <p>{t('app.disclaimer')}</p>
      </footer>
    </div>
  );
}
