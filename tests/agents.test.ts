/** ✨ built by nich */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const agentsDir = join(__dirname, '..', 'agents', 'bnb-chain-agents');

const allFiles = readdirSync(agentsDir).filter((f) => f.endsWith('.json'));

const excludedFiles = [
  'agent-template.json',
  'agent-template-full.json',
  'agents-manifest.json',
];

const agentFiles = allFiles.filter((f) => !excludedFiles.includes(f));

/** Parse every agent JSON once and reuse across tests */
const agents = agentFiles.map((file) => {
  const raw = readFileSync(join(agentsDir, file), 'utf-8');
  return { file, data: JSON.parse(raw) as Record<string, unknown> };
});

describe('Agent Definition Validation', () => {
  // ---- valid JSON ----
  describe('All agent JSONs are valid JSON', () => {
    for (const file of allFiles) {
      it(`${file} is valid JSON`, () => {
        const raw = readFileSync(join(agentsDir, file), 'utf-8');
        expect(() => JSON.parse(raw)).not.toThrow();
      });
    }
  });

  // ---- required fields ----
  describe('Required fields exist', () => {
    for (const { file, data } of agents) {
      describe(file, () => {
        const config = data.config as Record<string, unknown> | undefined;
        const meta = data.meta as Record<string, unknown> | undefined;

        it('has config.systemRole as a non-empty string', () => {
          expect(config).toBeDefined();
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          expect(typeof config!.systemRole).toBe('string');
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          expect((config!.systemRole as string).length).toBeGreaterThan(0);
        });

        it('has config.openingMessage as a string', () => {
          expect(config).toBeDefined();
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          expect(typeof config!.openingMessage).toBe('string');
        });

        it('has identifier as a string', () => {
          expect(typeof data.identifier).toBe('string');
        });

        it('has meta.title as a string', () => {
          expect(meta).toBeDefined();
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          expect(typeof meta!.title).toBe('string');
        });

        it('has meta.description as a string', () => {
          expect(meta).toBeDefined();
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          expect(typeof meta!.description).toBe('string');
        });

        it('has schemaVersion as a number', () => {
          expect(typeof data.schemaVersion).toBe('number');
        });
      });
    }
  });

  // ---- no duplicate identifiers ----
  it('has no duplicate identifiers', () => {
    const ids = agents.map((a) => a.data.identifier);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  // ---- systemRole is substantial ----
  describe('systemRole is substantial (≥ 100 chars)', () => {
    for (const { file, data } of agents) {
      it(`${file} systemRole is at least 100 characters`, () => {
        const config = data.config as Record<string, unknown>;
        const role = config.systemRole as string;
        expect(role.length).toBeGreaterThanOrEqual(100);
      });
    }
  });

  // ---- MCP plugins ----
  describe('MCP plugins referenced', () => {
    for (const { file, data } of agents) {
      it(`${file} plugins (if present) is an array of strings`, () => {
        const config = data.config as Record<string, unknown>;
        if (config.plugins !== undefined) {
          expect(Array.isArray(config.plugins)).toBe(true);
          for (const p of config.plugins as unknown[]) {
            expect(typeof p).toBe('string');
          }
        }
      });
    }
  });

  // ---- tags are arrays ----
  describe('Tags are arrays', () => {
    for (const { file, data } of agents) {
      it(`${file} meta.tags is an array`, () => {
        const meta = data.meta as Record<string, unknown>;
        expect(Array.isArray(meta.tags)).toBe(true);
      });
    }
  });

  // ---- category is set ----
  describe('Category is set', () => {
    for (const { file, data } of agents) {
      it(`${file} meta.category is a non-empty string`, () => {
        const meta = data.meta as Record<string, unknown>;
        expect(typeof meta.category).toBe('string');
        expect((meta.category as string).length).toBeGreaterThan(0);
      });
    }
  });

  // ---- agent count ----
  it('should have at least 30 agent JSON files', () => {
    expect(agentFiles.length).toBeGreaterThanOrEqual(30);
  });

  // ---- template files exist ----
  describe('Template files exist', () => {
    it('agent-template.json exists', () => {
      expect(allFiles).toContain('agent-template.json');
    });

    it('agent-template-full.json exists', () => {
      expect(allFiles).toContain('agent-template-full.json');
    });
  });
});
