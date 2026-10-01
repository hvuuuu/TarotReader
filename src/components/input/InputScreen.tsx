import { useState, useRef, useEffect } from 'react';
import {
  Sun,
  Heart,
  Briefcase,
  Coins,
  Sprout,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
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
  Icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}> = [
  { id: 'daily', labelKey: 'categories.daily', Icon: Sun },
  { id: 'love', labelKey: 'categories.love', Icon: Heart },
  { id: 'career', labelKey: 'categories.career', Icon: Briefcase },
  { id: 'finance', labelKey: 'categories.finance', Icon: Coins },
  { id: 'personal_growth', labelKey: 'categories.personal_growth', Icon: Sprout },
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
                className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-4 text-sm text-rose-300 flex items-center gap-3 animate-fade-in font-medium"
              >
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Name Input */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center justify-center shrink-0 select-none">
                  1
                </span>
                <label
                  htmlFor="user-name"
                  className="block text-base sm:text-lg font-serif font-bold text-amber-100"
                >
                  {t('input.name_label')}
                </label>
              </div>
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
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center justify-center shrink-0 select-none">
                  2
                </span>
                <label className="block text-base sm:text-lg font-serif font-bold text-amber-100">
                  {t('input.category_label')}
                </label>
              </div>
              <div
                role="radiogroup"
                aria-label={t('input.category_label')}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {CATEGORIES.map((cat) => {
                  const isSelected = input.category === cat.id;
                  const CatIcon = cat.Icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => onInputChange('category', cat.id)}
                      className={`group flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer ${
                        isSelected
                          ? 'border-amber-400/80 bg-amber-500/15 shadow-md shadow-amber-500/10 text-amber-100 ring-1 ring-amber-400/40'
                          : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50'
                      }`}
                    >
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors select-none ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 shadow-xs'
                            : 'bg-slate-900 border border-slate-800 text-amber-300/80 group-hover:border-amber-500/30 group-hover:bg-amber-500/10'
                        }`}
                      >
                        <CatIcon className="w-5 h-5 shrink-0" aria-hidden="true" />
                      </span>
                      <span
                        className={`text-sm leading-snug font-bold ${
                          isSelected ? 'text-amber-100' : 'text-slate-200 group-hover:text-slate-100'
                        }`}
                      >
                        {t(cat.labelKey)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Context / Question Textarea */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center justify-center shrink-0 select-none">
                    3
                  </span>
                  <label
                    htmlFor="user-context"
                    className="block text-base sm:text-lg font-serif font-bold text-amber-100"
                  >
                    {t('input.context_label')}
                  </label>
                </div>
                <span
                  className={`text-xs font-mono font-semibold transition-colors ${
                    isContextTooLong
                      ? 'text-rose-400 font-bold'
                      : contextLength > 1300
                        ? 'text-amber-400'
                        : 'text-slate-400'
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
                className={`w-full rounded-xl border px-4 py-3 text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-1 transition-colors resize-y min-h-27.5 ${
                  isContextTooLong
                    ? 'border-rose-500 bg-rose-950/20 focus:border-rose-400 focus:ring-rose-400'
                    : 'border-slate-700/80 bg-slate-950/70 focus:border-amber-400 focus:ring-amber-400'
                }`}
              />
              <p className="text-xs text-slate-400">{t('input.context_hint')}</p>

              {/* Privacy Notice Callout */}
              <div
                role="note"
                aria-label={t('privacy_notice_label')}
                className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-amber-200/90"
              >
                <span className="w-5 h-5 rounded-md bg-amber-500/15 text-amber-300 text-xs flex items-center justify-center shrink-0 select-none" aria-hidden="true">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
                <p className="leading-relaxed font-normal">
                  {t('input.privacy_notice')}
                </p>
              </div>
            </div>

            {/* 4. Spread Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center justify-center shrink-0 select-none">
                  4
                </span>
                <label className="block text-base sm:text-lg font-serif font-bold text-amber-100">
                  {t('input.spread_label')}
                </label>
              </div>
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
                      className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-linear-to-br from-amber-500/15 via-slate-900/80 to-purple-950/30 ring-1 ring-amber-400/50 shadow-lg shadow-amber-950/30'
                          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span
                          className={`font-serif font-bold text-base sm:text-lg ${
                            isSelected ? 'text-amber-200' : 'text-slate-100'
                          }`}
                        >
                          {spreadName}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border border-amber-500/30 bg-amber-500/10 text-amber-300">
                          {spread.cardCount} {t('cards')}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
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
                className="w-full py-4 px-6 rounded-xl font-serif font-bold text-base sm:text-lg text-slate-950 bg-linear-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-amber-500/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 shrink-0 text-slate-950" aria-hidden="true" />
                <span>{t('input.start_button')}</span>
                <Sparkles className="w-5 h-5 shrink-0 text-slate-950" aria-hidden="true" />
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
