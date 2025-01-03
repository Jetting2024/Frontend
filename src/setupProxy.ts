import { Application } from "express"; // Express 타입을 가져옴
import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = (app: Application) => {
    // API 요청 프록시
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
            pathRewrite: { "^/api": "" },
        })
    );

    // WebSocket 요청 프록시
    app.use(
        "ws",
        createProxyMiddleware({
            target: "http://localhost:8080",
            ws: true,
        })
    )
}