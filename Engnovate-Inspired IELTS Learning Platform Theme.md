# Engnovate-Inspired IELTS Learning Platform Theme

Use this document as the visual design reference for the IELTS learning platform. The intended direction is inspired by Engnovate: bright, modern, energetic, and educational, with vivid red (`#EB0000`) as the primary brand color and blue/purple/orange accents for learning categories.

## Design Direction

Create a clean learning interface that feels trustworthy and motivating without becoming visually noisy. Use white and light gray for most of the interface, dark navy for readable text, vivid red for primary actions and brand elements, and colorful accents to distinguish IELTS skills and featured content.

The visual balance should be approximately:

- 60% white and very light neutral surfaces
- 25% red and dark navy branding
- 15% blue, purple, orange, and yellow accents

## Color Palette

| Token | Hex | Intended use |
|---|---|---|
| `--color-background` | `#FFFFFF` | Main page background |
| `--color-surface` | `#F5F6F8` | Alternate sections, panels, and soft card backgrounds |
| `--color-surface-elevated` | `#FFFFFF` | Cards, modals, navigation surfaces |
| `--color-text-primary` | `#111827` | Headings, body text, and important labels |
| `--color-text-secondary` | `#667085` | Supporting text, metadata, and descriptions |
| `--color-brand` | `#EB0000` | Primary brand color, links, active states, and main buttons |
| `--color-brand-hover` | `#C40000` | Hover and pressed state for primary buttons and links |
| `--color-reading-blue` | `#4169D8` | Reading tests, reading progress, and reading category cards |
| `--color-listening-purple` | `#B34FC4` | Listening tests and listening category cards |
| `--color-writing-orange` | `#F28A45` | Writing tests, writing prompts, and highlighted CTAs |
| `--color-partner-yellow` | `#F4B400` | Partnership highlights and achievement accents |
| `--color-success` | `#16A36A` | Correct answers, completed lessons, and positive feedback |
| `--color-error` | `#D64545` | Incorrect answers and validation errors |
| `--color-border` | `#E5E7EB` | Card borders, separators, and input outlines |

## Recommended CSS Variables

```css
:root {
  --color-background: #ffffff;
  --color-surface: #f5f6f8;
  --color-surface-elevated: #ffffff;
  --color-text-primary: #111827;
  --color-text-secondary: #667085;
  --color-brand: #eb0000;
  --color-brand-hover: #c40000;
  --color-reading-blue: #4169d8;
  --color-listening-purple: #b34fc4;
  --color-writing-orange: #f28a45;
  --color-partner-yellow: #f4b400;
  --color-success: #16a36a;
  --color-error: #d64545;
  --color-border: #e5e7eb;
}
```

## Usage Rules

### Primary actions

Use `--color-brand` (`#EB0000`) for primary buttons such as **Start Test**, **Begin Practice**, **Continue Learning**, and **View Results**. Use white text on red buttons. Buttons should have a clear hover state using a slightly darker red, `--color-brand-hover` (`#C40000`).

### IELTS skill categories

Use consistent colors so learners can recognize sections quickly:

- Reading: blue
- Listening: purple
- Writing: orange
- Speaking: use a complementary teal such as `#1F9D8B`

Do not use all accent colors on every component. Each card or feature should normally have one dominant accent.

### Progress and scores

Use the brand red for ordinary progress bars and active states, green for completed or successful work, and yellow for milestones and achievements. Because red is now the brand color, it no longer signals an error by itself: errors and warnings must always be paired with `--color-error`, an icon such as ✗, and explanatory text. Keep large red areas small (buttons, active tabs, accents) so the interface stays calm during long study sessions.

### Surfaces and layout

Use a white base with light gray section backgrounds. Place content inside white cards with subtle borders and shadows. Prefer generous spacing, rounded corners, and clear visual hierarchy for long study sessions.

Suggested card treatment:

```css
.card {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(17, 24, 39, 0.06);
}
```

## Typography and Accessibility

Use a clean sans-serif font such as Inter, Plus Jakarta Sans, or system UI fonts. Headings should be dark navy and bold; body text should use a comfortable line height of approximately 1.5 to 1.7.

Maintain strong contrast for body text and primary controls. Do not place small text directly on orange, purple, or yellow backgrounds unless contrast has been checked. Never rely on color alone to communicate correctness, progress, or category; pair color with text, icons, labels, or patterns.

## Visual Personality

The interface should feel:

- Modern but not overly playful
- Energetic but not distracting
- Professional and exam-focused
- Friendly and motivating
- Clear enough for extended daily study sessions

Avoid neon gradients, excessive animation, overly saturated full-page backgrounds, and mixing several accent colors inside a single small component.

## Reference Summary

> **Primary identity:** white + dark navy + vivid red (`#EB0000`)
>
> **Learning accents:** purple for listening, orange for writing, blue for reading
>
> **Special branding:** yellow reserved for partnership highlights and achievement accents
>
> **Overall mood:** modern, energetic, educational, and trustworthy

This is an Engnovate-inspired palette, not an assertion of the website's official design tokens. Use it as a practical implementation guide for a visually similar IELTS learning product.
