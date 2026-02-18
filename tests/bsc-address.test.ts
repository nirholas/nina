/** ✨ built by nich */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const bscAddressPath = join(__dirname, '..', 'bsc.address');

describe('Onchain Proof — bsc.address Validation', () => {
  it('bsc.address file exists', () => {
    expect(existsSync(bscAddressPath)).toBe(true);
  });

  // Parse once for remaining tests
  const raw = existsSync(bscAddressPath)
    ? readFileSync(bscAddressPath, 'utf-8')
    : '{}';

  it('is valid JSON', () => {
    expect(() => JSON.parse(raw)).not.toThrow();
  });

  const data = JSON.parse(raw) as Record<string, unknown>;

  it('has projectName "BNB Chain AI Toolkit"', () => {
    expect(data.projectName).toBe('BNB Chain AI Toolkit');
  });

  // ---- network helpers ----
  const networks = (data.networks ?? []) as Array<Record<string, unknown>>;

  const findNetwork = (name: string) =>
    networks.find((n) => (n.name as string).includes(name));

  // ---- BSC Mainnet ----
  describe('BSC Mainnet contracts', () => {
    const mainnet = findNetwork('Mainnet');
    const contracts = (mainnet?.contracts ?? []) as Array<
      Record<string, unknown>
    >;

    it('has at least 2 mainnet contracts', () => {
      expect(contracts.length).toBeGreaterThanOrEqual(2);
    });

    it('each contract has address and explorerLink', () => {
      for (const c of contracts) {
        expect(typeof c.address).toBe('string');
        expect(typeof c.explorerLink).toBe('string');
      }
    });
  });

  // ---- BSC Testnet ----
  describe('BSC Testnet contracts', () => {
    const testnet = findNetwork('Testnet');
    const contracts = (testnet?.contracts ?? []) as Array<
      Record<string, unknown>
    >;

    it('has at least 3 testnet contracts', () => {
      expect(contracts.length).toBeGreaterThanOrEqual(3);
    });

    it('each contract has address and explorerLink', () => {
      for (const c of contracts) {
        expect(typeof c.address).toBe('string');
        expect(typeof c.explorerLink).toBe('string');
      }
    });
  });

  // ---- vanity prefix ----
  describe('Addresses start with 0x8004', () => {
    const allContracts = networks.flatMap(
      (n) => (n.contracts ?? []) as Array<Record<string, unknown>>,
    );

    for (const c of allContracts) {
      it(`${c.name ?? c.address} starts with 0x8004`, () => {
        expect((c.address as string).startsWith('0x8004')).toBe(true);
      });
    }
  });

  // ---- explorer links are valid URLs ----
  describe('Explorer links are valid URLs', () => {
    const allContracts = networks.flatMap(
      (n) => (n.contracts ?? []) as Array<Record<string, unknown>>,
    );

    for (const c of allContracts) {
      it(`${c.name ?? c.address} explorerLink starts with https://`, () => {
        expect((c.explorerLink as string).startsWith('https://')).toBe(true);
      });
    }
  });

  // ---- firstTransaction ----
  describe('firstTransaction', () => {
    const tx = data.firstTransaction as Record<string, unknown> | undefined;

    it('has a txHash', () => {
      expect(tx).toBeDefined();
      expect(typeof tx!.txHash).toBe('string');
      expect((tx!.txHash as string).length).toBeGreaterThan(0);
    });

    it('has an explorerLink', () => {
      expect(tx).toBeDefined();
      expect(typeof tx!.explorerLink).toBe('string');
      expect((tx!.explorerLink as string).startsWith('https://')).toBe(true);
    });
  });
});
