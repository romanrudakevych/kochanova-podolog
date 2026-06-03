/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RESERVATION_EMBED_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}