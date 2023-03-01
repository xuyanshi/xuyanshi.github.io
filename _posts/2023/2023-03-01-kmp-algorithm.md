---
title: KMP Algorithm
author: 
date: 2023-03-01 13:00 +0800
categories: [Code, Algorithm]
tags: [string]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/202303/

---





Pattern searching is an important problem in computer science. When we do search for a string in a notepad/word file or browser or database, pattern-searching algorithms are used to show the search results. 



The worst-case complexity of the Naive pattern-searching algorithm is O(m(n-m+1)). The time complexity of the KMP algorithm is O(n) in the worst case. 



**KMP (Knuth Morris Pratt) Pattern Searching.** The [Naive pattern-searching algorithm](https://www.geeksforgeeks.org/searching-for-patterns-set-1-naive-pattern-searching/) doesn’t work well in cases where we see many matching characters followed by a mismatching character.



The KMP matching algorithm uses degenerating property (pattern having the same sub-patterns appearing more than once in the pattern) of the pattern and improves the worst-case complexity to O(n). 



The basic idea behind KMP’s algorithm is: whenever we detect a mismatch (after some matches), we already know some of the characters in the text of the **next** window. We take advantage of this information to avoid matching the characters that we know will anyway match. 



[KMP Algorithm for Pattern Searching - GeeksforGeeks](https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/)
