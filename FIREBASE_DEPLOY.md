# QAZ LIVE — Firebase setup (free tier)

## Initial setup
1. In Firebase Console, enable Authentication > Email/Password.
2. Create a Cloud Firestore database.
3. From the repository root, sign in with Firebase CLI: `npm install -g firebase-tools`, then `firebase login`.
4. Deploy only Firestore rules: `firebase deploy --only firestore:rules`.
5. Cloudflare Pages builds the React app separately using `npm run build`.

This repository is configured to deploy Firestore rules only. Do not run `firebase deploy --only functions` or upgrade to Blaze just for this app. The app's social features use Firebase Authentication and Firestore within their free quotas.

## First administrator (manual, trusted operator only)
The admin interface checks the Firebase Authentication custom claim `admin: true`. A browser user cannot grant this claim to themself.

1. Sign in to the Firebase account that owns the project.
2. Download a service-account JSON from Firebase Console > Project settings > Service accounts. Keep it private; never commit it or upload it to Cloudflare.
3. From the repository root, install local dependencies: `cd functions && npm install && cd ..`.
4. Set `FIREBASE_SERVICE_ACCOUNT_PATH` to the local path of that private JSON file.
5. Run `node functions/set-admin.js your-login-email@example.com`.
6. Sign out and back in, or refresh the ID token, to load the new claim.
7. Deploy updated Firestore rules with `firebase deploy --only firestore:rules`.

The local script uses the Admin SDK from your trusted development environment; it does not deploy a Cloud Function. Never expose the service-account JSON, private key, or `FIREBASE_SERVICE_ACCOUNT_PATH` in GitHub, the browser, or Cloudflare environment variables.

## Admin capabilities without paid Cloud Functions
- The Admin page can review and approve QAZ LAB requests using Firestore rules protected by the `admin` custom claim.
- User blocking/unblocking is intentionally handled in Firebase Console > Authentication > Users. Securely changing Firebase Authentication accounts requires a trusted Admin SDK environment; the client app must not attempt to do it directly.

## Security notes
- Firestore rules verify admin privileges through `request.auth.token.admin == true`.
- Users cannot grant themselves `admin`, `disabled`, or `labAccess` by editing their profile.
- Comment counts are displayed from the comments subcollection once loaded rather than trusting client-side counter updates.
