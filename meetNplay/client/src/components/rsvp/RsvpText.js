export const YES = 1;
export const NO = 9;
export const MAYBE = 2;
export const NOT_YET = 0;
export const YES_COLOR = "success";
export const NO_COLOR = "danger";
export const MAYBE_COLOR = "info";
export const NOT_YET_COLOR = "warning";

export function rsvpText(rsvp) {
  if (rsvp === YES) {
    return <span className={"text-" + YES_COLOR}>YES</span>;
  } else if (rsvp === NO) {
    return <span className={"text-" + NO_COLOR}>NO</span>;
  } else if (rsvp === MAYBE) {
    return <span className={"text-" + MAYBE_COLOR}>MAYBE</span>;
  } else {
    return <span className={"text-" + NOT_YET_COLOR}>NOT YET</span>;
  }
}
export function rsvpTextOnly(rsvp) {
  if (rsvp === YES) {
    return "Attend";
  } else if (rsvp === NO) {
    return "Not Attend";
  } else if (rsvp === MAYBE) {
    return "Maybe Attend";
  } else {
    return "Not yet answerd";
  }
}
export function rsvpColor(rsvp) {
  if (rsvp === YES) {
    return YES_COLOR;
  } else if (rsvp === NO) {
    return NO_COLOR;
  } else if (rsvp === MAYBE) {
    return MAYBE_COLOR;
  } else {
    return NOT_YET_COLOR;
  }
}
