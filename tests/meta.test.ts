/** ✨ built by nich */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const metaPath = join(__dirname, '..', 'meta.json');
const packagePath = join(__dirname, '..', 'package.json');

describe('Project Metadata', () => {
  // ---- meta.json ----
  describe('meta.json', () => {
    it('exists', () => {
      expect(existsSync(metaPath)).toBe(true);
    });

    it('is valid JSON', () => {
      const raw = readFileSync(metaPath, 'utf-8');
      expect(() => JSON.parse(raw)).not.toThrow();
    });

    const data = JSON.parse(readFileSync(metaPath, 'utf-8')) as Record<string, unknown>;

    it('has project name', () => {
      expect(data).toHaveProperty('project');
      expect(typeof data.project).toBe('string');
    });

    it('has author', () => {
      expect(data).toHaveProperty('author');
    });

    it('has ecosystem set to BNB Chain', () => {
      expect(data.ecosystem).toBe('BNB Chain');
    });

    it('has components array', () => {
      expect(Array.isArray(data.components)).toBe(true);
      const components = data.components as string[];
      expect(components).toContain('agents');
      expect(components).toContain('mcp-servers');
    });

    it('has agentCount >= 78', () => {
      expect(data.agentCount).toBeGreaterThanOrEqual(78);
    });

    it('has mcpServerCount >= 6', () => {
      expect(data.mcpServerCount).toBeGreaterThanOrEqual(6);
    });

    it('has toolCount >= 1100', () => {
      expect(data.toolCount).toBeGreaterThanOrEqual(1100);
    });
  });

  // ---- package.json ----
  describe('package.json', () => {
    const pkg = JSON.parse(readFileSync(packagePath, 'utf-8')) as Record<string, unknown>;

    it('has name "bnb-chain-toolkit"', () => {
      expect(pkg.name).toBe('bnb-chain-toolkit');
    });

    it('has version', () => {
      expect(pkg).toHaveProperty('version');
      expect(typeof pkg.version).toBe('string');
    });

    it('has description mentioning BNB Chain', () => {
      expect(typeof pkg.description).toBe('string');
      expect((pkg.description as string).toLowerCase()).toContain('bnb chain');
    });

    it('has repository URL', () => {
      const repo = pkg.repository as Record<string, unknown>;
      expect(repo).toHaveProperty('url');
      expect((repo.url as string)).toContain('bnb-chain-toolkit');
    });

    it('has a valid open-source license', () => {
      const license = (pkg.license as string)?.toUpperCase();
      const validLicenses = ['MIT', 'APACHE-2.0', 'ISC', 'BSD-2-CLAUSE', 'BSD-3-CLAUSE'];
      expect(validLicenses).toContain(license);
    });

    it('has required scripts', () => {
      const scripts = pkg.scripts as Record<string, string>;
      expect(scripts).toHaveProperty('build');
      expect(scripts).toHaveProperty('test');
      expect(scripts).toHaveProperty('lint');
    });
  });
});
