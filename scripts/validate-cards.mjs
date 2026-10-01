#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const defaultCardsPath = path.join(rootDir, 'src', 'data', 'cards.json');

/**
 * Validates tarot cards dataset.
 *
 * @param {Array<any>} cards - The array of card objects to validate.
 * @param {Object} [options]
 * @param {boolean} [options.allowPartial=false] - If true, validates present cards without requiring all 78.
 * @returns {{ valid: boolean, errors: string[], summary: object }}
 */
export function validateCards(cards, options = {}) {
  const { allowPartial = false } = options;
  const errors = [];

  if (!Array.isArray(cards)) {
    return {
      valid: false,
      errors: ['Root of cards.json must be an Array'],
      summary: { total: 0, major: 0, minor: 0, suits: {} },
    };
  }

  const seenIds = new Set();
  const arcanaCounts = { major: 0, minor: 0 };
  const suitCounts = { wands: 0, cups: 0, swords: 0, pentacles: 0 };
  const validSuits = new Set(['wands', 'cups', 'swords', 'pentacles']);

  cards.forEach((card, index) => {
    const cardRef = `Card #${index + 1} (id: ${card?.id ?? 'missing'})`;

    if (!card || typeof card !== 'object') {
      errors.push(`${cardRef}: Card must be an object`);
      return;
    }

    // ID validation
    if (card.id === undefined || card.id === null) {
      errors.push(`${cardRef}: Missing id`);
      return;
    }

    const idNum = Number(card.id);
    if (!Number.isInteger(idNum) || idNum < 1 || idNum > 78) {
      errors.push(`${cardRef}: ID must be an integer between 1 and 78 (got "${card.id}")`);
    }

    const idStr = String(card.id);
    if (seenIds.has(idStr)) {
      errors.push(`${cardRef}: Duplicate id "${card.id}" found`);
    } else {
      seenIds.add(idStr);
    }

    // Arcana validation
    if (card.arcana !== 'major' && card.arcana !== 'minor') {
      errors.push(`${cardRef}: arcana must be "major" or "minor" (got "${card.arcana}")`);
    } else {
      arcanaCounts[card.arcana]++;
    }

    // Consistency check between ID, Arcana, and Suit
    if (Number.isInteger(idNum) && idNum >= 1 && idNum <= 22) {
      if (card.arcana !== 'major') {
        errors.push(`${cardRef}: Card with id ${idNum} belongs to Major Arcana, but arcana is "${card.arcana}"`);
      }
      if (card.suit !== null) {
        errors.push(`${cardRef}: Major Arcana card must have suit null (got "${card.suit}")`);
      }
    } else if (Number.isInteger(idNum) && idNum >= 23 && idNum <= 78) {
      if (card.arcana !== 'minor') {
        errors.push(`${cardRef}: Card with id ${idNum} belongs to Minor Arcana, but arcana is "${card.arcana}"`);
      }

      let expectedSuit = null;
      if (idNum >= 23 && idNum <= 36) expectedSuit = 'wands';
      else if (idNum >= 37 && idNum <= 50) expectedSuit = 'cups';
      else if (idNum >= 51 && idNum <= 64) expectedSuit = 'swords';
      else if (idNum >= 65 && idNum <= 78) expectedSuit = 'pentacles';

      if (card.suit !== expectedSuit) {
        errors.push(`${cardRef}: Expected suit "${expectedSuit}" for id ${idNum}, but got "${card.suit}"`);
      }
      if (validSuits.has(card.suit)) {
        suitCounts[card.suit]++;
      }
    }

    // Name validation
    if (!card.name || typeof card.name !== 'object') {
      errors.push(`${cardRef}: Missing or invalid "name" object`);
    } else {
      if (typeof card.name.en !== 'string' || card.name.en.trim() === '') {
        errors.push(`${cardRef}: "name.en" must be a non-empty string`);
      }
      if (typeof card.name.vi !== 'string' || card.name.vi.trim() === '') {
        errors.push(`${cardRef}: "name.vi" must be a non-empty string`);
      }
    }

    // Keywords validation
    if (!card.keywords || typeof card.keywords !== 'object') {
      errors.push(`${cardRef}: Missing or invalid "keywords" object`);
    } else {
      for (const orientation of ['upright', 'reversed']) {
        const orientationGroup = card.keywords[orientation];
        if (!orientationGroup || typeof orientationGroup !== 'object') {
          errors.push(`${cardRef}: Missing "keywords.${orientation}" object`);
          continue;
        }

        for (const lang of ['en', 'vi']) {
          const list = orientationGroup[lang];
          if (!Array.isArray(list)) {
            errors.push(`${cardRef}: "keywords.${orientation}.${lang}" must be an array`);
          } else {
            if (list.length < 3 || list.length > 5) {
              errors.push(
                `${cardRef}: "keywords.${orientation}.${lang}" must contain 3-5 keywords (found ${list.length})`
              );
            }
            list.forEach((kw, kwIdx) => {
              if (typeof kw !== 'string' || kw.trim() === '') {
                errors.push(
                  `${cardRef}: "keywords.${orientation}.${lang}[${kwIdx}]" must be a non-empty string`
                );
              }
            });
          }
        }
      }
    }
  });

  if (!allowPartial) {
    if (cards.length !== 78) {
      errors.push(`Total card count must be exactly 78 (found ${cards.length})`);
    }
    if (seenIds.size !== 78) {
      errors.push(`Expected 78 unique IDs (found ${seenIds.size})`);
    }
    for (let i = 1; i <= 78; i++) {
      if (!seenIds.has(String(i))) {
        errors.push(`Missing card with ID "${i}"`);
      }
    }
    if (arcanaCounts.major !== 22) {
      errors.push(`Expected 22 Major Arcana cards (found ${arcanaCounts.major})`);
    }
    if (arcanaCounts.minor !== 56) {
      errors.push(`Expected 56 Minor Arcana cards (found ${arcanaCounts.minor})`);
    }
    for (const suit of ['wands', 'cups', 'swords', 'pentacles']) {
      if (suitCounts[suit] !== 14) {
        errors.push(`Expected 14 "${suit}" cards (found ${suitCounts[suit]})`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    summary: {
      total: cards.length,
      major: arcanaCounts.major,
      minor: arcanaCounts.minor,
      suits: suitCounts,
    },
  };
}

// CLI execution
const isCli = process.argv[1] && (
  process.argv[1].endsWith('validate-cards.mjs') ||
  process.argv[1].includes('validate-cards')
);

if (isCli) {
  const args = process.argv.slice(2);
  const allowPartial = args.includes('--partial') || args.some((a) => a.startsWith('--batch'));
  const targetPath = args.find((a) => !a.startsWith('--')) ?? defaultCardsPath;

  if (!fs.existsSync(targetPath)) {
    console.error(`Error: cards.json not found at: ${targetPath}`);
    process.exit(1);
  }

  let cardsData;
  try {
    const raw = fs.readFileSync(targetPath, 'utf8');
    cardsData = JSON.parse(raw);
  } catch (err) {
    console.error(`Error parsing cards JSON: ${err.message}`);
    process.exit(1);
  }

  const result = validateCards(cardsData, { allowPartial });

  console.log('--- Tarot Cards Validation Report ---');
  console.log(`Path: ${targetPath}`);
  console.log(`Mode: ${allowPartial ? 'Partial (batch validation)' : 'Full (78 cards strict)'}`);
  console.log(`Total Cards: ${result.summary.total}`);
  console.log(`Major Arcana: ${result.summary.major}/22`);
  console.log(`Minor Arcana: ${result.summary.minor}/56`);
  console.log(
    `  - Wands: ${result.summary.suits.wands}/14, Cups: ${result.summary.suits.cups}/14, Swords: ${result.summary.suits.swords}/14, Pentacles: ${result.summary.suits.pentacles}/14`
  );

  if (!result.valid) {
    console.error(`\nValidation FAILED with ${result.errors.length} error(s):`);
    result.errors.slice(0, 20).forEach((err) => console.error(`  - ${err}`));
    if (result.errors.length > 20) {
      console.error(`  ...and ${result.errors.length - 20} more errors`);
    }
    process.exit(1);
  }

  console.log('\n[PASS] All card validation rules passed successfully.');
  process.exit(0);
}
