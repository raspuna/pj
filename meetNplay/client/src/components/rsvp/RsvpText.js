export const YES = 1;
export const NO = 9;
export const MAYBE = 2;
export const NOT_YET = 0;

export function rsvpText(rsvp) {
  if (rsvp === YES) {
    return "YES";
  } else if (rsvp === NO) {
    return "NO";
  } else if (rsvp === MAYBE) {
    return "MAYBE";
  } else {
    return "NOT YET";
  }
}
