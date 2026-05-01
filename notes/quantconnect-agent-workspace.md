# QuantConnect Agent Workspace

This `codex-quantconnect` workspace maintains reusable Codex guidance, notes, prompts, and knowledge-base files for working with QuantConnect / Lean projects.

QuantConnect projects are opened individually through the QuantConnect VS Code extension as separate QC workspaces. This repository is not itself necessarily a QuantConnect algorithm project.

Standing project assumption: reusable guidance in this workspace should target Python QuantConnect / LEAN projects, not C# projects.

## Intended Workflow

1. Maintain the master AGENTS content in this workspace.
2. Copy `templates/AGENTS.quantconnect.md` into a QuantConnect project as `AGENTS.md`.
3. Open the QuantConnect project through the QuantConnect VS Code extension.
4. Use Codex in VS Code with that project open.
5. Return to this workspace when the reusable knowledge base needs to evolve.

This first setup does not add detailed QuantConnect knowledge yet.
