import React from "react";

export interface TitleProps {
  radius: number;
  text: string;
}

/**
 * Approximates the length of text based on the number of characters.
 * Could use canvas measure to get the exact width, but that level of accuracy is not required.
 */
export const Title = ({ radius, text = "" }: TitleProps): JSX.Element => {
  const words = text.split("-");
  const maxWordLen = Math.max(...words.map((w) => w.length));
  // enforce minimum of 10 px
  // combined height cannot be more than some % of radius
  const fontSize = Math.max(
    10, // min size
    Math.min(
      (3 * radius) / maxWordLen, // base size
      (1.5 * radius) / words.length // max size by height
    )
  );
  return (
    <a
      className="title"
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: `${fontSize}px`,
      }}
      href={`https://stackoverflow.com/search?q=user:10431574+[${text}]`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {words.map((word) => (
        <span key={word}>{word}</span>
      ))}
    </a>
  );
};
