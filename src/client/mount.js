import { createRoot } from 'react-dom/client';

import { createApp } from './base.tsx';

const rootElement = document.querySelector('main');

if (!rootElement.innerHTML) {
	createRoot(rootElement).render(createApp());
}
