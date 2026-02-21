export type Theme = {
  mainSubject: string;
  keyMessage: string;
  visualMetaphor: string;
  symbolicElements: string;
  fullThemeDescription: string;
};

export const imagenPromptVariants: Array<(theme: Theme) => string> = [
  (theme) => `
  Create a high-impact, symbolic 1950s military hand-carved linocut block print illustration.

Constraints:
- Colors: Use only Navy Blue (#091f40), Red (#c5203e), and White (#ffffff).
- Style: Bold lines, strong shapes, and a positive, mission-oriented feel.
- Texture: Add a subtle, distressed paper texture.
- Text: No text or hex codes.
- Tone: Positive, uplifting, empowering.

  Visual Theme: ${theme.fullThemeDescription}
  Subject Focus: ${theme.mainSubject} as a solid, high-contrast silhouette.
  Central Visual Metaphor: ${theme.visualMetaphor}
  Symbolic Elements: ${theme.symbolicElements}

Focus on visually representing the specific subject matter of this theme.
Make the imagery directly relevant to the topic described.
  
 `,
  (theme) => `
  A wordless, hand-carved block print illustration in a 1950s modernist style.

  This is a PURE VISUAL composition.

  Visual Theme: ${theme.fullThemeDescription}
  Subject Focus: ${theme.mainSubject} as a solid, high-contrast silhouette.
  Central Visual Metaphor: ${theme.visualMetaphor}
  Symbolic Elements: ${theme.symbolicElements}

  Style & Composition:
  - Aesthetic: WPA-era mural study, prioritizing pure symbolic form over messaging.
  - Composition: The subject occupies the entire frame with bold, radiating geometric lines filling all background space.
  - Palette: Limited to three flat colors: Deep Navy Blue (#091f40), Bold Red (#c5203e), and Crisp White.
  - Texture: Coarse fibrous paper texture with visible woodblock grain and uneven ink-bleed.
  - Rendering: Flat graphic design with thick, bold outlines. No characters or alphanumeric symbols allowed.



  
 `,
  (theme) => `

  Create a high-impact, symbolic 1950s military wordless geometric mural study.

Constraints:
- Colors: Use only Navy Blue (#091f40), Red (#c5203e), and White (#ffffff).
- Style: Bold lines, strong shapes, and a positive, mission-oriented feel.
- Texture: Add a subtle, distressed paper texture.
- Text: No text or hex codes.
- Tone: Positive, uplifting, empowering.

  Visual Theme: ${theme.fullThemeDescription}
  Subject Focus: ${theme.mainSubject} as a solid, high-contrast silhouette.
  Central Visual Metaphor: ${theme.visualMetaphor}
  Symbolic Elements: ${theme.symbolicElements}

ABSOLUTE: This is a purely visual art piece. No written characters or alphanumeric symbols.
  
 `,
];
