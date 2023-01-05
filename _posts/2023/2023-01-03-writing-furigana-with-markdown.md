---
title: Writing Furigana With Markdown
author: 
date: 2023-01-03 17:28:00 +0800
categories: [Language Learning, Japanese]
tags: [japanese learning]
math: true
mermaid: true
---



There are millions of native Japanese speakers and Japanese language learners such as me all over the world. When we learn Japanese language, Furigana([振り仮名](https://en.wikipedia.org/wiki/Furigana)) is a great helper for us to know the pronunciation of Kanji. 

However, how can we write Furigana with markdown language?

In fact, basic Markdown syntax does NOT support Furigana. We should use HTML to write it.



For example, we could write <ruby>日本語能力試験<rp>（</rp><rt>にほんごのうりょくしけん</rt><rp>）</rp></ruby> by the code below.

```markdown
<ruby>日本語能力試験<rp>（</rp><rt>にほんごのうりょくしけん</rt><rp>）</rp></ruby>
```



Of course, we can split it to shorter words. 

<ruby>
  日本語<rp>(</rp><rt>にほんご</rt><rp>)</rp>
  能力<rp>(</rp><rt>のうりょく</rt><rp>)</rp>
  試験<rp>(</rp><rt>しけん</rt><rp>)</rp>
</ruby>

```markdown
<ruby>
  日本語<rp>(</rp><rt>にほんご</rt><rp>)</rp>
  能力<rp>(</rp><rt>のうりょく</rt><rp>)</rp>
  試験<rp>(</rp><rt>しけん</rt><rp>)</rp>
</ruby>
```

Or: 

<ruby>日本語<rp>(</rp><rt>にほんご</rt><rp>)</rp></ruby>
<ruby>能力<rp>(</rp><rt>のうりょく</rt><rp>)</rp></ruby>
<ruby>試験<rp>(</rp><rt>しけん</rt><rp>)</rp></ruby>

```markdown
<ruby>日本語<rp>(</rp><rt>にほんご</rt><rp>)</rp></ruby>
<ruby>能力<rp>(</rp><rt>のうりょく</rt><rp>)</rp></ruby>
<ruby>試験<rp>(</rp><rt>しけん</rt><rp>)</rp></ruby>
```



By the way, there are some unofficial Markdown extensions to support Furigana. They are efficient, but may not work on occasion.
