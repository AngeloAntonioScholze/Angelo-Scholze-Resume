<script setup lang="ts">
import { computed } from 'vue';
import { EMAIL, NAME, RESUME_URL, content } from './data';
import { CURRENT, projects } from './projects';
import { Cmdline, PER_CHAR_BODY, PER_CHAR_HEADER, Typed } from './Typed';
import { useLang } from './useLang';
import { useTheme } from './useTheme';

const { label, cycle } = useTheme();
const { lang, label: langLabel, cycle: cycleLang } = useLang();
const c = computed(() => content[lang.value]);
const mailto = `mailto:${EMAIL}`;
</script>

<template>
  <div class="reveal go termbar">
    <div class="row">
      <div class="termbrand">
        <span class="dots"><span /><span /><span /></span>
        <span class="termtitle">angelo@scholze:~/resume$</span>
        <span class="projsw">
          <template v-for="p in projects" :key="p.id">
            <span v-if="p.id === CURRENT" class="sw is-active" aria-current="page">{{ p.label }}</span>
            <a v-else class="sw" :href="p.href">{{ p.label }}</a>
          </template>
        </span>
      </div>
      <nav class="termnav">
        <a v-for="n in c.nav" :key="n.href" :href="n.href">{{ n.label }}</a>
        <a class="dl" :href="RESUME_URL" download>
          <button type="button" class="btn">{{ c.ui.download }}</button>
        </a>
        <button type="button" class="btn btn-ghost" @click="cycleLang">{{ langLabel }}</button>
        <button type="button" class="btn btn-ghost" @click="cycle">{{ label }}</button>
      </nav>
    </div>
  </div>

  <div :key="lang" class="wrap">
    <section class="hero">
      <Cmdline text="whoami" cursor />
      <Typed as="h1" :segs="[NAME]" :per-char="PER_CHAR_HEADER" />
      <Typed as="p" class="role" :segs="[c.hero.role]" :per-char="PER_CHAR_HEADER" />
      <Typed as="p" class="sub" :segs="c.hero.sub" :per-char="PER_CHAR_BODY" />
      <div class="reveal go row">
        <a :href="RESUME_URL" download>
          <button type="button" class="btn">{{ c.ui.downloadPdf }}</button>
        </a>
        <a :href="mailto">
          <button type="button" class="btn btn-outline">{{ c.ui.emailMe }}</button>
        </a>
      </div>
    </section>

    <hr class="rule" />

    <section class="status" aria-label="Angelo Scholze, by the numbers">
      <Cmdline text="stat --career" />
      <div class="reveal go grid">
        <div v-for="s in c.stats" :key="s.k">
          <p class="k">{{ s.k }}</p>
          <p :class="s.gilt ? 'v gilt' : 'v'">{{ s.v }}</p>
        </div>
      </div>
    </section>

    <hr class="rule" />

    <section id="about" class="about-full">
      <Cmdline text="cat about.md" />
      <Typed class="note" :segs="c.about" :per-char="PER_CHAR_BODY" />
    </section>

    <section id="experience" class="services">
      <Cmdline text="ls -la experience/" />
      <div class="list">
        <div v-for="e in c.experience" :key="e.name" class="entry">
          <div class="reveal go toprow">
            <span class="name">{{ e.name }}</span>
            <span class="dates">{{ e.dates }}</span>
          </div>
          <Typed :segs="e.body" :per-char="PER_CHAR_BODY" />
        </div>
      </div>
    </section>

    <section id="skills" class="skillsec">
      <Cmdline text="cat skills.txt" />
      <div class="reveal go chips">
        <span v-for="s in c.skills" :key="s" class="chip">{{ s }}</span>
      </div>
    </section>

    <hr class="rule" />

    <section id="contact" class="close">
      <Cmdline text="contact --me" />
      <Typed as="h3" :segs="[c.ui.getInTouch]" :per-char="PER_CHAR_HEADER" />
      <div class="reveal go contactgrid">
        <div v-for="ct in c.contact" :key="ct.k" class="row2">
          <span class="k">{{ ct.k }}</span>
          <a
            v-if="ct.href"
            :href="ct.href"
            :target="ct.external ? '_blank' : undefined"
            :rel="ct.external ? 'noopener' : undefined"
            >{{ ct.label }}</a
          >
          <span v-else>{{ ct.label }}</span>
        </div>
      </div>
      <div class="reveal go row">
        <a :href="RESUME_URL" download>
          <button type="button" class="btn">{{ c.ui.downloadPdf }}</button>
        </a>
        <a :href="mailto">
          <button type="button" class="btn btn-outline">{{ c.ui.emailMe }}</button>
        </a>
      </div>
    </section>

    <footer class="reveal go">
      <span>angelo-scholze v1.0.0</span>
      <span class="ok">process exited 0</span>
    </footer>
  </div>
</template>
