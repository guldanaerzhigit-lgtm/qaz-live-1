const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

initializeApp();
const db = getFirestore();
function requireAdmin(request) {
  if (!request.auth) throw new HttpsError("unauthenticated", "Войдите в аккаунт.");
  if (request.auth.token.admin !== true) throw new HttpsError("permission-denied", "Требуются права администратора.");
}
exports.adminApproveLabRequest = onCall(async (request) => {
  requireAdmin(request);
  const requestId = String(request.data?.requestId || "");
  if (!requestId) throw new HttpsError("invalid-argument", "Не указан ID заявки.");
  const ref = db.collection("labRequests").doc(requestId);
  const snap = await ref.get();
  if (!snap.exists) throw new HttpsError("not-found", "Заявка не найдена.");
  const data = snap.data();
  await ref.update({ status: "approved", reviewedAt: FieldValue.serverTimestamp(), reviewedBy: request.auth.uid });
  await db.collection("users").doc(data.uid).set({ labAccess: true }, { merge: true });
  await db.collection("users").doc(data.uid).collection("notifications").add({
    type: "lab-approved", fromUid: request.auth.uid, fromName: "QAZ LIVE Admin",
    text: "Ваша заявка в QAZ LAB одобрена.", createdAt: FieldValue.serverTimestamp(), read: false
  });
  return { ok: true };
});
exports.adminListUsers = onCall(async (request) => {
  requireAdmin(request);
  const result = await getAuth().listUsers(1000);
  return { users: result.users.map(u => ({ uid: u.uid, email: u.email || "", displayName: u.displayName || "", disabled: u.disabled })) };
});
exports.adminSetUserDisabled = onCall(async (request) => {
  requireAdmin(request);
  const uid = String(request.data?.uid || "");
  const disabled = request.data?.disabled;
  if (!uid || typeof disabled !== "boolean") throw new HttpsError("invalid-argument", "Неверные параметры.");
  if (uid === request.auth.uid && disabled) throw new HttpsError("failed-precondition", "Нельзя заблокировать собственный аккаунт.");
  await getAuth().updateUser(uid, { disabled });
  return { ok: true };
});