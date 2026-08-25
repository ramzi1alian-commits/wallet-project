(function () {
  "use strict";
  const ar = {
    appName:"نور", welcome:"مرحباً بعودتك", loginHint:"سجّل دخولك إلى محفظتك الآمنة", royalWelcome:"محفظتك، بأمان ملكي",
    phone:"رقم الجوال", password:"كلمة المرور", login:"تسجيل الدخول", forgot:"نسيت كلمة المرور؟",
    secure:"تشفير من الطرف إلى الطرف", balance:"الرصيد المتاح", hide:"إخفاء الرصيد", show:"إظهار الرصيد",
    addMoney:"إضافة أموال", send:"إرسال", receive:"استلام", pay:"دفع فاتورة", recent:"آخر العمليات",
    all:"الكل", income:"إيداع", expense:"مصروف", invoice:"الفواتير", settle:"تسديد الآن",
    transfer:"تحويل سريع", recipient:"المستلم", amount:"المبلغ", note:"ملاحظة اختيارية", continue:"متابعة",
    home:"الرئيسية", activity:"النشاط", stats:"الإحصاءات", settings:"الإعدادات", notifications:"الإشعارات",
    security:"الأمان والخصوصية", biometric:"الدخول بالبصمة", twoFactor:"التحقق بخطوتين",
    alerts:"تنبيهات العمليات", language:"اللغة", logout:"تسجيل الخروج", today:"اليوم",
    invoiceTitle:"فواتير مستحقة", total:"الإجمالي", success:"تمت العملية بنجاح", cancel:"إلغاء",
    admin:"الإدارة", encrypted:"محمي ومشفّر", hello:"أهلاً أحمد", viewAll:"عرض الكل",
    electricity:"كهرباء", internet:"إنترنت", water:"مياه", coffee:"مقهى نور",
    dynamicPin:"رمز الدخول الديناميكي", panic:"دخول الطوارئ الآمن", privacy:"خصوصية",
    privacyShow:"إظهار", privacyHide:"إخفاء", currencies:"العملات", yer:"ريال يمني",
    sar:"ريال سعودي", usd:"دولار أمريكي", mainWallet:"المحفظة الرئيسية",
    savingsGoal:"هدف الادخار", kidsWallet:"مصروف الأطفال", remittance:"شبكة الحوالات المحلية",
    kuraimi:"الكريمي", alnajm:"النجم", kuraimiExpress:"كريمي إكسبرس",
    splitBill:"تقسيم الفاتورة", people:"عدد الأشخاص", share:"حصة كل شخص", commission:"العمولة",
    broadcast:"بث طلبات الدفع", voucherStore:"متجر القسائم", buyNow:"شراء الآن",
    yemenMobile:"يمن موبايل", sabafon:"سبأفون", you:"YOU", yTelecom:"Y-Telecom",
    adenNet:"عدن نت", gaming:"ألعاب رقمية", roundups:"التقريب والادخار",
    analyst:"محلل المصروفات الذكي", shopping:"تسوق", bills:"فواتير", entertainment:"ترفيه",
    qrScanner:"ماسح QR", walletId:"معرّف المحفظة", phoneTransfer:"رقم الجوال",
    cameraHook:"كاميرا QR جاهزة للربط عبر CameraX", simulatedRate:"سعر محاكاة آمن"
  };
  window.I18N = { ar };
  window.t = function (key) { return ar[key] || key; };
  document.documentElement.lang = "ar";
  document.documentElement.dir = "rtl";
})();