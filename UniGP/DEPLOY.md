# UniGP Project Page Deployment

Recommended URL:

```text
https://guoqincode.github.io/UniGP/
```

The repository name does not need to end with `.io`. A normal repository such as `guoqincode/UniGP` can serve a project page at `https://guoqincode.github.io/UniGP/` through GitHub Pages.

## Push to the UniGP repository

From a local clone of `https://github.com/guoqincode/UniGP`:

```bash
cd /path/to/UniGP
mkdir -p docs
rsync -av --delete /Users/guoqin/Downloads/ClaudeCode/ECCV_Arxiv_Camera/deliverables/UniGP_project_page/ docs/
git add docs
git commit -m "Add UniGP project page"
git push origin main
```

Then open GitHub:

```text
Settings -> Pages -> Build and deployment
Source: Deploy from a branch
Branch: main
Folder: /docs
Save
```

The project page will be available at:

```text
https://guoqincode.github.io/UniGP/
```
