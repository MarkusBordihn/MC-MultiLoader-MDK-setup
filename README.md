# MC MultiLoader MDK

**MC MultiLoader MDK** is a project template designed to simplify the development of Minecraft mods compatible with multiple mod loaders, including **Forge**, **Fabric**, and **NeoForge**.

This repository includes a convenient `npx` command that allows you to quickly scaffold a new mod project using the MultiLoader setup.

## 🚀 Getting Started

To create a new mod project based on the MC MultiLoader MDK template, run the following command in your terminal:

```bash
npx mc-multi-loader-mdk new
```

This will generate a new project folder containing all the essential files and directory structure needed to begin development.

## Error Handling

### ❌ Error: `ENOENT: no such file or directory ...`

This error usually occurs when the command is executed in a directory that lacks a valid Node.js project setup.

#### 🔧 Solution

1. **Check Your Current Directory**
   Make sure you’re running the command in the directory where you want to create your new mod project.

2. **Initialize a Node.js Project**
   If the directory doesn't already contain a `package.json` file, you can quickly create one by running:

   ```bash
   npm init -y
   ```

This will generate a minimal `package.json` file, allowing tools like `npx` to function properly.

## ⚠️ Project Status

> **Note:** This project is currently **under active development** and may not yet be suitable for production use.
> Expect changes and improvements over time.
