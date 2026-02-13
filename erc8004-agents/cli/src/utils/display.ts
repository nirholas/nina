/**
 * Terminal display utilities — formatting, tables, colors.
 */

import chalk from 'chalk';
import Table from 'cli-table3';

/** BNB gold color */
export const gold = chalk.hex('#F0B90B');
/** Dim text */
export const dim = chalk.dim;
/** Success text */
export const success = chalk.green;
/** Error text */
export const error = chalk.red;
/** Warning text */
export const warn = chalk.yellow;
/** Link-style text */
export const link = chalk.cyan.underline;

/**
 * Print a styled header.
 */
export function header(text: string): void {
  console.log();
  console.log(gold.bold(`  🤖 ${text}`));
  console.log(gold('  ' + '─'.repeat(text.length + 3)));
  console.log();
}

/**
 * Print a key-value pair.
 */
export function field(label: string, value: string): void {
  console.log(`  ${dim(label + ':')} ${value}`);
}

/**
 * Print a section header.
 */
export function section(text: string): void {
  console.log();
  console.log(chalk.bold(`  ${text}`));
  console.log();
}

/**
 * Shorten an address.
 */
export function shortAddr(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Create a formatted table.
 */
export function createTable(headers: string[]): Table.Table {
  return new Table({
    head: headers.map((h) => gold.bold(h)),
    style: { head: [], border: [] },
    chars: {
      top: '─', 'top-mid': '┬', 'top-left': '┌', 'top-right': '┐',
      bottom: '─', 'bottom-mid': '┴', 'bottom-left': '└', 'bottom-right': '┘',
      left: '│', 'left-mid': '├', mid: '─', 'mid-mid': '┼',
      right: '│', 'right-mid': '┤', middle: '│',
    },
  });
}

/**
 * Print an explorer link.
 */
export function explorerLink(explorerUrl: string, type: 'tx' | 'address' | 'token', hash: string): string {
  const url = `${explorerUrl}/${type}/${hash}`;
  return link(url);
}

/**
 * Format a JSON object for display.
 */
export function prettyJson(obj: unknown): string {
  return JSON.stringify(obj, null, 2);
}

/**
 * Print an error message and optionally exit.
 */
export function printError(message: string, exit = false): void {
  console.error(error(`\n  ✗ ${message}\n`));
  if (exit) {
    process.exit(1);
  }
}

/**
 * Print a success message.
 */
export function printSuccess(message: string): void {
  console.log(success(`\n  ✓ ${message}\n`));
}

/**
 * Stars display for ratings.
 */
export function stars(rating: number, max = 5): string {
  return gold('★').repeat(rating) + dim('☆').repeat(max - rating);
}
