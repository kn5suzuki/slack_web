# Slack Web App

## はじめに

[公式ページ](https://api.slack.com/apps)からアプリを作成し、slack の token を入手する必要がある
必要な権限

## 開発セットアップ

フロントのパッケージインストール

```
docker compose run frontend npm install
```

`frontend/.env`に以下のようにバックエンドの url を追加

```
VITE_BACKEND_URL = "http://localhost:8000/"
```

起動

```
docker compose up
```

5173 ポートでアクセスできる

## デプロイ

### フロントエンド

`frontend/.env`に以下のようにバックエンドの url を追加

```
VITE_BACKEND_URL = "http://localhost:8000/"
```

パッケージインストールとビルド

```
docker compose run frontend npm install && npm run build
```

### バックエンド

コンテナを立てる

```
docker build -t slack_web_backend .
docker run -d --name slack_web_backend -p 8000:8000 slack_web_backend
```

### Nginx を利用する場合

```
server {
	root path to/frontend/dist;
    location /backend {
        proxy_pass http://localhost:8000/;
    }
}
```
