# The DTC Funnel, Rewired: landing page

A static landing page where medical device marketers request a free locator audit and a personalized printed copy of *The DTC Funnel, Rewired*. No build step, no framework.

## Files

- `index.html`: the page.
- `css/styles.css`: all styles. Color and font tokens are at the top in `:root`.
- `js/form.js`: form validation and submission.
- `assets/img/`: cover and spread images.
- `assets/fonts/`: self-hosted fonts (Anton, Oswald, Special Elite, Source Serif 4).

## Before it goes live: connect the form

The form posts JSON to the TourCrush workspace (id 1), API group DTC, `POST /copy-requests`. Each submission is stored in the `copy_request` table.

`js/form.js` already points at:

`https://xmr6-ssay-w0v9.n7e.xano.io/api:606h79Zh/copy-requests`

The form posts JSON with these fields: `first_name`, `last_name`, `email`, `company`, `locator_url`, `address_line1`, `address_line2` (optional), `city`, `state`, `postal_code`, `country`. A hidden `website` field catches spam bots and is never sent.

## Run it locally

Open `index.html` in a browser, or run `npx serve .` in this folder.

## Deploy

Any static host works: Netlify (drag the folder onto app.netlify.com/drop), Vercel, Cloudflare Pages or GitHub Pages.

## Things to confirm before launch

- The privacy line under the button: "I'll use these details only to run your audit and mail your copy."
- Turnaround promises: "The audit takes me a few days" and the thank-you note saying the video walkthrough and mockup arrive by email.
- The phone number and email in the author section.
