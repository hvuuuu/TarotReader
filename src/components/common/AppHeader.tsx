import type { Language } from '../../app/types';
import { useI18n } from '../../i18n/I18nContext';

export interface AppHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onReset?: () => void;
  showReset?: boolean;
}

export function AppHeader({
  language,
  onLanguageChange,
  onReset,
  showReset = false,
}: AppHeaderProps) {
  const { t } = useI18n();

  return (
    <header className="w-full max-w-4xl mx-auto px-4 pt-6 pb-4 sm:pt-8 sm:pb-6 flex flex-col items-center">
      {/* Top bar with Language Switcher and optional Reset */}
      <div className="w-full flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          {showReset && onReset && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs sm:text-sm font-medium text-amber-300/80 hover:text-amber-200 px-3 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              ← {t('common.back')}
            </button>
          )}
        </div>

        {/* Language Toggle */}
        <div
          role="group"
          aria-label="Language selection"
          className="inline-flex p-1 rounded-xl bg-slate-900/80 border border-slate-800 shadow-inner"
        >
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            aria-pressed={language === 'en'}
            className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              language === 'en'
                ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('vi')}
            aria-pressed={language === 'vi'}
            className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              language === 'vi'
                ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tiếng Việt
          </button>
        </div>
      </div>

      {/* Main Title & Mystical Emblem */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center gap-2 mb-1">
          <span className="text-amber-400 text-lg sm:text-xl select-none">✧</span>
          <span className="text-xs uppercase tracking-[0.25em] text-amber-300/80 font-mono">
            Arcanum Psychologicum
          </span>
          <span className="text-amber-400 text-lg sm:text-xl select-none">✧</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 bg-clip-text text-transparent drop-shadow-sm">
          {t('app.title')}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-lg mx-auto font-light leading-relaxed">
          {t('app.subtitle')}
        </p>
      </div>
    </header>
  );
}
