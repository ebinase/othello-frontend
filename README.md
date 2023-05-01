## 💬 About this app
Next.js製のオセロ（reversi）をプレイできるWebアプリです。
<img width="1042" alt="スクリーンショット 2023-04-30 15 04 23" src="https://user-images.githubusercontent.com/54468945/235341390-7753d8a1-3ae6-4a41-9043-6af09d964478.png">

## 📣 Status
🔧 In progress
開発状況はZennのスクラップにまとめています。

https://zenn.dev/ebiiina/scraps/6da46f891a9a7f

## 🚀 Getting started

### Prerequisites / 必要条件
* npm 16.8 or later

Next.jsの動作条件に準じます
https://beta.nextjs.org/docs/upgrade-guide#nodejs-version


### Installing / インストール
以下の手順に従って、アプリをローカルにインストールしてください。

1. このリポジトリをクローンするか、ZIPファイルとしてダウンロードしてください。
```shell
# https
$ git clone https://github.com/ebinase/othello-frontend.git
# ssh
$ git clone git@github.com:ebinase/othello-frontend.git
```

2. ディレクトリを移動
```shell
$ cd othello-frontend
```

3. 依存関係をインストール
```shell
$ npm install
```

4. 開発サーバーを起動
```shell
$ npm run dev
```

以上で、ブラウザでアプリを開くことができます。


## 🎮 機能一覧
- Botと対戦機能
  - 現在、モンテカルロ木探索を利用した強めのBotが起動するよう設定中
  - 先行/後攻、対戦相手の変更は今はできません🙏
- 初回ロード以降、オフラインでプレイ可能

## 🖥️ 動作環境
このアプリは、次の環境で動作を確認しています。

* Google Chrome（最新版）
* Safari（最新版）


## ライセンス情報
ライセンスは未設定です

## 今後の開発方針
エージェントアーキテクチャの導入や対戦設定機能の追加、Botの強さの調整などを予定しています
