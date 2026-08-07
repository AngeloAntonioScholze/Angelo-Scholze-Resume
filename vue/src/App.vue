<script setup lang="ts">
import { EMAIL, RESUME_URL, about, contact, experience, hero, nav, skills, stats } from './data';
import { CURRENT, projects } from './projects';
import { Cmdline, PER_CHAR_BODY, PER_CHAR_HEADER, Typed } from './Typed';
import { useTheme } from './useTheme';

const { label, cycle } = useTheme();
const mailto = `mailto:${EMAIL}`;
</script>

<template>
  <div class="reveal go termbar">
    <div class="row">
      <div style="display: flex; align-items: center; gap: 16px">
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
        <a v-for="n in nav" :key="n.href" :href="n.href">{{ n.label }}</a>
        <a :href="RESUME_URL" download>
          <button type="button" class="btn">download resume</button>
        </a>
        <button type="button" class="btn theme-toggle" @click="cycle">{{ label }}</button>
      </nav>
    </div>
  </div>

  <div class="wrap">
    <section class="hero">
      <Cmdline text="whoami" cursor />
      <Typed as="h1" :segs="[hero.name]" :per-char="PER_CHAR_HEADER" />
      <Typed as="p" class="role" :segs="[hero.role]" :per-char="PER_CHAR_HEADER" />
      <Typed as="p" class="sub" :segs="hero.sub" :per-char="PER_CHAR_BODY" />
      <div class="reveal go row">
        <a :href="RESUME_URL" download>
          <button type="button" class="btn">download resume.pdf</button>
        </a>
        <a :href="mailto">
          <button type="button" class="btn btn-outline">email me</button>
        </a>
      </div>
    </section>

    <hr class="rule" />

    <section class="status" aria-label="Angelo Scholze, by the numbers">
      <Cmdline text="stat --career" />
      <div class="reveal go grid">
        <div v-for="s in stats" :key="s.k">
          <p class="k">{{ s.k }}</p>
          <p :class="s.gilt ? 'v gilt' : 'v'">{{ s.v }}</p>
        </div>
      </div>
    </section>

    <hr class="rule" />

    <section id="about" class="about-full">
      <Cmdline text="cat about.md" />
      <Typed class="note" :segs="about" :per-char="PER_CHAR_BODY" />
    </section>

    <section id="experience" class="services">
      <Cmdline text="ls -la experience/" />
      <div class="list">
        <div v-for="e in experience" :key="e.name" class="entry">
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
        <span v-for="s in skills" :key="s" class="chip">{{ s }}</span>
      </div>
    </section>

    <hr class="rule" />

    <section id="contact" class="close">
      <Cmdline text="contact --me" />
      <Typed as="h3" :segs="['Get in touch']" :per-char="PER_CHAR_HEADER" />
      <div class="reveal go contactgrid">
        <div v-for="c in contact" :key="c.k" class="row2">
          <span class="k">{{ c.k }}</span>
          <a
            v-if="c.href"
            :href="c.href"
            :target="c.external ? '_blank' : undefined"
            :rel="c.external ? 'noopener' : undefined"
            >{{ c.label }}</a
          >
          <span v-else>{{ c.label }}</span>
        </div>
      </div>
      <div class="reveal go row">
        <a :href="RESUME_URL" download>
          <button type="button" class="btn">download resume.pdf</button>
        </a>
        <a :href="mailto">
          <button type="button" class="btn btn-outline">email me</button>
        </a>
      </div>
    </section>

    <footer class="reveal go">
      <span>angelo-scholze v1.0.0</span>
      <span class="ok">process exited 0</span>
    </footer>
  </div>
</template>
