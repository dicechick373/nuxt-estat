# type-test

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## 環境変数

プロジェクト直下に.envファイルを作成して、eStat-APIのAPPIDを記載。
SITE_URLは開発環境と実行環境で分ける。

詳しい説明は[こちら](https://lg-note.com/2021/10/22/nuxt-estat-axios/)を参照。

```bash
ESTAT_APPID = '○○○○○○○○○○○○○○○○○'
SITE_URL = 'http://localhost:3000/'
```

都道府県リスト、市区町村リストは`data/codes`に保存しているが、resasから再取得したい場合は、RESAS_API_KEYも設定する。
詳しくは[こちら](https://lg-note.com/2021/10/14/nuxt-resas-axios/)を参照。

```bash
RESAS_API_KEY = '○○○○○○○○○○○○○○○○○'
```


