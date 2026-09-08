import "@testing-library/jest-dom/vitest";

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserverStub;
}

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

