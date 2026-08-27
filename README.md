# زاد — Android WebView

تطبيق محفظة إلكترونية عربي RTL بواجهة WebView أصلية، مبني بأندرويد Gradle Plugin 8.5.2 و Kotlin 2.0.20.

## البناء
يتطلب JDK 17 و Android SDK 35. من مجلد المشروع:

```bash
gradle :app:assembleDebug
gradle :app:assembleRelease
```

لإصدار موقّع، عرّف `ANDROID_KEYSTORE_PATH` و`ANDROID_KEYSTORE_PASSWORD` و`ANDROID_KEY_ALIAS` و`ANDROID_KEY_PASSWORD`. عند غيابها يستخدم الإصدار المحلي توقيع debug حتى يبقى البناء المحلي قابلاً للتنفيذ.

## GitHub Actions
أضف أسرار المستودع: `ANDROID_KEYSTORE_BASE64` و`ANDROID_KEYSTORE_PASSWORD` و`ANDROID_KEY_ALIAS` و`ANDROID_KEY_PASSWORD`. سيتم بناء APK موقّع ورفعه كـ Artifact عند الدفع إلى `main` أو `master`.

الواجهة الحالية تعمل محلياً ببيانات تجريبية آمنة لتوضيح تجربة المحفظة. اربط طبقة API موثوقة قبل التعامل مع أموال حقيقية.