# MDKs (Minecraft Development Kits)

This directory contains predefined multiloader MDKs to help you quickly set up and develop different types of Minecraft projects. 
Each MDK is tailored for a specific purpose, streamlining your development workflow.

## Adding a New MDK

To add a new MDK, use the `git submodule` command:

```bash
git submodule add -b <branch> <repository-url> <mdk-directory>
```

Replace the following placeholders with your specific values:

* `<branch>`: The branch of the MDK repository to use (e.g., `main`, `1.20.1`).
* `<repository-url>`: The URL of the MDK Git repository.
* `<mdk-directory>`: The local directory name where the MDK should be added.

> 💡 Tip: After adding a submodule, remember to commit the changes and update submodules with `git submodule update --init --recursive` when cloning the repository.
