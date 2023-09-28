# Slack Web App

## はじめに

[公式ページ](https://api.slack.com/apps)から slack アプリを作成し、token を入手する必要がある

### 必要な権限

- channels:history
- channels:read
- groups:history
- groups:read
- chat:write
- im:history
- mpim:history
- reactions:read

## アプリの説明

最初に作成した自分のトークンを入力する

## 開発セットアップ

フロントのパッケージインストール

```
docker compose run frontend npm install
```

`frontend/.env`に以下のようにバックエンドの url を追加（最後の/まで入れること）

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
VITE_BACKEND_URL = "http://hostname/backend/"
```

パッケージインストールとビルド

```
docker compose run frontend npm install
docker compose run frontend npm run build
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
	location / {
        	root path-to/frontend/dist;
        	try_files $uri $uri/ =404;
    	}
	location /backend/ {
        	proxy_pass http://localhost:8000/;
        	proxy_set_header Host $host;
        	proxy_set_header X-Real-IP $remote_addr;
       		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        	proxy_set_header X-Forwarded-Proto $scheme;
    	}
}
```
