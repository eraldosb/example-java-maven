import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Estender expect com matchers do jest-dom
expect.extend(matchers)

// Limpar após cada teste
afterEach(() => {
  cleanup()
})

// Configurações globais de teste
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock do IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock do matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})