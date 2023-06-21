import { createRoot } from 'react-dom/client';

import { createApp } from './base';

const rootElement = document.querySelector('main');

if (!rootElement.innerHTML) {
	createRoot(rootElement).render(createApp());
}
