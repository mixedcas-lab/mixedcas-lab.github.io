# Working on MCAS Lab

- Read `AI-HANDOFF.md` and `docs/CONTENT-REVIEW.ko.md` first.
- This is an Astro static website for GitHub Pages. Preserve the stack and local assets unless the user asks for a change.
- Edit content in `src/data/`; edit presentation in `src/pages/`, `src/components/`, `src/layouts/`, and `public/styles.css`. Never edit generated `dist/` as source.
- Keep relative internal links working both at the domain root and under a repository prefix.
- Do not invent publication status, author names, affiliations, member status, DOI links, or performance figures. Preserve the evidence and known source conflicts.
- Run `pnpm build` and `pnpm validate` after changes. Perform browser checks appropriate to the change.
- Keep `pnpm-lock.yaml` and package versions consistent. No secrets or private material belong in the site.
- GitHub deployment and the existing ADC Census repository are separate. Follow the human user's requested repository and publication scope.
