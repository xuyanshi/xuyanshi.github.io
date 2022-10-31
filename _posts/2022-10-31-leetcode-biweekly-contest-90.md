---
title: LeetCode Biweekly Contest 90
author: 
date: 2022-10-31 +0800
categories: [Blogging, Code]
tags: [leetcode]
math: true
mermaid: true
pin: true

---



## LeetCode Biweekly Contest 90



### [Contest](https://leetcode.cn/contest/biweekly-contest-90/)



### 1. [Odd String Difference](https://leetcode.cn/problems/odd-string-difference/)



#### Question(Easy):

You are given an array of equal-length strings words. Assume that the length of each string is n.

Each string words[i] can be converted into a difference integer array difference[i] of length n - 1 where difference[i] [j] = words[i] [j+1] - words[i] [j] where 0 <= j <= n - 2. Note that the difference between two letters is the difference between their positions in the alphabet i.e. the position of 'a' is 0, 'b' is 1, and 'z' is 25.

For example, for the string "acb", the difference integer array is [2 - 0, 1 - 2] = [2, -1].
All the strings in words have the same difference integer array, except one. You should find that string.

Return the string in words that has different difference integer array.

Example 1:

Input: words = ["adc","wzy","abc"]
Output: "abc"
Explanation: 
- The difference integer array of "adc" is [3 - 0, 2 - 3] = [3, -1].
- The difference integer array of "wzy" is [25 - 22, 24 - 25]= [3, -1].
- The difference integer array of "abc" is [1 - 0, 2 - 1] = [1, 1]. 
The odd array out is [1, 1], so we return the corresponding string, "abc".

Example 2:

Input: words = ["aaa","bob","ccc","ddd"]
Output: "bob"
Explanation: All the integer arrays are [0, 0] except for "bob", which corresponds to [13, -13].


Constraints:

3 <= words.length <= 100

**100 implies that we should use Brute-force solution, also called problem-solving by violence**

n == words[i].length

2 <= n <= 20

words[i] consists of lowercase English letters.



#### My solution during the contest:

```python[group1-Python]
class Solution:
    def oddString(self, words: List[str]) -> str:
        n = len(words[0])
        diff=[]
        for word in words:
            differ = []
            for i in range(n-1):
                differ.append(ord(word[i+1])-ord(word[i]))
            diff.append(tuple(differ))
        l = list(set(diff))
        if diff.count(l[0])==1:
            dest = l[0]
        else:
            dest = l[1]
        for i in range(len(diff)):
            if dest==diff[i]:
                return words[i]
        return ""
```



#### [Better solution](https://leetcode.cn/problems/odd-string-difference/solution/ha-xi-biao-by-endlesscheng-k6f5/):

```python[group1-Python]
class Solution:
    def oddString(self, words: List[str]) -> str:
        d = defaultdict(list)
        for s in words:
            d[tuple(ord(x) - ord(y) for x, y in pairwise(s))].append(s)
        x, y = d.values()
        return x[0] if len(x) == 1 else y[0]
```



#### Improvement

*New in version 3.10:* itertools.**pairwise**(*iterable*)

pairwise('ABCDEFG') --> AB BC CD DE EF FG

defaultdict()

List cannot be hashed, but tuple could.

ord() can calculate the ascii value of a character. e.g. ord('a') --> 97

**Defaultdict** is a container like [dictionaries](https://www.geeksforgeeks.org/python-dictionary/) present in the module **collections**. Defaultdict is a sub-class of the dictionary class that returns a dictionary-like object. The functionality of both dictionaries and defaultdict are almost same except for the fact that defaultdict never raises a KeyError. It provides a default value for the key that does not exists.



### 2. [Words Within Two Edits of Dictionary](https://leetcode.cn/problems/words-within-two-edits-of-dictionary/)

#### Question(Middle):

You are given two string arrays, queries and dictionary. All words in each array comprise of lowercase English letters and have the same length.

In one edit you can take a word from queries, and change any letter in it to any other letter. Find all words from queries that, after a maximum of two edits, equal some word from dictionary.

Return a list of all words from queries, that match with some word from dictionary after a maximum of two edits. Return the words in the same order they appear in queries.

 

Example 1:

Input: queries = ["word","note","ants","wood"], dictionary = ["wood","joke","moat"]
Output: ["word","note","wood"]

Explanation:
- Changing the 'r' in "word" to 'o' allows it to equal the dictionary word "wood".
- Changing the 'n' to 'j' and the 't' to 'k' in "note" changes it to "joke".
- It would take more than 2 edits for "ants" to equal a dictionary word.
- "wood" can remain unchanged (0 edits) and match the corresponding dictionary word.
Thus, we return ["word","note","wood"].

Example 2:

Input: queries = ["yes"], dictionary = ["not"]

Output: []

Explanation:
Applying any two edits to "yes" cannot make it equal to "not". Thus, we return an empty array.


Constraints:

1 <= queries.length, dictionary.length <= 100  

n == queries[i].length == dictionary[j].length

1 <= n <= 100

All queries[i] and dictionary[j] are composed of lowercase English letters.



#### My solution during the contest:

```python[group1-Python]
class Solution:
    def twoEditWords(self, queries: List[str], dictionary: List[str]) -> List[str]:
        ans = []
        for query in queries:
            query_not_found = True
            for dic in dictionary:
                if not query_not_found:
                    break
                if len(query)!=len(dic):
                    break
                else:
                    n = len(query)
                    cnt=0
                    for i in range(n):
                        if cnt>2:
                            break
                        else:
                            if query[i]!=dic[i]:
                                cnt+=1
                    if cnt<=2:
                        ans.append(query)
                        query_not_found=False
        return ans
```



#### [Better solution](https://leetcode.cn/problems/words-within-two-edits-of-dictionary/solution/bao-li-mei-ju-by-endlesscheng-afko/)

```python[group1-Python]
class Solution:
    def twoEditWords(self, queries: List[str], dictionary: List[str]) -> List[str]:
        ans = []
        for q in queries:
            for s in dictionary:
                if sum(x != y for x, y in zip(q, s)) <= 2: # perfect uses of sum and zip
                    ans.append(q)
                    break
        return ans
```



#### Improvement

Shorter and more efficient.



### 3. [Destroy Sequential Targets](https://leetcode.cn/problems/destroy-sequential-targets/)



#### Question(Middle):



You are given a 0-indexed array nums consisting of positive integers, representing targets on a number line. You are also given an integer space.

You have a machine which can destroy targets. Seeding the machine with some nums[i] allows it to destroy all targets with values that can be represented as nums[i] + c * space, where c is any non-negative integer. You want to destroy the maximum number of targets in nums.

Return the minimum value of nums[i] you can seed the machine with to destroy the maximum number of targets.

 

Example 1:

Input: nums = [3,7,8,1,1,5], space = 2

Output: 1

Explanation: If we seed the machine with nums[3], then we destroy all targets equal to 1,3,5,7,9,... 
In this case, we would destroy 5 total targets (all except for nums[2]). 
It is impossible to destroy more than 5 targets, so we return nums[3].

Example 2:

Input: nums = [1,3,5,2,4,6], space = 2

Output: 1

Explanation: Seeding the machine with nums[0], or nums[3] destroys 3 targets. 
It is not possible to destroy more than 3 targets.
Since nums[0] is the minimal integer that can destroy 3 targets, we return 1.

Example 3:

Input: nums = [6,2,5], space = 100

Output: 2

Explanation: Whatever initial seed we select, we can only destroy 1 target. The minimal seed is nums[1].


Constraints:

1 <= nums.length <= 10^5^
1 <= nums[i] <= 10^9^
1 <= space <= 10^9^



#### [Better solution](https://leetcode.cn/problems/destroy-sequential-targets/solution/a-by-endlesscheng-own9/)

```python
class Solution:
    def destroyTargets(self, nums: List[int], space: int) -> int:
        group = defaultdict(list)
        for num in nums:
            group[num%space].append(num) #Congruence modulo
        max_destroy,ans=0,0
        for a in group.values():
            destroy = len(a)
            low = min(a)
            if destroy>max_destroy or destroy==max_destroy and low<ans:
                ans = low
                max_destroy = destroy
        return ans
```

