const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
initializeApp({ credential: cert(serviceAccount) });
const email = process.argv[2];
if (!email) throw new Error('Usage: node set-admin.js user@example.com');
(async () => {
  const user = await getAuth().getUserByEmail(email);
  await getAuth().setCustomUserClaims(user.uid, { ...(user.customClaims || {}), admin: true });
  console.log('Admin claim set for UID:', user.uid, '— sign out/in to refresh the token.');
  process.exit(0);
})().catch(err => { console.error(err); process.exit(1); });