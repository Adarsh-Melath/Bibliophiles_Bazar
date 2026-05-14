import serve from 'serve';
import { spawn } from 'child_process';

// Start the server
const server = serve('dist', {
    port: 5000,
    noCors: true,
});

console.log('Lighthouse test server running on http://localhost:5000');

// Keep process alive
server.listen();
