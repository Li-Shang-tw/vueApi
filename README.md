# vueApi

##UserStroy
###登入
 1.使用者會先進入登入畫面，登入成功後才能進入後台商品檢視畫面
 2.登入失敗(帳密錯誤)，會alert出錯誤訊息，無法進入後台畫面。
 3.如果狀態已登入(cookie以儲存登入token)，輸入網址時會，會自動進入後台檢視畫面。

###後台商品檢視戶面
 1.使用者可以看到商品列表
 2.使用者可以新增商品(預設寫死的商品)
 3.使用者可以刪除商品
 4. 2.3 都會重新取得資料庫的商品列表，即時呈現資料庫商品的內容