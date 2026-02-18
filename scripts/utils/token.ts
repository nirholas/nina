import { encode } from 'gpt-tokenizer';

import { type LobeAgent } from '../schema/agentMeta';

/**
 * 计算 Agent 的 token 使用量
 * 计算 systemRole、openingMessage、openingQuestions、examples 等内容的 token 数量
 * @param agent Agent 对象
 * @returns token 使用量
 */
export function calculateTokenUsage(agent: LobeAgent): number {
  let totalTokens = 0;

  // Count systemRole tokens
  if (agent.config.systemRole) {
    totalTokens += encode(agent.config.systemRole).length;
  }

  // Count openingMessage tokens
  if ((agent as any).openingMessage) {
    totalTokens += encode((agent as any).openingMessage).length;
  }

  // Count openingQuestions tokens
  if ((agent as any).openingQuestions) {
    for (const q of (agent as any).openingQuestions) {
      totalTokens += encode(q).length;
    }
  }

  // Count example conversations tokens
  if ((agent as any).examples) {
    for (const ex of (agent as any).examples) {
      if (ex.content) {
        totalTokens += encode(ex.content).length;
      }
    }
  }

  // Count fewShots tokens
  if (agent.config.fewShots) {
    for (const shot of agent.config.fewShots) {
      if ((shot as any).content) {
        totalTokens += encode((shot as any).content).length;
      }
    }
  }

  return totalTokens;
}

/**
 * 更新 Agent 的 tokenUsage 字段
 * @param agent Agent 对象
 * @param force 是否强制重新计算，默认为 false
 * @returns 更新后的 Agent 对象
 */
export function updateAgentWithTokenUsage(agent: LobeAgent, force: boolean = false): LobeAgent {
  // 如果已经有 tokenUsage 且不强制重新计算，则跳过
  if (!force && agent.tokenUsage && agent.tokenUsage > 0) {
    return agent;
  }

  const tokenUsage = calculateTokenUsage(agent);
  return {
    ...agent,
    tokenUsage,
  };
}


