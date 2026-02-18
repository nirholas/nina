/** ✨ built by nich */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const schemaPath = join(__dirname, '..', 'schema', 'speraxAgentSchema_v1.json');
const schema = JSON.parse(readFileSync(schemaPath, 'utf-8')) as Record<string, unknown>;

const agentsDir = join(__dirname, '..', 'agents', 'bnb-chain-agents');
const excludedFiles = [
  'agent-template.json',
  'agent-template-full.json',
  'agents-manifest.json',
];
const agentFiles = readdirSync(agentsDir)
  .filter((f) => f.endsWith('.json') && !excludedFiles.includes(f));

describe('JSON Schema Validation', () => {
  // ---- schema itself is valid ----
  it('schema file is valid JSON', () => {
    const raw = readFileSync(schemaPath, 'utf-8');
    expect(() => JSON.parse(raw)).not.toThrow();
  });

  // ---- schema has required top-level properties ----
  describe('Schema defines expected properties', () => {
    const props = schema.properties as Record<string, unknown>;

    it('defines "author"', () => {
      expect(props).toHaveProperty('author');
    });

    it('defines "config"', () => {
      expect(props).toHaveProperty('config');
    });

    it('defines "identifier"', () => {
      expect(props).toHaveProperty('identifier');
    });

    it('defines "meta"', () => {
      expect(props).toHaveProperty('meta');
    });

    it('defines "schemaVersion"', () => {
      expect(props).toHaveProperty('schemaVersion');
    });

    it('defines "createdAt"', () => {
      expect(props).toHaveProperty('createdAt');
    });

    it('defines "homepage"', () => {
      expect(props).toHaveProperty('homepage');
    });

    it('has a required array', () => {
      expect(Array.isArray(schema.required)).toBe(true);
      expect((schema.required as string[]).length).toBeGreaterThan(0);
    });
  });

  // ---- schema config sub-properties ----
  describe('Schema config section defines key sub-properties', () => {
    const configProps = (
      (schema.properties as Record<string, Record<string, unknown>>).config
        .properties as Record<string, unknown>
    );

    it('config defines systemRole', () => {
      expect(configProps).toHaveProperty('systemRole');
    });

    it('config defines openingMessage', () => {
      expect(configProps).toHaveProperty('openingMessage');
    });

    it('config defines plugins', () => {
      expect(configProps).toHaveProperty('plugins');
    });
  });

  // ---- agents conform to schema structure ----
  describe('All agents conform to schema structure', () => {
    const schemaProps = schema.properties as Record<string, unknown>;
    const schemaRequired = schema.required as string[];

    for (const file of agentFiles) {
      describe(file, () => {
        const agentRaw = readFileSync(join(agentsDir, file), 'utf-8');
        const agent = JSON.parse(agentRaw) as Record<string, unknown>;

        it('has all schema-required top-level fields', () => {
          for (const key of schemaRequired) {
            expect(agent).toHaveProperty(key);
          }
        });

        it('does not contain unknown top-level fields', () => {
          for (const key of Object.keys(agent)) {
            expect(schemaProps).toHaveProperty(key);
          }
        });

        it('meta has all schema-required meta fields', () => {
          const metaSchemaDef = schemaProps.meta as Record<string, unknown>;
          const metaRequired = metaSchemaDef.required as string[] | undefined;
          if (metaRequired) {
            const meta = agent.meta as Record<string, unknown>;
            for (const key of metaRequired) {
              expect(meta).toHaveProperty(key);
            }
          }
        });

        it('config.systemRole is a string', () => {
          const config = agent.config as Record<string, unknown>;
          expect(typeof config.systemRole).toBe('string');
        });
      });
    }
  });
});
