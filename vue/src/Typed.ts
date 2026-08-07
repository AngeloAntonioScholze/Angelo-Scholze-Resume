import { defineComponent, h, type PropType, type VNode } from 'vue';
import type { Seg } from './data';
import { useInView } from './useInView';

export const PER_CHAR = 12;
export const PER_CHAR_HEADER = 22;
export const PER_CHAR_BODY = 7;

type Tag = 'p' | 'h1' | 'h3';

function plain(segs: Seg[]): (string | VNode)[] {
  return segs.map((seg, i) =>
    typeof seg === 'string' ? seg : h('span', { key: i, class: 'gold' }, seg.gold),
  );
}

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
    const { el, inView } = useInView();
    return () =>
      h(
        props.as,
        { ref: el },
        inView.value ? typed(props.segs, props.perChar).nodes : plain(props.segs),
      );
  },
});

export const Cmdline = defineComponent({
  name: 'Cmdline',
  props: {
    text: { type: String, required: true },
    cursor: { type: Boolean, default: false },
  },
  setup(props) {
    const { el, inView } = useInView();
    return () => {
      const { nodes, count } = typed([props.text], PER_CHAR);
      const children: (string | VNode)[] = [
        h('span', { class: 'prompt' }, '$'),
        ...(inView.value ? nodes : [props.text]),
      ];
      if (props.cursor) {
        children.push(
          h('span', {
            class: 'cursor',
            style: inView.value
              ? { animationDelay: `${(count * PER_CHAR) / 1000}s` }
              : undefined,
          }),
        );
      }
      return h('p', { ref: el, class: 'cmdline' }, children);
    };
  },
});
