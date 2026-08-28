package com.noorwallet.app

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.webkit.WebSettingsCompat
import androidx.webkit.WebViewFeature

class MainActivity : ComponentActivity() {
    private lateinit var webView: WebView
    private var hasStartedOnce = false

    /** جسر اتصال آمن بين واجهة الويب والكود الأصلي لأندرويد */
    private inner class SecurityBridge {
        @JavascriptInterface
        fun setSecureScreen(enabled: Boolean) {
            runOnUiThread {
                if (enabled) {
                    window.setFlags(
                        WindowManager.LayoutParams.FLAG_SECURE,
                        WindowManager.LayoutParams.FLAG_SECURE
                    )
                } else {
                    window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
                }
            }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // منع تصوير الشاشة افتراضياً عند كل تشغيل (يمكن للمستخدم إيقافه مؤقتاً من الإعدادات)
        window.setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        )
        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            settings.setSupportZoom(false)
            setOnLongClickListener { true } // يمتص اللمس الطويل فيمنع قائمة "نسخ" الأصلية حتى لو تجاهل WebView إعداد CSS
            isHapticFeedbackEnabled = false
            addJavascriptInterface(SecurityBridge(), "Android")
            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest) = true
            }
            if (WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK)) {
                WebSettingsCompat.setForceDark(settings, WebSettingsCompat.FORCE_DARK_OFF)
            }
            loadUrl("file:///android_asset/www/index.html")
        }
        setContentView(webView)
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) webView.goBack() else finish()
            }
        })
    }

    override fun onResume() {
        super.onResume()
        // أول تشغيل: اترك التطبيق يعرض شاشة التسجيل/الدخول الطبيعية من نفسه.
        // أي عودة لاحقة من الخلفية: أعد قفل التطبيق إجبارياً لطلب الرمز من جديد.
        if (hasStartedOnce) {
            webView.evaluateJavascript("if(typeof relockApp==='function'){relockApp();}", null)
        }
        hasStartedOnce = true
    }
}
