/** ✨ built by nich */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const localesDir = join(__dirname, '..', 'locales');
const agentsDir = join(__dirname, '..', 'agents', 'bnb-chain-agents');

const localeDirs = readdirSync(localesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

/** Build set of known agent identifiers from agent JSONs */
const excludedAgentFiles = [
  'agent-template.json',
  'agent-template-full.json',
  'agents-manifest.json',
];
const agentIdentifiers = new Set(
  readdirSync(agentsDir)
    .filter((f) => f.endsWith('.json') && !excludedAgentFiles.includes(f))
    .map((f) => f.replace(/\.json$/, '')),
);

describe('Translation / Locale Validation', () => {
  // ---- each locale dir has index.json ----
  describe('Each locale directory has an index.json', () => {
    for (const dir of localeDirs) {
      it(`${dir}/index.json exists`, () => {
        const p = join(localesDir, dir, 'index.json');
        expect(existsSync(p)).toBe(true);
      });
    }
  });

  // ---- locale files are valid JSON ----
  describe('Locale files are valid JSON', () => {
    for (const dir of localeDirs) {
      it(`${dir}/index.json is valid JSON`, () => {
        const raw = readFileSync(join(localesDir, dir, 'index.json'), 'utf-8');
        expect(() => JSON.parse(raw)).not.toThrow();
      });
    }
  });

  // ---- locale files have required fields ----
  describe('Locale files have required fields', () => {
    for (const dir of localeDirs) {
      describe(dir, () => {
        const data = JSON.parse(
          readFileSync(join(localesDir, dir, 'index.json'), 'utf-8'),
        ) as Record<string, unknown>;
        const config = data.config as Record<string, unknown> | undefined;
        const meta = data.meta as Record<string, unknown> | undefined;

        it('has config.systemRole', () => {
          expect(config).toBeDefined();
          expect(typeof config!.systemRole).toBe('string');
        });

        it('has config.openingMessage', () => {
          expect(config).toBeDefined();
          expect(typeof config!.openingMessage).toBe('string');
        });

        it('has meta.title', () => {
          expect(meta).toBeDefined();
          expect(typeof meta!.title).toBe('string');
        });

        it('has meta.description', () => {
          expect(meta).toBeDefined();
          expect(typeof meta!.description).toBe('string');
        });
      });
    }
  });

  // ---- locale count ----
  it('should have at least 25 locale directories', () => {
    expect(localeDirs.length).toBeGreaterThanOrEqual(25);
  });

  // ---- locale names match agent identifiers ----
  describe('Locale names match agent identifiers', () => {
    for (const dir of localeDirs) {
      it(`${dir} corresponds to a known agent identifier`, () => {
        expect(agentIdentifiers.has(dir)).toBe(true);
      });
    }
  });
});
