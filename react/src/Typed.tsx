import { Fragment, createElement, type CSSProperties, type ReactNode } from 'react';
import type { Seg } from './data';

export const PER_CHAR = 12;
export const PER_CHAR_HEADER = 22;
export const PER_CHAR_BODY = 7;

const delay = (index: number, perChar: number) =>
  ({ '--cd': `${(index * perChar) / 1000}s` }) as CSSProperties;

function typed(segs: Seg[], perChar: number): { nodes: ReactNode[]; count: number } {
  let count = 0;
  const nodes = segs.map((seg, i) => {
    const text = typeof seg === 'string' ? seg : seg.gold;
    const spans = [...text].map((ch) => {
      const node = (
        <span key={count} className="ch" style={delay(count, perChar)}>
          {ch}
        </span>
      );
      count++;
      return node;
    });
    return typeof seg === 'string' ? (
      <Fragment key={i}>{spans}</Fragment>
    ) : (
      <span key={i} className="gold">
        {spans}
      </span>
    );
  });
  return { nodes, count };
}

type Tag = 'p' | 'h1' | 'h3';

export function Typed({
  segs,
  perChar = PER_CHAR,
  className,
  as = 'p',
}: {
  segs: Seg[];
  perChar?: number;
  className?: string;
  as?: Tag;
}) {
  return createElement(as, { className }, typed(segs, perChar).nodes);
}

export function Cmdline({ text, cursor = false }: { text: string; cursor?: boolean }) {
  const { nodes, count } = typed([text], PER_CHAR);
  return (
    <p className="cmdline">
      <span className="prompt">$</span>
      {nodes}
      {cursor && <span className="cursor" style={{ animationDelay: `${(count * PER_CHAR) / 1000}s` }} />}
    </p>
  );
}
