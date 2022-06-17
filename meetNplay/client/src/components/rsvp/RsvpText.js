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
