1. Read Project_Context.md
2. Read Repo_map.md
3. Diagnose the problem.
4. Suggest a solution in easy to understand steps.
5. Ask to implement.

---

## Code Explanation Requirement

Every piece of code generated — new files, edited files, new functions, new API routes — must be accompanied by a plain English explanation following this exact format:

### Format

**One sentence saying what the file/function is for.**

Then explain each meaningful part as a numbered step. Each step must:

- Be written so a non-developer can understand it
- Explain the _why_, not just the _what_ — why is this done this way?
- Call out any security decisions (e.g. why `timingSafeEqual` instead of `===`)
- Call out any architectural decisions (e.g. why a job queue instead of processing inline)
- Use plain analogies where helpful (e.g. "like a wax seal on a letter")
- Be 1–3 sentences maximum per step

### Example

For a webhook verification function:

> This function checks that a message from Shopify is genuine before your app acts on it.
>
> 1. **Read the secret from your environment** — the secret is never hardcoded in the file itself; it lives in `.env.local` so it's never exposed in version control.
> 2. **Recompute the signature** — Shopify signed the message with your shared secret. You sign the same message yourself and compare the two signatures.
> 3. **Use timing-safe comparison** — instead of `===`, it uses `crypto.timingSafeEqual`. A regular equality check can leak information about the secret by returning faster when it matches early characters. Timing-safe comparison always takes the same amount of time.

### Rules

- The explanation must come **before** the code block is shown, not after.
- Never describe only what the code does line-by-line — always explain why each decision was made.
- If a new file connects to an existing file, show how they relate (e.g. "this handler is called by the queue you saw in Step 8").
- If a step in the code could have been done a different way, briefly say why the chosen approach was used instead.
- Complexity should match the code: a 3-line helper gets 2 sentences; a full webhook handler gets a full numbered breakdown.
