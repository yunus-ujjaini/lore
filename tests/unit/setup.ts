import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})
vi.stubGlobal('IntersectionObserver', mockIntersectionObserver)

// Mock scroll properties
Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })
Object.defineProperty(document.documentElement, 'scrollTop', {
  value: 0,
  writable: true,
  configurable: true,
})

// Mock matchMedia for prefers-reduced-motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
