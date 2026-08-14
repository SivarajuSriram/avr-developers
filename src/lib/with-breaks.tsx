import { Fragment } from "react";

/** Splits text on "|" and renders a <br /> at each split. Use "|" in copy to force an exact line break. */
export function withBreaks(text: string) {
  return text.split("|").map((line, i, arr) => (
    <Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </Fragment>
  ));
}

/** Splits text on blank lines ("\n\n") into separate paragraphs. */
export function paragraphs(text: string) {
  return text.split("\n\n");
}
