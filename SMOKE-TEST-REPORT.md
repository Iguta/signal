# Smoke Test Report

- Command: `npm run preview -- --host 127.0.0.1 --port 4173 & sleep 2 && curl -I http://127.0.0.1:4173 | head -n 1 && kill $!`
- HTTP Status Line: `HTTP/1.1 200 OK`
- Timestamp: Sat, 31 Jan 2026 17:19:43 GMT
