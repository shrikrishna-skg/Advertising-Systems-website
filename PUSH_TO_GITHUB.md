# Push to GitHub (Advertising-Systems-website-test)

The repo is initialized and the CI/CD workflow is in `.github/workflows/ci.yml`. To connect and push:

## 1. Create the repository on GitHub

1. Go to **https://github.com/new**
2. Set **Repository name** to: `Advertising-Systems-website-test`
3. Leave it **empty** (do not add README, .gitignore, or license).
4. Click **Create repository**.

## 2. Add remote and push

Replace `YOUR_GITHUB_USERNAME` with your GitHub username, then run:

```bash
cd "/Users/shrikrishnagavhane/Library/CloudStorage/GoogleDrive-shrikrishna.skg@gmail.com/My Drive/Coding/13 March/advertisingsystems"

git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Advertising-Systems-website-test.git
git push -u origin main
```

If you use SSH:

```bash
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/Advertising-Systems-website-test.git
git push -u origin main
```

## CI/CD

On every push and pull request to `main`, GitHub Actions will:

- Use Node.js 22
- Run `npm ci` and `npm run build`

Workflow file: `.github/workflows/ci.yml`.
