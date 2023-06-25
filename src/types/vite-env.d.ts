/// <reference types="vite/client" />
/// <reference types="dom-speech-recognition" />

interface ImportMetaEnv {
	readonly VITE_GOOGLE_MAPS_API_KEY: string;
	readonly VITE_TRPC_ENDPOINT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
