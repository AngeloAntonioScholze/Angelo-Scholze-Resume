import { defineComponent, h, type PropType, type VNode } from 'vue';
import type { Seg } from '@resume/shared/data';

export const PER_CHAR = 12;
export const PER_CHAR_HEADER = 22;
export const PER_CHAR_BODY = 7;

type Tag = 'p' | 'h1' | 'h3';

function typed(segs: Seg[], perChar: number): { nodes: VNode[]; count: number } {
  let count = 0;
  const nodes = segs.map((seg, i) => {
    const text = typeof seg === 'string' ? seg : seg.gold;
    const spans = [...text].map((ch) => {
      const node = h(
        'span',
        { key: count, class: 'ch', style: { '--cd': `${(count * perChar) / 1000}s` } },
        ch,
      );
      count++;
      return node;
    });
    return typeof seg === 'string'
      ? h('span', { key: i }, spans)
      : h('span', { key: i, class: 'gold' }, spans);
  });
  return { nodes, count };
}

export const Typed = defineComponent({
  name: 'Typed',
  props: {
    segs: { type: Array as PropType<Seg[]>, required: true },
    perChar: { type: Number, default: PER_CHAR },
    as: { type: String as PropType<Tag>, default: 'p' },
  },
  setup(props) {
    return () => h(props.as, null, typed(props.segs, props.perChar).nodes);
  },
});

export const Cmdline = defineComponent({
  name: 'Cmdline',
  props: {
    text: { type: String, required: true },
    cursor: { type: Boolean, default: false },
  },
  setup(props) {
    return () => {
      const { nodes, count } = typed([props.text], PER_CHAR);
      const children: VNode[] = [h('span', { class: 'prompt' }, '$'), ...nodes];
      if (props.cursor) {
        children.push(
          h('span', {
            class: 'cursor',
            style: { animationDelay: `${(count * PER_CHAR) / 1000}s` },
          }),
        );
      }
      return h('p', { class: 'cmdline' }, children);
    };
  },
});
