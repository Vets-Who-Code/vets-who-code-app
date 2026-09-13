// Next cohort start date (YYYY/MM/DD). The countdown and the status badges both
// read it, so the year can never drift from the date.
const cohortStartDate = "2027/04/05";
const cohortYear = Number(cohortStartDate.slice(0, 4));

export default {
    name: "Vets Who Code",
    titleTemplate: "%s | Vets Who Code",
    description:
        "Vets Who Code is a non-profit organization that provides free technical training to veterans and their spouses.",
    url: "https://vetswhocode.io", // Add the URL property here
    // When the start date is in the past (or unset), the countdown is hidden instead
    // of showing a dead 0:0:0:0. Override per-environment without a code change via
    // NEXT_PUBLIC_COHORT_START_DATE.
    cohortStartDate,
    cohortYear,
    // Status badge printed across the marketing surfaces.
    cohortStatus: `${cohortYear} Cohort · Applications Open`,
    // The header nav row has no spare pixels — the long form wraps the menu.
    cohortStatusShort: `${cohortYear} Cohort · Open`,
};
