# Flux AP Physics C E&M Expedition

Flux is a buildless GitHub Pages study site for AP Physics C: Electricity and Magnetism Units 8–10. It begins with mechanics, vectors, and calculus for a learner with no physics background, then develops the supplied course material through interactive lessons, labs, 295 MCQs, 25 lecture examples, 12 FRQs, and timed mock exams.

## Publish on GitHub Pages

1. Create an empty GitHub repository, for example `physics-em-flux`.
2. Upload **everything inside this folder** to the repository root. Keep the `assets` folders and JSON files in their current relative locations.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the `main` branch and `/(root)`, then save.
6. After GitHub finishes the first deployment, open the URL shown on the Pages settings screen.

The included `.nojekyll` file tells Pages to serve the files directly. There is no build command and no package installation.

To test locally, do not double-click `index.html`, because browsers block local JSON requests. From this folder run `python -m http.server 8000` and open `http://localhost:8000`.

## What is included

- A map-based path with 23 complete lessons, including four beginner foundation lessons
- Six live canvas labs: field vectors, integration slices, flux, induction, energy, and capacitance
- All 295 supplied MCQs with optimized source-page images, extracted text, and detailed answers
- All 25 worked examples from the supplied lecture deck
- Six supplied FRQs and six new transfer FRQs with step-by-step hints and rubrics
- Quick mock, cumulative midterm, and unit tests drawn from the supplied bank
- Local profiles, streaks, XP, attempts, difficult/review/mastered tags, activity history, and backup import/export
- A context-aware built-in tutor that works without a server
- Optional cross-device Supabase accounts and an optional server-side AI tutor proxy
- A printable formula and method guide

## Accounts and cloud sync

Local profiles work immediately and require no account. They are saved in the browser's local storage. Export a backup from **Profile & memory** before clearing browser data or changing devices.

For optional cross-device accounts, create a Supabase project, run `supabase-schema.sql` in its SQL Editor, and add the project URL and public anon key to `config.js`. The anon key is designed to be public. Security comes from the included Row Level Security policies, which restrict each row to its authenticated owner. Never place the Supabase service-role key in the site.

## Optional live AI tutor

The built-in Flux guide can give hints and explanations without a network request. For generative tutoring, deploy `ai-proxy-example.js` as a server-side function or Cloudflare Worker, add an `OPENAI_API_KEY` secret on that server, and set `aiProxyUrl` in `config.js`.

Never put a private OpenAI key in frontend code. Before public use, add origin checks, authentication, and rate limits appropriate to your deployment.

## Source handling

This lean GitHub Pages package omits the duplicate original PDFs and DOCX files. Every MCQ still points to an optimized source-page image under `assets/pages`, with extracted text as an accessible fallback. `SOURCE-NOTES.md` records source ambiguities and corrections found during solution review.

The supplied educational materials remain subject to their original ownership and permitted classroom use. Review your right to publish the included question-page images before making a repository public.
