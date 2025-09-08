<p align="center">
  <a href="https://nestjs.com/" target="_blank" rel="noopener">
    <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
  </a>
</p>

# YT Extractor API

A **NestJS** API that uses **@distube/ytdl-core** to:

- fetch YouTube **file info** (title, author, description, thumbnails),
- list **available formats** (audio/video, itag, container, quality),
- and **download** the chosen format.

> ⚠️ For educational/personal use. Respect YouTube’s Terms of Service.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started (Run Locally)](#getting-started-run-locally)
- [Using Swagger (/api-docs)](#using-swagger-api-docs)
- [Author](#author)
- [License](#license)

---

## Features

- 📄 Get video/audio **metadata** by YouTube ID.
- 🧩 List **formats** with `itag`, `container`, `quality`, `type`.
- ⬇️ **Download** video/audio by `fileId` + `itag`.
- ❤️ Health checks.

---

## Tech Stack

- **NestJS** (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`)
- **@distube/ytdl-core** for YouTube extraction
- **Swagger** via `@nestjs/swagger` (served at **/api-docs**)
- **Jest** for testing
- **ESLint** + **Prettier** for code quality

---

## Getting Started (Run Locally)

> Prereqs: **Node 18+** recommended, **npm**.

```bash
# 1) Install dependencies
npm install

# 2) Start in dev mode (watch)
npm run start:dev
# or start normally
npm run start

# 3) Open the app
# Base URL:
#   http://localhost:3000
# Swagger UI:
#   http://localhost:3000/api-docs
```

## Using Swagger (/api-docs)

Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) and use **Try it out**:

### A) Get File Info

1. Go to **GET `/youtube/get-file-info`**
2. Click **Try it out**
3. Enter **`id`** (YouTube ID, e.g. `JzPfMbG1vrE`)
4. Click **Execute**
5. Inspect the response (title, description, thumbnails, etc.)

---

### B) Get Formats

1. Go to **GET `/youtube/get-file-formats-info`**
2. Click **Try it out**
3. Enter **`id`** (e.g. `JzPfMbG1vrE`)
4. Enter **`fileType`** (one of: `audioandvideo`, `videoandaudio`, `video`, `videoonly`, `audio`, `audioonly`)
5. Click **Execute**
6. From the response, pick a **format** and note its **`itag`** (and optionally `container`, `quality`, etc.)

---

### C) Download a File

1. Go to **POST `/youtube/download-file`**
2. Click **Try it out**
3. In the **Request body**, provide either:

```json
{
  "fileId": "JzPfMbG1vrE",
  "itag": 18,
  "type": "videoandaudio",
  "quality": "medium",
  "qualityLabel": "360p",
  "container": "mp4",
  "itag": 18
}
```

## Author

**Deepak Guptha Sitharaman**

- GitHub: [https://github.com/vzan2012](https://github.com/vzan2012)

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
