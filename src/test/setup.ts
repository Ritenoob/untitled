import '@testing-library/jest-dom'

global.window.spark = {
  llmPrompt: (strings: string[], ...values: unknown[]) => {
    return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '')
  },
  llm: async () => 'mock response',
  user: async () => ({
    avatarUrl: 'https://example.com/avatar.png',
    email: 'test@example.com',
    id: 123456,
    isOwner: true,
    login: 'testuser',
  }),
  kv: {
    keys: async () => [],
    get: async () => undefined,
    set: async () => {},
    delete: async () => {},
  },
}
