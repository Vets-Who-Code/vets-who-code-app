/**
 * Military Resume Translator
 * Lightweight dictionary-based translation (no AI dependencies)
 * Fast, reliable, and bundle-size friendly
 */

/**
 * Military-to-civilian terminology mappings
 */
const MILITARY_TERMINOLOGY: Record<string, string> = {
  // Ranks & Leadership
  'squad leader': 'team supervisor',
  'platoon sergeant': 'operations manager',
  'first sergeant': 'senior operations manager',
  'sergeant major': 'executive operations manager',
  'commanding officer': 'chief executive',
  'executive officer': 'deputy director',
  'NCO': 'supervisor',
  'NCOIC': 'operations supervisor',
  'OIC': 'program manager',

  // Skills & Activities
  'conducted': 'performed',
  'executed': 'completed',
  'deployed': 'traveled',
  'mission': 'objective',
  'operations': 'activities',
  'tactical': 'strategic',
  'reconnaissance': 'research',
  'surveillance': 'monitoring',
  'logistics': 'supply chain management',
  'ordnance': 'equipment',

  // Military Branches & Units
  'battalion': 'large organization',
  'company': 'mid-size team',
  'platoon': 'team',
  'squad': 'small team',
  'unit': 'department',

  // Common Military Terms
  'personnel': 'employees',
  'enlisted': 'staff members',
  'subordinates': 'team members',
  'superior': 'manager',
  'briefed': 'presented to',
  'debriefed': 'reviewed with',
  'orders': 'directives',
  'regulations': 'policies',
  'standard operating procedure': 'company policy',
  'SOP': 'policy',
  'ROE': 'guidelines',
};

/**
 * Common military job titles to civilian equivalents
 */
const JOB_TITLE_MAPPINGS: Record<string, string> = {
  // Infantry & Combat
  'infantryman': 'team member',
  'infantry squad leader': 'operations team lead',
  'fire team leader': 'team supervisor',

  // Medical
  'combat medic': 'emergency medical technician',
  'field medic': 'paramedic',
  'hospital corpsman': 'medical assistant',

  // Intelligence
  'intelligence analyst': 'data analyst',
  'signals intelligence analyst': 'communications analyst',

  // Administration
  'personnel specialist': 'human resources specialist',
  'administrative specialist': 'administrative coordinator',

  // Technical
  'information technology specialist': 'IT specialist',
  'network administrator': 'network administrator',
  'communications specialist': 'telecommunications specialist',

  // Logistics
  'supply specialist': 'inventory manager',
  'logistics specialist': 'supply chain coordinator',
  'quartermaster': 'logistics manager',

  // Vehicle & Equipment
  'motor transport operator': 'truck driver',
  'aircraft mechanic': 'aviation technician',
  'wheeled vehicle mechanic': 'automotive technician',
};

export interface TranslationResult {
  original: string;
  translated: string;
  suggestions: string[];
  confidence: number;
}

export interface MilitaryProfile {
  jobTitle?: string;
  rank?: string;
  branch?: string;
  duties?: string;
  achievements?: string;
}

export interface TranslatedProfile {
  jobTitle: string;
  summary: string;
  keyResponsibilities: string[];
  achievements: string[];
  suggestions?: string[];
}

/**
 * Replace military terminology with civilian equivalents
 */
function replaceTerminology(text: string): string {
  let result = text;

  // Sort by length (longest first) to avoid partial replacements
  const sortedTerms = Object.entries(MILITARY_TERMINOLOGY).sort(
    ([a], [b]) => b.length - a.length
  );

  for (const [military, civilian] of sortedTerms) {
    // Case-insensitive replacement
    const regex = new RegExp(`\\b${military}\\b`, 'gi');
    result = result.replace(regex, civilian);
  }

  return result;
}

/**
 * Translate military job title to civilian equivalent
 */
export function translateJobTitle(militaryTitle: string): string {
  const normalized = militaryTitle.toLowerCase().trim();

  // Check for exact match
  if (JOB_TITLE_MAPPINGS[normalized]) {
    return JOB_TITLE_MAPPINGS[normalized];
  }

  // Check for partial match
  for (const [military, civilian] of Object.entries(JOB_TITLE_MAPPINGS)) {
    if (normalized.includes(military)) {
      return civilian;
    }
  }

  // Fallback: apply terminology replacement
  return replaceTerminology(militaryTitle);
}

/**
 * Translate a single military duty/responsibility to civilian language
 * Uses dictionary-based translation for instant, reliable results
 */
export async function translateDuty(duty: string): Promise<TranslationResult> {
  const translated = replaceTerminology(duty);

  // Generate simple suggestions based on the translation
  const suggestions = getSuggestions(translated);

  return {
    original: duty,
    translated,
    suggestions,
    confidence: 0.95, // High confidence with dictionary-based approach
  };
}

/**
 * Translate entire military profile to civilian resume format using AI
 */
export async function translateMilitaryProfile(
  profile: MilitaryProfile
): Promise<TranslatedProfile> {
  try {
    // Call API endpoint for AI-powered translation
    const response = await fetch('/api/military-resume/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobTitle: profile.jobTitle || '',
        rank: profile.rank || '',
        branch: profile.branch || '',
        duties: profile.duties || '',
        achievements: profile.achievements || '',
      }),
    });

    if (!response.ok) {
      // Fallback to dictionary-based translation
      console.warn('AI translation failed, using fallback');
      return fallbackTranslation(profile);
    }

    const translated = await response.json();
    return translated;

  } catch (error) {
    console.error('Profile translation error:', error);
    // Fallback to dictionary-based translation
    return fallbackTranslation(profile);
  }
}

/**
 * Fallback translation using dictionary-based approach
 */
function fallbackTranslation(profile: MilitaryProfile): TranslatedProfile {
  // Translate job title
  const civilianTitle = profile.jobTitle
    ? translateJobTitle(profile.jobTitle)
    : 'Professional';

  // Create professional summary
  const summaryParts: string[] = [];
  if (profile.rank) {
    summaryParts.push(`Experienced professional with ${profile.rank} level responsibilities`);
  }
  if (profile.branch) {
    summaryParts.push(`in ${replaceTerminology(profile.branch)}`);
  }

  const summary = summaryParts.length > 0
    ? summaryParts.join(' ')
    : 'Dedicated professional with proven leadership and operational experience';

  // Translate duties/responsibilities
  const duties = profile.duties
    ? profile.duties.split('\n').filter((d) => d.trim())
    : [];

  const translatedDuties = duties.map((duty) => replaceTerminology(duty));

  // Translate achievements
  const achievements = profile.achievements
    ? profile.achievements.split('\n').filter((a) => a.trim())
    : [];

  const translatedAchievements = achievements.map((achievement) =>
    replaceTerminology(achievement)
  );

  return {
    jobTitle: civilianTitle,
    summary,
    keyResponsibilities: translatedDuties,
    achievements: translatedAchievements,
  };
}

/**
 * Batch translate multiple duties
 */
export async function translateDuties(duties: string[]): Promise<TranslationResult[]> {
  const results: TranslationResult[] = [];

  for (const duty of duties) {
    if (duty.trim()) {
      const result = await translateDuty(duty);
      results.push(result);
    }
  }

  return results;
}

/**
 * Get suggestions for improving a translated duty
 */
export function getSuggestions(translatedDuty: string): string[] {
  const suggestions: string[] = [];

  // Suggest adding metrics
  if (!/\d+/.test(translatedDuty)) {
    suggestions.push('Consider adding specific numbers or metrics to quantify your impact');
  }

  // Suggest using action verbs
  const actionVerbs = ['led', 'managed', 'developed', 'implemented', 'coordinated'];
  const startsWithActionVerb = actionVerbs.some((verb) =>
    translatedDuty.toLowerCase().startsWith(verb)
  );

  if (!startsWithActionVerb) {
    suggestions.push('Start with a strong action verb (e.g., Led, Managed, Developed)');
  }

  // Suggest adding outcomes
  if (!translatedDuty.includes('result') && !translatedDuty.includes('improve')) {
    suggestions.push('Include the result or outcome of your work');
  }

  return suggestions;
}

/**
 * Format translated profile for download/export
 */
export function formatForResume(profile: TranslatedProfile): string {
  let resume = '';

  resume += `JOB TITLE: ${profile.jobTitle}\n\n`;
  resume += `PROFESSIONAL SUMMARY:\n${profile.summary}\n\n`;

  if (profile.keyResponsibilities.length > 0) {
    resume += `KEY RESPONSIBILITIES:\n`;
    profile.keyResponsibilities.forEach((resp) => {
      resume += `• ${resp}\n`;
    });
    resume += '\n';
  }

  if (profile.achievements.length > 0) {
    resume += `ACHIEVEMENTS:\n`;
    profile.achievements.forEach((achievement) => {
      resume += `• ${achievement}\n`;
    });
  }

  return resume;
}
