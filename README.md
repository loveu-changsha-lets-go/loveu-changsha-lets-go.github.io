# 长沙let's go！ V2

在原有单页基础上增量增强，保留紫色 / 黄色配色、五天全部行程、五个 Tab、餐厅区域分类、预约、交通酒店、资料来源与日历导出。没有引入 PWA、离线缓存或后台推送。

## 在电脑本地运行

需要 Node.js 24 或更新版本（使用内置 SQLite，不需要单独安装数据库）。

1. GitHub Desktop：`File > Clone repository > URL`，填写
   `https://github.com/loveu-changsha-lets-go/loveu-changsha-lets-go.github.io.git`。
2. 在 `Current branch` 选择 `codex/v2-trip-upgrade`；已克隆过则先 `Fetch origin`。
3. 用 Codex 桌面端打开该仓库文件夹。在该文件夹的终端运行：

```sh
npm ci
npm start
```

4. 浏览器打开 `http://127.0.0.1:4173`。直接双击 HTML 或仅使用静态服务器不能运行共享备忘。

也可以通过命令行克隆：

```sh
git clone --branch codex/v2-trip-upgrade https://github.com/loveu-changsha-lets-go/loveu-changsha-lets-go.github.io.git
cd loveu-changsha-lets-go.github.io
npm ci
npm start
```

## 双人协作

备忘 Tab 选择“我是吴 / 蔡”，创建共享旅行，再复制旅伴专属链接。两位旅伴拥有各自独立的访问凭证，留言自动保存、每 5 秒同步；只能编辑 / 删除自己的留言。记账、行李、任务和返程安排跟随同一份旅行同步。

SQLite 保存在 `.trip-data/trip.sqlite`（被 Git 忽略），持久化跨刷新和服务器重启。设备只保存主题、收起提醒、访问凭证和未提交草稿；旧版设备内的勾选在创建共享旅行后迁移。未连接时，旧版勾选仍可在当前设备使用，页面明确显示未同步。共享保存失败会保留输入，不显示虚假保存成功。

旅伴链接是访问凭证，仅发给旅伴。分享的是服务器当前地址：`127.0.0.1` 只能本机访问，不能把此地址当作已上线的公共链接。局域网测试可用 `HOST=0.0.0.0 npm start`（Windows PowerShell 先执行 `$env:HOST="0.0.0.0"`），并使用本机局域网 IP；该设置不能解决跨互联网访问。

## 公开网站与后端

公开网址 `https://loveu-changsha-lets-go.github.io/` 由 GitHub Pages 发布最新版。前端已连接云端 D1 保存服务，支持两人共享备忘、记账、任务和返程同步。

云端 API：`https://changsha-for-two-october.chy2026us.chatgpt.site/api/`。`cloud-worker.mjs` 实现身份与权限校验，`db/schema.ts` 和 `drizzle/` 维护数据库迁移。`build-cloud.mjs` 生成兼容云端的 Worker；云端发布沿用原攻略 Sites 项目。Github 页面使用云端 API，电脑本地运行仍使用同源 Node / SQLite 服务。

页面本身无需 GitHub 或 ChatGPT 登录。若访问者的网络无法直连 `chatgpt.site`，仍可查看攻略，但共享写入会提示失败并保留草稿，不能承诺该网络下的共享可用。不要把两人专属链接发到公共群，也不要把数据库、访问凭证或 `.env` 上传到公开仓库。

本地发布工作流使用 Node 24；云端使用 D1，迁移必须先生成并检查，已应用的迁移不要修改。云端生产版本应使用 `.openai/hosting.json` 的原项目身份，声明 `d1: "DB"`，运行构建并通过 Sites 发布，不通过 GitHub Pages 执行后端。

## 功能与维护

- `app.js`、`style.css`：保留原数据与渲染器；`index.html` 只增添 V2 脚本与样式引用。
- `enhancements.js` / `enhancements.css`：横向日期、旅伴标签与筛选、三种任务状态、整行勾选、搜索、主题、提示收起、返回顶部、临近 24 小时高亮、打卡、共享备忘、预算与修改记录。
- 返程资料只维护一个 `return` 设置，联动顶部、DAY5、票住与 ICS。默认缓冲保留原计划；修改时刻后应人工核对交通是否合适。
- 预约橙色提示依据攻略中的**计划检查截止时间**，不是未经核实的官方放号时间。
- PDF 按钮打开打印面板，选择“另存为 PDF”；打印样式输出完整五天与餐厅备选，隐藏导航、动画及表单。纯文本下载可转发，原 ICS 导出保留。
- `server.mjs`：静态资源白名单、共享旅行身份验证、预编译 SQL、房间隔离、留言与开销作者权限、参数验证。金额按整数分存储。

## 验证

```sh
npm run check
npm test
```

验证覆盖：两人读取相同备忘、跨作者 / 跨旅行写入拒绝、服务重启后保存、预算金额精度、数据文件不可下载、五个 Tab 与原内容、整行勾选、筛选、打卡、搜索、主题、返程与日历联动、留言自动保存、HTML 转义。

云端验收覆盖真实跨域请求、双人读取、作者删除权限与记账金额。浏览器交互和页面资源也会在发布后检查；真实手机 / 平板和 A4 打印仍建议在实际设备复核。
