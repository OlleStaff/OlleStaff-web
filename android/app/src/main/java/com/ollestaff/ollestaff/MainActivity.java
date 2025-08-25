package com.ollestaff.ollestaff;

import com.getcapacitor.BridgeActivity;

import com.kakao.sdk.common.KakaoSdk;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Kakao SDK 초기화
        KakaoSdk.init(this, getString(R.string.kakao_app_key));
    }
}