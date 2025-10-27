# UCF Dining Wait Times (CRA + Tailwind) — Ready to Deploy to GitHub Pages

This project is a Create React App project preconfigured with TailwindCSS and GitHub Pages deploy script.

## Local dev
1. unzip and `cd` into the folder
2. run:
```bash
npm install
npm start
```
Visit http://localhost:3000

## Deploy to GitHub Pages (project site)
I set `homepage` in package.json to:
```
https://jadynco.github.io/ucf-wait-app
```

Steps:
1. Create a new GitHub repository named `ucf-wait-app` under your account (https://github.com/Jadynco).
2. In the project folder:
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/Jadynco/ucf-wait-app.git
npm install
npm run deploy
```
`npm run deploy` will build and publish to the `gh-pages` branch and your site will be available at:
```
https://jadynco.github.io/ucf-wait-app
```

If you have any CI or custom domain needs, tell me and I can adjust.