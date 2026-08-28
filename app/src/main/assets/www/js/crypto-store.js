/* =====================================================================
   crypto-store.js
   تشفير حقيقي من جهة العميل باستخدام Web Crypto API (متوفرة داخل
   Android WebView الحديث). يستبدل هذا الملف الـ hash البدائي (DJB2)
   والتخزين النصي الصريح في localStorage.

   المبدأ:
   - من رمز الدخول (PIN) + Salt عشوائي لكل حساب، نشتق 512 بت عبر
     PBKDF2-SHA256 (150,000 تكرار).
   - النصف الأول (32 بايت) يُستخدم فقط للتحقق من صحة الـ PIN، ويُخزَّن
     في الحساب (verifier) — لا يمكن اشتقاق مفتاح التشفير منه وحده.
   - النصف الثاني (32 بايت) يُستخدم كمفتاح AES-GCM 256-bit لتشفير/فك
     تشفير دفتر الحركات (الرصيد + العمليات)، ويبقى في الذاكرة فقط
     طوال الجلسة (لا يُكتب أبداً على القرص).

   تنبيه صادق: هذا تحسين حقيقي وكبير عن الوضع السابق (لا تشفير إطلاقاً
   + hash قابل للكسر فوراً)، لكنه يبقى محدوداً بصغر مساحة PIN الرباعي
   (10,000 احتمال). التأخير المتعمد لـ PBKDF2 (150K تكرار) يجعل تجربة
   كل الاحتمالات محلياً تستغرق دقائق بدل أجزاء الثانية، وهو تحسين حقيقي
   وليس حلاً نهائياً — الحل الجذري الوحيد هو ربط مفتاح فعلي بـ Android
   Keystore/StrongBox عبر كود Kotlin أصلي، وهذا خارج نطاق ما يمكن
   إنجازه داخل WebView وحده.
   ===================================================================== */
(function (global) {
  "use strict";

  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const PBKDF2_ITERATIONS = 150000;

  function b64(buf) {
    const bytes = new Uint8Array(buf);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function unb64(str) {
    const bin = atob(str);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function randSalt() {
    return b64(crypto.getRandomValues(new Uint8Array(16)));
  }

  async function deriveMaterial(pin, saltB64) {
    const salt = unb64(saltB64);
    const baseKey = await crypto.subtle.importKey(
      "raw", enc.encode(String(pin)), "PBKDF2", false, ["deriveBits"]
    );
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
      baseKey, 512
    );
    return new Uint8Array(bits); // 64 بايت: [0..32) للتحقق، [32..64) للتشفير
  }

  /** يُستخدَم للتخزين والمقارنة فقط — لا يكشف مفتاح التشفير أبداً */
  async function pinVerifier(pin, saltB64) {
    const mat = await deriveMaterial(pin, saltB64);
    return b64(mat.slice(0, 32));
  }

  /** يُستخدَم في الذاكرة فقط طوال الجلسة — لا يُكتب على القرص أبداً */
  async function deriveAesKey(pin, saltB64) {
    const mat = await deriveMaterial(pin, saltB64);
    return crypto.subtle.importKey(
      "raw", mat.slice(32, 64), "AES-GCM", false, ["encrypt", "decrypt"]
    );
  }

  async function encryptWithKey(key, obj) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const data = enc.encode(JSON.stringify(obj));
    const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);
    return { iv: b64(iv), data: b64(cipher) };
  }

  async function decryptWithKey(key, payload) {
    const iv = unb64(payload.iv);
    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv }, key, unb64(payload.data)
    );
    return JSON.parse(dec.decode(plain));
  }

  global.SecureStore = { randSalt, pinVerifier, deriveAesKey, encryptWithKey, decryptWithKey };
})(window);
