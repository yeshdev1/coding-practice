import React from 'react';

// CSS Practice: foundational, medium, hard
export const cssChallenges = [
  // Foundational (easy)
  {
    id: 'css-foundation-hero',
    title: 'Glow-Up: Basic Hero Block',
    difficulty: 'easy',
    pLevel: 'p0',
    expectedTime: '15m',
    category: 'layout',
    slug: 'css-foundation-hero',
    description: `
You get a dull hero block. Make it feel like a real landing page:
- Add a background gradient or image overlay.
- Improve spacing (padding/margins), typography, and button styling.
- Make sure it stays readable on small screens.
`,
    keyConcepts: `
### Core Concepts (DOM & CSS Rendering)
- **Box model & paint**: Padding/margin/border define how the element consumes layout space before paint.
- **Stacking & backgrounds**: Background layers (color, gradient, image) are painted before text; use \`background-size: cover\` to avoid image tiling.
- **Typography & readability**: Line-height and contrast directly affect legibility; paint order won't fix unreadable text.
- **Responsive flow**: Without explicit widths, block elements stack; media queries or fluid units (%, rem, vw) guide reflow on small screens.
`,
    initialCode: `
export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <section style={{
        background: '#eee',
        padding: 24,
        borderRadius: 4,
        textAlign: 'left'
      }}>
        <h1>Welcome</h1>
        <p>Build something impressive here.</p>
        <button>Get Started</button>
      </section>
    </div>
  );
}
`
  },
  {
    id: 'css-foundation-card-grid',
    title: 'Card Grid Cleanup',
    difficulty: 'easy',
    pLevel: 'p0',
    expectedTime: '15m',
    category: 'layout',
    slug: 'css-foundation-card-grid',
    description: `
You have a messy set of cards. Make them presentable:
- Create a clean grid with consistent spacing.
- Add hover affordances (shadow/scale).
- Improve text hierarchy and alignment.
`,
    keyConcepts: `
### Core Concepts
- **Grid/flex flow**: Flex wraps children row-by-row; CSS grid offers explicit columns/rows for consistent alignment.
- **Composited effects**: Hover shadows/transforms trigger compositing; keep transitions short to avoid jank.
- **Whitespace**: Padding inside; gap/margin outside. Consistency reduces visual noise.
`,
    initialCode: `
export default function App() {
  const items = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map(n => (
          <div key={n} style={{
            background: '#f5f5f5',
            margin: 8,
            padding: 12,
            minWidth: 120
          }}>
            <h3>Card {n}</h3>
            <p>Some info about this card.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
`
  },
  {
    id: 'css-foundation-typography',
    title: 'Readable Typography Stack',
    difficulty: 'easy',
    pLevel: 'p0',
    expectedTime: '10m',
    category: 'typography',
    slug: 'css-foundation-typography',
    description: `
Make this text block pleasant to read:
- Choose a font stack and set sensible line-height and spacing.
- Add a subtle rhythm to headings vs body.
- Ensure links are clearly visible and accessible.
`,
    keyConcepts: `
### Core Concepts
- **Line-height & measure**: 1.4–1.6 line-height; ~60–75 chars per line for readability.
- **Contrast & accessibility**: Follow WCAG for contrast; links need color + underline or another affordance.
- **System stacks**: Use \`font-family\` fallbacks to avoid FOIT/FOUT surprises.
`,
    initialCode: `
export default function App() {
  return (
    <div style={{ padding: 24, maxWidth: 700 }}>
      <h1>Typography Matters</h1>
      <p>
        This paragraph is cramped and bland. Improve the font, spacing,
        and overall readability. Make sure links like <a href="#">this one</a>
        stand out clearly.
      </p>
      <h2>Subheading</h2>
      <p>
        Add rhythm between headings and paragraphs. Adjust margins, colors,
        and font weights to create hierarchy.
      </p>
    </div>
  );
}
`
  },
  {
    id: 'css-foundation-buttons',
    title: 'Buttons that Feel Clickable',
    difficulty: 'easy',
    pLevel: 'p0',
    expectedTime: '10m',
    category: 'interaction',
    slug: 'css-foundation-buttons',
    description: `
Give these plain buttons proper affordance:
- Size, padding, and rounded corners.
- Hover/active/focus states.
- Primary vs secondary styles.
`,
    keyConcepts: `
### Core Concepts
- **States**: :hover, :active, :focus-visible convey interactivity.
- **Hit area**: Padding increases tap/click target; aim for ~44px height.
- **Visual hierarchy**: Primary vs secondary via color/weight; keep contrast sufficient.
`,
    initialCode: `
export default function App() {
  return (
    <div style={{ padding: 24, display: 'flex', gap: 12 }}>
      <button>Primary</button>
      <button>Secondary</button>
      <button>Ghost</button>
    </div>
  );
}
`
  },
  {
    id: 'css-foundation-form',
    title: 'Form Polish',
    difficulty: 'easy',
    pLevel: 'p0',
    expectedTime: '12m',
    category: 'forms',
    slug: 'css-foundation-form',
    description: `
Make this small form look professional:
- Align labels/inputs, add spacing.
- Style inputs (focus, hover) and submit button.
- Provide subtle helper/error text styling.
`,
    keyConcepts: `
### Core Concepts
- **Form controls**: Inputs inherit fonts; set explicit font/size/line-height.
- **Focus rings**: Use :focus-visible for accessibility; avoid removing outline without replacement.
- **Grouping**: Use vertical rhythm and consistent label spacing for scannability.
`,
    initialCode: `
export default function App() {
  return (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <h2>Contact</h2>
      <label>Email</label>
      <input type="email" placeholder="you@example.com" />
      <label>Message</label>
      <textarea rows={3} placeholder="Say hi..."></textarea>
      <button>Send</button>
    </div>
  );
}
`
  },

  // Medium
  {
    id: 'css-medium-dashboard',
    title: 'Compact Dashboard Layout',
    difficulty: 'medium',
    pLevel: 'p1',
    expectedTime: '20m',
    category: 'layout',
    slug: 'css-medium-dashboard',
    description: `
Arrange cards into a responsive dashboard:
- Use grid/flex to create adaptive columns.
- Add a header bar and section labels.
- Ensure spacing, hover, and visual hierarchy.
`,
    initialCode: `
export default function App() {
  const cards = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <div style={{ padding: 16 }}>
      <header style={{ marginBottom: 12 }}>
        <h2>Dashboard</h2>
      </header>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map(n => (
          <div key={n} style={{
            background: '#f4f4f4',
            margin: 6,
            padding: 10,
            minWidth: 140
          }}>
            <strong>Card {n}</strong>
            <p>Some metric</p>
          </div>
        ))}
      </div>
    </div>
  );
}
`
  },
  {
    id: 'css-medium-navbar',
    title: 'Responsive Navbar',
    difficulty: 'medium',
    pLevel: 'p1',
    expectedTime: '18m',
    category: 'navigation',
    slug: 'css-medium-navbar',
    description: `
Turn this bare list into a responsive navbar:
- Horizontal layout on desktop; simple stacked or menu-button on mobile.
- Active/hover states; spacing and alignment.
- Ensure good tap targets and contrast.
`,
    initialCode: `
export default function App() {
  const links = ['Home', 'Docs', 'Pricing', 'Blog', 'About'];
  return (
    <nav style={{ padding: 12, background: '#f7f7f7' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>Logo</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 8 }}>
          {links.map(l => <li key={l}><a href="#">{l}</a></li>)}
        </ul>
      </div>
    </nav>
  );
}
`
  },
  {
    id: 'css-medium-pricing',
    title: 'Pricing Table',
    difficulty: 'medium',
    pLevel: 'p1',
    expectedTime: '20m',
    category: 'cards',
    slug: 'css-medium-pricing',
    description: `
Style this pricing row:
- Highlight the recommended plan.
- Balance spacing, typography, and CTAs.
- Add responsive stacking on small screens.
`,
    initialCode: `
export default function App() {
  const plans = [
    { name: 'Basic', price: '$9' },
    { name: 'Pro', price: '$19' },
    { name: 'Team', price: '$39' },
  ];
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 10 }}>
        {plans.map(p => (
          <div key={p.name} style={{ background: '#fafafa', padding: 14, flex: 1 }}>
            <h3>{p.name}</h3>
            <p>{p.price}/mo</p>
            <button>Choose</button>
          </div>
        ))}
      </div>
    </div>
  );
}
`
  },
  {
    id: 'css-medium-modal',
    title: 'Modal Overlay Polish',
    difficulty: 'medium',
    pLevel: 'p1',
    expectedTime: '15m',
    category: 'overlay',
    slug: 'css-medium-modal',
    description: `
Add proper overlay styling:
- Dimmed backdrop with center-aligned modal.
- Close affordance, spacing, and focus state.
- Optional: subtle entrance animation.
`,
    initialCode: `
export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <div id="backdrop" style={{ background: '#00000011', padding: 20 }}>
        <div id="modal" style={{ background: '#fff', padding: 16, width: 320 }}>
          <h3>Modal title</h3>
          <p>Some modal content that needs spacing and structure.</p>
          <button>Close</button>
        </div>
      </div>
    </div>
  );
}
`
  },
  {
    id: 'css-medium-timeline',
    title: 'Timeline Layout',
    difficulty: 'medium',
    pLevel: 'p1',
    expectedTime: '18m',
    category: 'layout',
    slug: 'css-medium-timeline',
    description: `
Create a clean vertical timeline:
- Align dots/lines and content blocks.
- Balance spacing and typography.
- Keep it readable on narrow screens.
`,
    initialCode: `
export default function App() {
  const events = [
    { title: 'Kickoff', date: 'Jan 1' },
    { title: 'Beta', date: 'Feb 10' },
    { title: 'Launch', date: 'Mar 5' },
  ];
  return (
    <div style={{ padding: 24 }}>
      {events.map((e, i) => (
        <div key={e.title} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 16, height: 16, background: '#888', borderRadius: '50%' }} />
          <div>
            <strong>{e.title}</strong>
            <div>{e.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
`
  },

  // Hard
  {
    id: 'css-hard-dashboard-pro',
    title: 'Responsive Dashboard Pro',
    difficulty: 'hard',
    pLevel: 'p2',
    expectedTime: '30m',
    category: 'layout',
    slug: 'css-hard-dashboard-pro',
    description: `
Upgrade the dashboard to feel premium:
- Use CSS grid with responsive templates.
- Add panels with headers, actions, and hover/press states.
- Ensure graceful stacking on small screens.
`,
    initialCode: `
export default function App() {
  const cards = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div style={{ padding: 16 }}>
      <header style={{ marginBottom: 12 }}>
        <h2>Analytics Overview</h2>
      </header>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map(n => (
          <div key={n} style={{
            background: '#f4f4f4',
            margin: 6,
            padding: 10,
            minWidth: 140
          }}>
            <strong>Widget {n}</strong>
            <p>Metric details...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
`
  },
  {
    id: 'css-hard-mega-menu',
    title: 'Mega Menu',
    difficulty: 'hard',
    pLevel: 'p2',
    expectedTime: '25m',
    category: 'navigation',
    slug: 'css-hard-mega-menu',
    description: `
Turn a simple nav into a mega menu:
- Multi-column dropdown on hover/focus.
- Handle positioning, spacing, and shadow.
- Remain usable on mobile (stacked or full-width panel).
`,
    initialCode: `
export default function App() {
  const sections = [
    { title: 'Products', links: ['App', 'API', 'Integrations'] },
    { title: 'Company', links: ['About', 'Careers', 'Press'] },
    { title: 'Resources', links: ['Blog', 'Docs', 'Guides'] },
  ];
  return (
    <nav style={{ padding: 16, background: '#f7f7f7' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ position: 'relative' }}>
          <button>Menu</button>
          <div style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', padding: 8, display: 'none' }}>
            {sections.map(sec => (
              <div key={sec.title}>
                <strong>{sec.title}</strong>
                <ul>
                  {sec.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
`
  },
  {
    id: 'css-hard-landing',
    title: 'Landing Page Polish',
    difficulty: 'hard',
    pLevel: 'p2',
    expectedTime: '30m',
    category: 'layout',
    slug: 'css-hard-landing',
    description: `
Elevate this landing skeleton:
- Hero, feature grid, testimonials, CTA footer.
- Use consistent spacing, color, and typography.
- Responsive and visually balanced.
`,
    initialCode: `
export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <section>
        <h1>Product</h1>
        <p>Tagline goes here.</p>
        <button>Get Started</button>
      </section>
      <section>
        <h2>Features</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {[1,2,3].map(n => (
            <div key={n} style={{ margin: 6, padding: 10, background: '#f5f5f5' }}>
              <h3>Feature {n}</h3>
              <p>Short detail.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
`
  },
  {
    id: 'css-hard-table',
    title: 'Data Table UX',
    difficulty: 'hard',
    pLevel: 'p2',
    expectedTime: '22m',
    category: 'tables',
    slug: 'css-hard-table',
    description: `
Style this plain table for readability:
- Headers, row striping/hover, dense spacing.
- Align numeric columns, emphasize important cells.
- Keep it responsive (scroll container).
`,
    initialCode: `
export default function App() {
  const rows = [
    { name: 'Alpha', usage: 1234, status: 'Active' },
    { name: 'Beta', usage: 987, status: 'Paused' },
    { name: 'Gamma', usage: 5432, status: 'Active' },
  ];
  return (
    <div style={{ padding: 16 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Usage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.name}>
              <td>{r.name}</td>
              <td>{r.usage}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
`
  },
  {
    id: 'css-hard-animations',
    title: 'Microinteractions',
    difficulty: 'hard',
    pLevel: 'p2',
    expectedTime: '20m',
    category: 'interaction',
    slug: 'css-hard-animations',
    description: `
Add subtle microinteractions:
- Hover/press states with transform/opacity.
- A loading shimmer or skeleton for cards.
- Keep animations performant (transform/opacity, short durations).
`,
    initialCode: `
export default function App() {
  const items = Array.from({ length: 4 }, (_, i) => i + 1);
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        {items.map(n => (
          <div key={n} style={{ background: '#f2f2f2', padding: 16, width: 140 }}>
            <div style={{ height: 12, background: '#ddd', marginBottom: 8 }}></div>
            <div style={{ height: 12, background: '#ddd', width: '60%' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
`
  },
];

export default cssChallenges;

