# GitHub Profile Finder — Design Brief

## Chosen direction

The user supplied a dark, high-fashion editorial portfolio reference and explicitly requested the same palette and visual feel for the GitHub Profile Finder. Preserve its near-black canvas, warm cream typography, muted oxblood/burgundy details, hairline separators, refined serif display text, compact uppercase captions, and carefully layered editorial composition. Adapt the reference's mood and colors to a useful developer tool; do not copy its portfolio content, image, or project-card layout literally.

## Design dimensions

- **Design movement:** Contemporary dark editorial, with the restraint and typography of a print magazine translated into a functional developer interface.
- **Core principles:** Search first; calm visual hierarchy; public data is presented transparently; one obvious primary action; dense information remains readable; responsive behavior is intentional rather than squeezed desktop UI.
- **Color philosophy:** Ink/charcoal surfaces (`#110f10`, `#191516`), warm paper text (`#eee2d4`), soft muted text (`#a99c91`), and deep garnet/oxblood accents (`#763742`, `#a45d68`). Use warm border tones with low contrast for structure. Reserve accent color for actions, selected controls, and meaningful data emphasis.
- **Layout paradigm:** Centered, magazine-like page canvas with small eyebrow labels, generous hero title and a search bar as the visual anchor. Results use structured profile/repository panels and compact metadata rails. At narrow sizes, stack panels in a single column, preserve comfortable tap targets, and keep the search action obvious.
- **Signature elements:** Hairline frames, numbered/eyebrow section labels, a subtle burgundy glow in the hero background, delicate circular details inspired by botanical/editorial ornament, a custom magnifying-glass brand mark, and a warm accent rule.
- **Interaction philosophy:** Clear keyboard focus, accessible labels, enter-to-search, visible loading state, concise recoverable errors, and responsive hover/pressed/focus states. Never present fabricated profile or repository information as live data.
- **Animation:** Restrained, brief opacity/translate transitions for entrance and hover only; disable nonessential motion under `prefers-reduced-motion`.
- **Typography system:** Editorial serif display faces from Georgia/serif system fallbacks; clean system sans-serif for body copy, forms and metadata; uppercase tracked micro-labels for navigation and section cues. Avoid fragile external font downloads.
- **Brand essence:** "A quieter way to find the people behind the code"—curious, precise, warm and technically credible.
- **Brand voice:** Brief, helpful, direct. Explain that search uses public GitHub data and distinguish usernames from display-name search results.
- **Wordmark/logo:** “FIELDNOTE / GITHUB FINDER” style project wordmark rendered as readable live text, paired with an original square magnifier-and-spark icon; no GitHub endorsement is implied.
- **Signature brand color:** Deep oxblood `#763742`, grounded by warm cream `#eee2d4` on ink.

## Product placement

The user-supplied reference is the ground truth for palette and editorial mood, but the product remains a practical search application—not a portfolio site. The landing hero, query form, profile detail, search results, About view and repository list should consistently reuse the same restrained design tokens.
