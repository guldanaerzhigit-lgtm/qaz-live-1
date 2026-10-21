# QAZ LIVE — Firebase deployment

## Required setup
1. In Firebase Console, enable Authentication > Email/Password.
2. Create Firestore Database.
3. From the repository root, install Firebase CLI and sign in: `npm install -g firebase-tools`, `firebase login`.
4. Deploy Firestore rules and callable admin functions: `firebase deploy --only firestore:rules,functions`.
5. Cloudflare Pages builds the React app separately using `npm run build`.

## First administrator (manual, trusted operator only)
Admin rights are Firebase Authentication custom claims; a browser user cannot grant themself admin.
1. Download a service-account JSON from Firebase Console > Project settings > Service accounts. Keep it private and never commit it.
2. From the repository root, install the functions dependencies: `cd functions && npm install && cd ..`.
3. Set `FIREBASE_SERVICE_ACCOUNT_PATH` to the local path of that private JSON file.
4. Run `node functions/set-admin.js your-login-email@example.com`.
5. Sign out and back in to QAZ LIVE so the ID token refreshes. The Admin page will then appear.

## Security notes
- Never put a service-account JSON or private key in Cloudflare Pages, client-side code, or Git.
- The admin callable functions check the verified `admin` custom claim on the server.
- Firestore rules rely on the same custom claim for privileged operations.
- Deploy rules before using comments, follows, notifications, and QAZ LAB requests.
