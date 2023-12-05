# 清邁旅遊景點
#### 想知道清邁哪裡好玩？好吃？好逛？又或者哪個地方最多人討論？
#### 透過分類卡片一秒知悉景點資訊！
- Entry
![Entry](https://i.postimg.cc/htWGrBxz/entry.png)
- Home
![Home](https://i.postimg.cc/kXt4K4VP/home.png)
- Detail
![Detail](https://i.postimg.cc/sfLxMSgJ/detail.png)
- Comment
![Comment](https://i.postimg.cc/nrXLdV07/comment.png)
- Admin login
![Admin login](https://i.postimg.cc/Y0TCTcsP/login.png)
- Admin index
![Admin index](https://i.postimg.cc/d1H1mZmw/admin.png)

## 功能特色
- **類別卡片：** 使用者可以瀏覽全部的景點類別。
- **景點資訊：** 使用者可以透過類別進一步查看景點資訊。
- **留下評論：** 使用者不用登入就可以針對景點留下匿名評論。
- **討論熱度：** 使用者可以依據景點討論熱度查看最熱門的十大景點。
- **管理者入口：** 管理者可以透過專屬入口進行登入後台，同時並不對外開放註冊管理者帳號。
- **後台資訊：** 管理者可以瀏覽全部的景點資料。
- **篩選資訊：** 管理者可以透過類別篩選檢索景點資料。
- **新增資料：** 管理者擁有權限可以新增景點、類別資料。
- **修改資料：** 管理者擁有權限可以修改景點、類別資料。
- **刪除資料：** 管理者擁有權限可以刪除景點、類別資料。

## 測試帳號（管理者）
- **帳號：** root@example.com
- **密碼：** 12345678

## 快速開始
1. 將專案下載到本地
```
git clone https://github.com/Verna0214/ChingMai.git
```
2. 進入專案目錄
```
cd ChingMai
```
3. 安裝專案套件
```
npm install
```
4. 依據 `.env.example` 配置相關環境變數
```
touch .env
```
5. 建立資料表及種子資料
```
npm run prestart
```

6. 運行專案
```
npm run dev
```
7. 開啟瀏覽器，輸入網址 `http://localhost:3000`，使用測試帳號登入體驗。

## 技術概要
- **Node.js**
- **Express**
- **Handlebars**
- **MySQL**
- **MVC**
- **AWS Elastic Beanstalk & RDS deploy**
## 開發者
- Verna Chen