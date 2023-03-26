---
title: LeetCode Weekly Contest 338
author: 
date: 2023-03-26 12:20 +0800
categories: [Code, Leetcode Contest]
tags: [greedy, bisection, sorting, topological sorting, dynamic planning, presum]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/202303/
---





## [Contest](https://leetcode.cn/contest/weekly-contest-338/)



## 1. K Items With the Maximum Sum

There is a bag that consists of items, each item has a number `1`, `0`, or `-1` written on it.

You are given four **non-negative** integers `numOnes`, `numZeros`, `numNegOnes`, and `k`.

The bag initially contains:

- `numOnes` items with `1`s written on them.
- `numZeroes` items with `0`s written on them.
- `numNegOnes` items with `-1`s written on them.

We want to pick exactly `k` items among the available items. Return *the **maximum** possible sum of numbers written on the items*.

 

**Example 1:**

```
Input: numOnes = 3, numZeros = 2, numNegOnes = 0, k = 2
Output: 2
Explanation: We have a bag of items with numbers written on them {1, 1, 1, 0, 0}. We take 2 items with 1 written on them and get a sum in a total of 2.
It can be proven that 2 is the maximum possible sum.
```

**Example 2:**

```
Input: numOnes = 3, numZeros = 2, numNegOnes = 0, k = 4
Output: 3
Explanation: We have a bag of items with numbers written on them {1, 1, 1, 0, 0}. We take 3 items with 1 written on them, and 1 item with 0 written on it, and get a sum in a total of 3.
It can be proven that 3 is the maximum possible sum.
```

 

**Constraints:**

- `0 <= numOnes, numZeros, numNegOnes <= 50`
- `0 <= k <= numOnes + numZeros + numNegOnes`



### My solution during the contest (PASS)

```python
class Solution:
    def kItemsWithMaximumSum(self, numOnes: int, numZeros: int, numNegOnes: int, k: int) -> int:
        ans = 0
        if k > numOnes:
            k -= numOnes
            ans += numOnes
            if k > numZeros:
                k -= numZeros
                return ans - k
            else:
                return ans
        else:
            return k
```



### Better solution 

```python
class Solution:
    def kItemsWithMaximumSum(self, numOnes: int, numZeros: int, numNegOnes: int, k: int) -> int:
        if k <= numOnes + numZeros:
            return min(k, numOnes)
        return numOnes * 2 + numZeros - k

```



## 2. Prime Subtraction Operation

You are given a **0-indexed** integer array `nums` of length `n`.

You can perform the following operation as many times as you want:

Pick an index `i` that you haven’t picked before, and pick a prime `p` **strictly less than** `nums[i]`, then subtract `p` from `nums[i]`.

Return *true if you can make `nums` a strictly increasing array using the above operation and false otherwise.*

A **strictly increasing array** is an array whose each element is strictly greater than its preceding element.

 

**Example 1:**

```
Input: nums = [4,9,6,10]
Output: true
Explanation: In the first operation: Pick i = 0 and p = 3, and then subtract 3 from nums[0], so that nums becomes [1,9,6,10].
In the second operation: i = 1, p = 7, subtract 7 from nums[1], so nums becomes equal to [1,2,6,10].
After the second operation, nums is sorted in strictly increasing order, so the answer is true.
```

**Example 2:**

```
Input: nums = [6,8,11,12]
Output: true
Explanation: Initially nums is sorted in strictly increasing order, so we don't need to make any operations.
```

**Example 3:**

```
Input: nums = [5,8,3]
Output: false
Explanation: It can be proven that there is no way to perform operations to make nums sorted in strictly increasing order, so the answer is false.
```

 

**Constraints:**

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`
- `nums.length == n`

### My solution during the contest (TLE)

I didn't use binary search during the contest,  a fatal mistake.

```python
class Solution:  # Wrong Answer (TLE)
    def primeSubOperation(self, nums: List[int]) -> bool:
        # 0 is for the situation without subtraction
        primes = [0, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
                  101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197,
                  199,
                  211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
                  331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443,
                  449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577,
                  587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701,
                  709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839,
                  853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983,
                  991, 997]

        def sorted_array(left_idx: int, right: List[int]) -> bool:
            if not right:
                return True
            left = nums[left_idx]
            success = False
            for prime in primes:
                if left <= prime:
                    break
                nums[left_idx] -= prime
                left_max = max(nums[:left_idx + 1])
                if nums[left_idx] == left_max and nums[:left_idx + 1].count(left_max) == 1 and nums[left_idx] < right[
                    0]:
                    success = success or sorted_array(left_idx + 1, right[1:])
                nums[left_idx] += prime
                if success:
                    return True
            return success

        return sorted_array(0, nums[1:])
```

### Test Case

```python
nums = [57, 87, 42, 89, 95, 100, 94, 98, 78, 4]  # TLE
```



### Better solution (Greedy algorithm & Binary search)

```python
MX = 1000
P = [0]  # sentinel to avoid out of index in binary search
is_prime = [True] * MX
for i in range(2, MX):
    if is_prime[i]:
        P.append(i)  
        for j in range(i * i, MX, i):
            is_prime[j] = False
# Now, P is the same as primes in my solution
# P = [0, 2, 3, ... , 997]

class Solution:
    def primeSubOperation(self, nums: List[int]) -> bool:
        pre = 0
        for x in nums:
            if x <= pre: return False
        	# minus the biggest prime which is less than x-pre by bisection
            # bisect_left(a, x) locates the insertion point for x in a to maintain sorted order, i.e. binary search
            pre = x - P[bisect_left(P, x - pre) - 1]  
        return True
    
```



### Improvements

#### bisect documentation

[`bisect`](https://docs.python.org/3/library/bisect.html#module-bisect) — Array bisection algorithm

**Source code:** [Lib/bisect.py](https://github.com/python/cpython/tree/3.11/Lib/bisect.py)

------

This module provides support for maintaining a list in sorted order without having to sort the list after each insertion. For long lists of items with expensive comparison operations, this can be an improvement over the more common approach. The module is called [`bisect`](https://docs.python.org/3/library/bisect.html#module-bisect) because it uses a basic bisection algorithm to do its work. The source code may be most useful as a working example of the algorithm (the boundary conditions are already right!).

The following functions are provided:

- bisect.**bisect_left**(*a*, *x*, *lo=0*, *hi=len(a)*, ***, *key=None*)

    Locate the insertion point for *x* in *a* to maintain sorted order. The parameters *lo* and *hi* may be used to specify a subset of the list which should be considered; by default the entire list is used. If *x* is already present in *a*, the insertion point will be before (to the left of) any existing entries. The return value is suitable for use as the first parameter to `list.insert()` assuming that *a* is already sorted.The returned insertion point *i* partitions the array *a* into two halves so that `all(val < x for val in a[lo : i])` for the left side and `all(val >= x for val in a[i : hi])` for the right side.*key* specifies a [key function](https://docs.python.org/3/glossary.html#term-key-function) of one argument that is used to extract a comparison key from each element in the array. To support searching complex records, the key function is not applied to the *x* value.If *key* is `None`, the elements are compared directly with no intervening function call.*Changed in version 3.10:* Added the *key* parameter.

- bisect.**bisect_right**(*a*, *x*, *lo=0*, *hi=len(a)*, ***, *key=None*)

- bisect.**bisect**(*a*, *x*, *lo=0*, *hi=len(a)*, ***, *key=None*)

    Similar to [`bisect_left()`](https://docs.python.org/3/library/bisect.html#bisect.bisect_left), but returns an insertion point which comes after (to the right of) any existing entries of *x* in *a*.The returned insertion point *i* partitions the array *a* into two halves so that `all(val <= x for val in a[lo : i])` for the left side and `all(val > x for val in a[i : hi])` for the right side.*key* specifies a [key function](https://docs.python.org/3/glossary.html#term-key-function) of one argument that is used to extract a comparison key from each element in the array. To support searching complex records, the key function is not applied to the *x* value.If *key* is `None`, the elements are compared directly with no intervening function call.*Changed in version 3.10:* Added the *key* parameter.

- bisect.**insort_left**(*a*, *x*, *lo=0*, *hi=len(a)*, ***, *key=None*)

    Insert *x* in *a* in sorted order.This function first runs [`bisect_left()`](https://docs.python.org/3/library/bisect.html#bisect.bisect_left) to locate an insertion point. Next, it runs the `insert()` method on *a* to insert *x* at the appropriate position to maintain sort order.To support inserting records in a table, the *key* function (if any) is applied to *x* for the search step but not for the insertion step.Keep in mind that the `O(log n)` search is dominated by the slow O(n) insertion step.*Changed in version 3.10:* Added the *key* parameter.

- bisect.**insort_right**(*a*, *x*, *lo=0*, *hi=len(a)*, ***, *key=None*)

- bisect.**insort**(*a*, *x*, *lo=0*, *hi=len(a)*, ***, *key=None*)

    Similar to [`insort_left()`](https://docs.python.org/3/library/bisect.html#bisect.insort_left), but inserting *x* in *a* after any existing entries of *x*.This function first runs [`bisect_right()`](https://docs.python.org/3/library/bisect.html#bisect.bisect_right) to locate an insertion point. Next, it runs the `insert()` method on *a* to insert *x* at the appropriate position to maintain sort order.To support inserting records in a table, the *key* function (if any) is applied to *x* for the search step but not for the insertion step.Keep in mind that the `O(log n)` search is dominated by the slow O(n) insertion step.*Changed in version 3.10:* Added the *key* parameter.

##### Performance Notes

When writing time sensitive code using *bisect()* and *insort()*, keep these thoughts in mind:

- Bisection is effective for searching ranges of values. For locating specific values, dictionaries are more performant.
- The *insort()* functions are `O(n)` because the logarithmic search step is dominated by the linear time insertion step.
- The search functions are stateless and discard key function results after they are used. Consequently, if the search functions are used in a loop, the key function may be called again and again on the same array elements. If the key function isn’t fast, consider wrapping it with [`functools.cache()`](https://docs.python.org/3/library/functools.html#functools.cache) to avoid duplicate computations. Alternatively, consider searching an array of precomputed keys to locate the insertion point (as shown in the examples section below).

See also

- [Sorted Collections](https://grantjenks.com/docs/sortedcollections/) is a high performance module that uses *bisect* to managed sorted collections of data.
- The [SortedCollection recipe](https://code.activestate.com/recipes/577197-sortedcollection/) uses bisect to build a full-featured collection class with straight-forward search methods and support for a key-function. The keys are precomputed to save unnecessary calls to the key function during searches.

##### Searching Sorted Lists

The above [`bisect()`](https://docs.python.org/3/library/bisect.html#module-bisect) functions are useful for finding insertion points but can be tricky or awkward to use for common searching tasks. The following five functions show how to transform them into the standard lookups for sorted lists:

```shell
def index(a, x):
    'Locate the leftmost value exactly equal to x'
    i = bisect_left(a, x)
    if i != len(a) and a[i] == x:
        return i
    raise ValueError

def find_lt(a, x):
    'Find rightmost value less than x'
    i = bisect_left(a, x)
    if i:
        return a[i-1]
    raise ValueError

def find_le(a, x):
    'Find rightmost value less than or equal to x'
    i = bisect_right(a, x)
    if i:
        return a[i-1]
    raise ValueError

def find_gt(a, x):
    'Find leftmost value greater than x'
    i = bisect_right(a, x)
    if i != len(a):
        return a[i]
    raise ValueError

def find_ge(a, x):
    'Find leftmost item greater than or equal to x'
    i = bisect_left(a, x)
    if i != len(a):
        return a[i]
    raise ValueError
```

##### Examples

The [`bisect()`](https://docs.python.org/3/library/bisect.html#module-bisect) function can be useful for numeric table lookups. This example uses [`bisect()`](https://docs.python.org/3/library/bisect.html#module-bisect) to look up a letter grade for an exam score (say) based on a set of ordered numeric breakpoints: 90 and up is an ‘A’, 80 to 89 is a ‘B’, and so on:


```shell
>>> def grade(score, breakpoints=[60, 70, 80, 90], grades='FDCBA'):
...     i = bisect(breakpoints, score)
...     return grades[i]
...
>>> [grade(score) for score in [33, 99, 77, 70, 89, 90, 100]]
['F', 'A', 'C', 'C', 'B', 'A', 'A']
```

The [`bisect()`](https://docs.python.org/3/library/bisect.html#module-bisect) and [`insort()`](https://docs.python.org/3/library/bisect.html#bisect.insort) functions also work with lists of tuples. The *key* argument can serve to extract the field used for ordering records in a table:


```shell
>>> from collections import namedtuple
>>> from operator import attrgetter
>>> from bisect import bisect, insort
>>> from pprint import pprint

>>> Movie = namedtuple('Movie', ('name', 'released', 'director'))

>>> movies = [
...     Movie('Jaws', 1975, 'Speilberg'),
...     Movie('Titanic', 1997, 'Cameron'),
...     Movie('The Birds', 1963, 'Hitchcock'),
...     Movie('Aliens', 1986, 'Scott')
... ]

>>> # Find the first movie released after 1960
>>> by_year = attrgetter('released')
>>> movies.sort(key=by_year)
>>> movies[bisect(movies, 1960, key=by_year)]
Movie(name='The Birds', released=1963, director='Hitchcock')

>>> # Insert a movie while maintaining sort order
>>> romance = Movie('Love Story', 1970, 'Hiller')
>>> insort(movies, romance, key=by_year)
>>> pprint(movies)
[Movie(name='The Birds', released=1963, director='Hitchcock'),
 Movie(name='Love Story', released=1970, director='Hiller'),
 Movie(name='Jaws', released=1975, director='Speilberg'),
 Movie(name='Aliens', released=1986, director='Scott'),
 Movie(name='Titanic', released=1997, director='Cameron')]
```

If the key function is expensive, it is possible to avoid repeated function calls by searching a list of precomputed keys to find the index of a record:

```shell
>>> data = [('red', 5), ('blue', 1), ('yellow', 8), ('black', 0)]
>>> data.sort(key=lambda r: r[1])       # Or use operator.itemgetter(1).
>>> keys = [r[1] for r in data]         # Precompute a list of keys.
>>> data[bisect_left(keys, 0)]
('black', 0)
>>> data[bisect_left(keys, 1)]
('blue', 1)
>>> data[bisect_left(keys, 5)]
('red', 5)
>>> data[bisect_left(keys, 8)]
('yellow', 8)
```



## 3. Minimum Operations to Make All Array Elements Equal

You are given an array `nums` consisting of positive integers.

You are also given an integer array `queries` of size `m`. For the `ith` query, you want to make all of the elements of `nums` equal to` queries[i]`. You can perform the following operation on the array **any** number of times:

- **Increase** or **decrease** an element of the array by `1`.

Return *an array* `answer` *of size* `m` *where* `answer[i]` *is the **minimum** number of operations to make all elements of* `nums` *equal to* `queries[i]`.

**Note** that after each query the array is reset to its original state.

 

**Example 1:**

```
Input: nums = [3,1,6,8], queries = [1,5]
Output: [14,10]
Explanation: For the first query we can do the following operations:
- Decrease nums[0] 2 times, so that nums = [1,1,6,8].
- Decrease nums[2] 5 times, so that nums = [1,1,1,8].
- Decrease nums[3] 7 times, so that nums = [1,1,1,1].
So the total number of operations for the first query is 2 + 5 + 7 = 14.
For the second query we can do the following operations:
- Increase nums[0] 2 times, so that nums = [5,1,6,8].
- Increase nums[1] 4 times, so that nums = [5,5,6,8].
- Decrease nums[2] 1 time, so that nums = [5,5,5,8].
- Decrease nums[3] 3 times, so that nums = [5,5,5,5].
So the total number of operations for the second query is 2 + 4 + 1 + 3 = 10.
```

**Example 2:**

```
Input: nums = [2,9,6,3], queries = [10]
Output: [20]
Explanation: We can increase each value in the array to 10. The total number of operations will be 8 + 1 + 4 + 7 = 20.
```

 

**Constraints:**

- `n == nums.length`
- `m == queries.length`
- `1 <= n, m <= 10^5`
- `1 <= nums[i], queries[i] <= 10^9`

### My solution during the contest (TLE)

```python
class Solution:  # Wrong Answer (TLE)
    def minOperations(self, nums: List[int], queries: List[int]) -> List[int]:
        ans = []
        c = Counter(nums)
        for query in queries:
            ops = 0
            for num, cnt in c.items():
                ops += cnt * abs(query - num)
            ans.append(ops)
        return ans
```

### Test Case
Too long, see [here](https://xuyanshi.github.io/posts/leetcode-weekly-contest-338/#appendix).

### Better solution 

```python
class Solution:
    def minOperations(self, nums: List[int], queries: List[int]) -> List[int]:
        n = len(nums)
        nums.sort()
        ans = []
        pre_sum = list(accumulate(nums, initial=0))
        for query in queries:
            j = bisect_left(nums, query)
            left = query * j - pre_sum[j]
            right = pre_sum[n] - pre_sum[j] - query * (n - j)
            ans.append(left + right)
        return ans
```






## 4. Collect Coins in a Tree

There exists an undirected and unrooted tree with `n` nodes indexed from `0` to `n - 1`. You are given an integer `n` and a 2D integer array edges of length `n - 1`, where `edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai` and `bi` in the tree. You are also given an array `coins` of size `n` where `coins[i]` can be either `0` or `1`, where `1` indicates the presence of a coin in the vertex `i`.

Initially, you choose to start at any vertex in the tree. Then, you can perform the following operations any number of times: 

- Collect all the coins that are at a distance of at most `2` from the current vertex, or
- Move to any adjacent vertex in the tree.

Find *the minimum number of edges you need to go through to collect all the coins and go back to the initial vertex*.

Note that if you pass an edge several times, you need to count it into the answer several times.

 

**Example 1:**

![Example 1](graph-2.png)

```
Input: coins = [1,0,0,0,0,1], edges = [[0,1],[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: Start at vertex 2, collect the coin at vertex 0, move to vertex 3, collect the coin at vertex 5 then move back to vertex 2.
```



**Example 2:**

![Example 2](graph-4.png)

```
Input: coins = [0,0,0,1,1,0,0,1], edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[5,6],[5,7]]
Output: 2
Explanation: Start at vertex 0, collect the coins at vertices 4 and 3, move to vertex 2,  collect the coin at vertex 7, then move back to vertex 0.
```

 

**Constraints:**

- `n == coins.length`
- `1 <= n <= 3 * 104`
- `0 <= coins[i] <= 1`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= ai, bi < n`
- `ai != bi`
- `edges` represents a valid tree.



### My solution during the contest

```python
class Solution:
    def collectTheCoins(self, coins: List[int], edges: List[List[int]]) -> int:
        # None
```



### Better solution

```python
class Solution:
    def collectTheCoins(self, coins: List[int], edges: List[List[int]]) -> int:
        n = len(coins)
        g = [[] for _ in range(n)]
        deg = [0] * n
        for x, y in edges:
            g[x].append(y)
            g[y].append(x)  # 建图
            deg[x] += 1
            deg[y] += 1

        # 用拓扑排序「剪枝」：去掉没有金币的子树
        q = deque()
        for i, (d, c) in enumerate(zip(deg, coins)):
            if d == 1 and c == 0:  # 无金币叶子
                q.append(i)
        while q:
            for y in g[q.popleft()]:
                deg[y] -= 1
                if deg[y] == 1 and coins[y] == 0:
                    q.append(y)

        # 再次拓扑排序
        for i, (d, c) in enumerate(zip(deg, coins)):
            if d == 1 and c == 1:  # 有金币叶子
                q.append(i)
        if len(q) <= 1:  # 至多一个有金币的叶子，直接收集
            return 0
        time = [0] * n
        while q:
            x = q.popleft()
            for y in g[x]:
                deg[y] -= 1
                if deg[y] == 1:
                    time[y] = time[x] + 1  # 记录入队时间
                    q.append(y)

        # 统计答案
        return sum(time[x] >= 2 and time[y] >= 2 for x, y in edges) * 2
```



## Appendix

One of the TLE test cases of Q3 is here. We can copy it to IDE for debugging or testing.

```python
nums = [244039287, 657055354, 564228458, 224511102, 132963090, 725715547, 707356217, 309056209, 677713694,
975988647, 129740051, 351685950, 578605266, 788807480, 231130692, 731502987, 479822949, 327120532,
399254744, 584158775, 326748024, 868069824, 268761498, 550075100, 153953935, 823663018, 176743809,
269379969, 790339262, 279052621, 770779621, 394655116, 407635340, 713817123, 355176864, 715295685,
279728855, 960994845, 374259658, 704815386, 452919625, 103343200, 367491090, 727072529, 730567542,
729824266, 952133436, 59654946, 180440100, 162952698, 395348149, 25497051, 891099718, 743915902, 149070584,
591989455, 219178811, 994443952, 635990469, 278814949, 117156334, 168966480, 995821555, 137670249,
846116460, 685934312, 274971118, 950581792, 918663679, 122066306, 634720632, 930409507, 567091829,
163156391, 252107453, 500373503, 426366197, 318655974, 112670141, 14385564, 846203531, 779146642, 91710847,
255269006, 449143443, 377804079, 720882389, 845537523, 665506908, 629441589, 972994895, 661970817,
63033808, 916684179, 173269954, 766120768, 689726241, 433100021, 962171255, 377590770, 631777567,
936786931, 397414802, 363833234, 87156371, 686746140, 678854375, 298829262, 325805557, 197017962,
516552006, 527787242, 277296787, 814422398, 192493905, 725929509, 240826084, 690161007, 156360741,
757867248, 330917785, 254439106, 744878232, 797769644, 902858130, 226945282, 334537854, 829686495,
953721961, 100974376, 849041549, 307385144, 398605072, 820134233, 173819871, 777978452, 349332235,
983219272, 284299326, 309551188, 417471511, 273987421, 481215386, 186438622, 623985674, 795774462,
153980766, 943300390, 470604583, 499075045, 864255683, 641812161, 434923206, 615325853, 673990437,
93607408, 422376808, 206293325, 678125958, 330830629, 357740735, 481932985, 542708063, 544251657, 80322804,
947094283, 662458676, 670805952, 222031547, 349108005, 298460785, 803801230, 160051993, 288549193,
253995746, 326236117, 546370313, 587008684, 995444146, 579273502, 160455833, 739719305, 938198321,
107554858, 547772594, 530721338, 527903772, 497580336, 338780249, 392981203, 725043871, 206018730,
143125475, 266096653, 962886757, 932897884, 570999650, 270219525, 370190610, 840936253, 222998554,
883374531, 921543903, 304918180, 134245238, 175946567, 318019692, 768251407, 803408506, 236357489,
21371726, 596595953, 102750066, 978233958, 995370876, 333620080, 516942968, 400079440, 850156349,
534035207, 677889123, 440131477, 597520369, 793181469, 794202647, 978016640, 358133225, 313873839,
204366143, 730962019, 940567651, 857262241, 823356819, 18414292, 408861716, 885204499, 584836529,
496008462, 768085663, 256998992, 18461811, 445226209, 273065153, 740014473, 536954434, 10177144, 535226247,
281276327, 949427776, 710925845, 946895931, 182760144, 175797943, 339005700, 884627010, 190500167,
349292157, 491230544, 543414786, 418651648, 69100839, 761875775, 73059353, 607809654, 979612567, 929418223,
456365971, 806640446, 81911070, 97400394, 821459312, 218387159, 770202391, 765369640, 375449907, 968740807,
544594729, 349691673, 43525882, 753877281, 401475434, 875842820, 248434435, 396261173, 42535813, 991693701,
881037450, 323444561, 415647400, 341780817, 793553107, 920374944, 715714181, 990785695, 772186592,
44769074, 918299610, 418134367, 491136247, 71052358, 561493889, 836374374, 465301116, 89544229, 565450115,
217666326, 233705932, 895550143, 489400604, 875489711, 73270274, 959807932, 428733092, 256741558,
235611592, 136827623, 346489328, 986402250, 825512954, 945459243, 164858253, 979426311, 235041393,
577528090, 671134646, 587981029, 85148971, 492791849, 681744555, 663642401, 194363984, 305110154,
868012600, 78380646, 454262872, 302141246, 394902611, 639584260, 14564104, 952124040, 956032872, 329881275,
551996482, 704576834, 852875004, 427060277, 279158983, 449220266, 638130439, 935490157, 883216665,
687819992, 41300499, 850056299, 389930920, 579779322, 840101833, 996383506, 802892395, 366502067,
763882978, 168984544, 171514839, 565309377, 273587023, 292644706, 938692127, 429994126, 223854712,
496537625, 425724845, 22779289, 149768704, 92190195, 115280203, 314606152, 129903839, 777704267, 48038456,
28588404, 992836576, 710643211, 448320013, 500653128, 168082756, 700272224, 532335603, 664803335,
495696906, 893291795, 743872962, 900312593, 804208986, 18168199, 325164625, 847082611, 521722687,
889980237, 597506140, 826255067, 793192327, 226702804, 943214538, 287505670, 795027443, 150653229,
164723352, 194304943, 114755045, 533091777, 775803122, 427625344, 291257874, 676517779, 227744696,
914231216, 493429418, 703601187, 889330496, 903934930, 96625171, 333747822, 377372869, 499790345,
508797153, 341030069, 280925546, 547044950, 867106567, 244435507, 936076422, 962036523, 737317971,
852454170, 603646763, 935292716, 766625290, 356299971, 362965323, 449430003, 25160084, 281440158,
148916310, 724137234, 296329597, 975422038, 327981100, 257423674, 113083901, 885477157, 16954983,
844537219, 589357733, 565826723, 749529204, 621907562, 351918433, 34699179, 536500276, 309504030,
127863186, 354772772, 17489510, 217600607, 613176105, 346974101, 148848480, 399872639, 489641141,
826846264, 731324508, 382852553, 511293901, 370463815, 958192131, 496507580, 688471706, 349574065,
50384092, 587312349, 646165740, 861423669, 58026615, 32107511, 100622788, 456541258, 397164897, 567747983,
40573138, 460983505, 381963995, 71253714, 280103606, 111428499, 962985645, 123233849, 411051891, 365599972,
784730162, 323399805, 191821812, 864094781, 731576067, 913903764, 766338153, 886942889, 752185495,
382951511, 187709142, 658003988, 869709989, 743297243, 817203373, 184920517, 876835670, 261610189,
519528524, 66000072, 163440891, 493447188, 235723988, 959858965, 753224458, 639066846, 452036566,
889307017, 980170283, 866894328, 890197604, 592428643, 233065526, 802129516, 756403488, 159029410,
429968826, 787424153, 918456834, 665122509, 615147524, 287811147, 807550834, 836542606, 124641827,
476849245, 3375366, 823330997, 670449049, 149388173, 883240517, 556593903, 628629065, 270029788, 91503855,
162587242, 436882249, 878204593, 673569959, 311922173, 217194918, 95561121, 976269120, 395561308,
515259159, 848237232, 732094379, 682617772, 435514937, 176689406, 759455635, 744785559, 22941723,
214878186, 353852218, 322582259, 192985770, 216297096, 920529058, 258648130, 487923503, 259267662,
834462615, 889765288, 457618595, 360175088, 686480486, 923176943, 101552546, 45725308, 212493047,
293068825, 783520056, 38456958, 829044735, 445558288, 50357453, 396143482, 893225690, 383364598, 530703811,
767129574, 748308517, 898866917, 133577397, 61920104, 220138086, 777652125, 546367505, 404286745,
295736079, 319971959, 83473065, 554131681, 66330266, 939109281, 948021965, 487383196, 75273068, 186968733,
934245335, 851275853, 646399680, 176617428, 227945010, 729163784, 650058009, 992532281, 700037296,
374685915, 112125574, 765011528, 127947667, 592420403, 857510398, 613646194, 997059260, 626426989,
743230406, 565047446, 183581634, 32546800, 218077922, 751833777, 705744878, 580756888, 831697297,
720191656, 613832425, 567140335, 522965038, 545893220, 429353583, 292171209, 188048143, 789629120,
919759941, 71859232, 695924306, 735016045, 788916277, 400916530, 81523552, 528788902, 609745395, 19041357,
377447397, 538478357, 36050374, 313397646, 743322531, 488864438, 281459886, 440384077, 705844368,
969733377, 371738650, 541752518, 48244624, 146181233, 16305683, 598027456, 257340024, 69907953, 903514699,
778356022, 516194023, 732543334, 263146464, 260859890, 571991131, 104090442, 316769764, 209679187,
47411355, 897970427, 247749269, 139666454, 283075015, 130450157, 851633318, 669581926, 520489350,
181099164, 339283777, 805929275, 921448908, 149078527, 474421604, 595585775, 462183318, 882428376,
775573104, 187432077, 700450967, 371641468, 131448016, 731610532, 25468270, 243349176, 84350960, 351751092,
180291475, 59091140, 187276313, 484879082, 266867373, 376962900, 183497556, 787698797, 799871006,
899163996, 852454517, 921651521, 154938613, 32853980, 112697179, 352331898, 975714510, 679425588,
578960951, 774375068, 573313566, 685524750, 157741276, 414184928, 212589312, 795251243, 966678141,
130858363, 397539343, 494688142, 281338634, 311669763, 339124983, 978518824, 444210601, 350084524,
553296547, 421795621, 86755851, 136530618, 58478461, 363625562, 778761317, 987872538, 281934747, 251263612,
94437575, 740274086, 815378681, 76104262, 365943814, 148259423, 874513048, 342631527, 218029724, 202610198,
665947450, 196786951, 729098747, 18070320, 65056110, 212095786, 196624508, 69613608, 69431497, 74128883,
881237811, 153997572, 733177740, 740145150, 637568859, 899569618, 187233718, 455305957, 651129172,
265368678, 982843684, 561758156, 461538900, 968306807, 983150587, 576851590, 610462848, 942331887,
748492878, 62815233, 181422254, 653200975, 903988615, 649577470, 175793076, 901883691, 954148899,
545560120, 438252367, 733816088, 942493781, 918839277, 968040406, 282204283, 596006623, 269597235,
601953626, 501015641, 543611059, 766822668, 83838899, 257120396, 202509209, 891660185, 64774687, 752563290,
612966959, 557084807, 7673189, 530673833, 5986347, 460587849, 553688399, 358701752, 302377268, 268107411,
405515312, 66768594, 396324322, 208699565, 307822952, 54370961, 861251217, 993154044, 329680456, 787215800,
990577061, 919521713, 409866348, 883259303, 543679748, 451077063, 618906441, 387973615, 202044029,
550422266, 165652537, 829555597, 929503328, 209819534, 803519362, 680417641, 421315430, 307096628,
107376406, 145403094, 154480495, 560378487, 226427498, 23538222, 926740526, 156107161, 545873690,
932501499, 895779248, 145286174, 496372640, 554201249, 882080729, 825552570, 607292695, 514748841,
491996169, 408353170, 189103484, 400506392, 578360420, 787603314, 348918852, 644792268, 896148116,
764422046, 341312604, 228326250, 81898142, 405104964, 33694240, 853428713, 100717073, 871656339, 591385873,
616448933, 40428217, 337792297, 870586070, 974202708, 192946940, 629910612, 889709947, 750500939,
870040053, 779897373, 580777963, 999111405, 246522450, 666039866, 340295490, 907740643, 925578545,
439029371, 796964718, 386391889, 842598722, 452470259, 46438434, 499374536, 396647996, 906890951,
260217900, 317933355, 630181508, 113509698, 775495914, 49448009, 143945363, 772244848, 736409230,
337604800, 306851361, 582419388, 326876703, 86607610, 954342109, 732322444, 920783852, 87077772, 271826483,
31501138, 753179660, 211476195, 48203004, 718495966, 244902803, 732418313, 293519496, 151822120, 430511393,
367166590, 506846280, 540379531, 867000834, 118537545, 99768285, 344370910, 654636626, 22120925, 366640636,
611047851, 556443060, 634532188, 860023820, 171414587, 74769184, 964489864, 786599443, 747929879,
252375675, 457641877, 612482186, 229652582, 300504257, 191180270, 459516550, 347368593, 630223848,
21465358, 283226561, 926914915, 761319339, 924025353, 723747787, 403431765, 494976384, 837024374, 58228708,
609609941, 616409895, 315159397, 860119091, 804716592, 185164704, 170008491, 985380574, 553400458,
773155048, 882165466, 438382755, 822246685, 759002111, 218743180, 889585901, 184006703, 611632193,
903348918, 641395871, 135693436, 99467802, 191311598, 24242767, 947793315, 527744530, 737011630, 988091998,
341696265, 525105106, 545446319, 836842427, 580546611, 120603111, 463091360, 69635505, 56609962, 439276540,
306260161, 248688752, 872134718, 9631037, 157000955, 658982940, 648409892, 18995139, 774073684, 732268172,
166026797, 41287411, 268579110, 174558593, 413378553, 163081033, 734462843, 869674286, 395502802,
670225821, 10394400, 83965084, 811048700, 407593544, 600635673, 109949539, 878000443, 941319803, 722921131,
707947900, 192331586, 766405655, 690590147, 729449139, 541675797, 395220153, 413204576, 670858742,
100627915, 327937682, 140534585, 600298802, 195456461, 231876908, 68830349, 49820600, 536960789, 953669341,
667105808, 350952747, 734504292, 776514307, 973672760, 609666239, 29942522, 785188343, 709529209,
500443141, 34808325, 119171567, 133268383, 657082494, 838714644, 970812930, 409125197, 603630688,
900410417, 851892022, 4006173, 6825038, 878880862, 490283440, 279762264, 25266070, 365501602, 828472336,
279549954, 45845226, 981506480, 203608360, 659728961, 989262604, 239541808, 624433838, 903258977,
814352093, 274067626, 529389331, 741668850, 735846911, 628582641, 630312200, 322827522, 276592148,
156024466, 562743047, 981325251, 468757705, 983372954, 621913362, 515999879, 479224832, 262228752,
757547434, 609234736, 59986026, 453083385, 302348546, 556867195, 638888480, 833709640, 406508666,
623553609, 251448595, 330283895, 496345749, 757984394, 956657613, 368304599, 470471451, 807493732,
232784808, 882383204, 66833187, 538452387, 998240937, 130191297, 885936505, 171486811, 574882921,
846045174, 359084510, 128658544, 615967177, 689794788, 408550447, 485944568, 350839485, 183921541,
694232456, 856506051, 523832945, 284971737, 887903480, 146695876, 663510459, 864048564, 337136802,
604472268, 966262441, 45876606, 454067003, 289462842, 299678300, 476324427, 64110974, 587705835, 978184037,
628431470, 512312836, 361040246, 920802900, 584932804, 629420454, 837910209, 12914975, 38723476, 41319338,
545392240, 854381461, 650720807, 582093508, 729051478, 52763040, 10976465, 337885314, 360351728, 838944752,
315558789, 366413622, 639583339, 490291860, 653689233, 481234730, 443530009, 545085439, 107446681,
541061651, 723460241, 403770539, 780573485, 870039632, 580854779, 786899289, 24940498, 806080120,
587740192, 434439387, 357339428, 244946579, 43176022, 351383357, 914051335, 301991371, 538698179,
419712902, 224985021, 950696274, 486818372, 774617593, 793370123, 739584181, 189893615, 403070069,
774366245, 672564303, 802439197, 595847380, 761500540, 275268090, 407158322, 617696294, 102729122,
55141671, 932942, 542172586, 557753832, 186312476, 275467274, 966525096, 719162048, 629187698, 915696676,
215882369, 204798573, 136083559, 103170934, 667090943, 296246696, 182091518, 897676999, 364092064,
58218084, 953678103, 391840252, 440188225, 726154717, 645054207, 711864611, 102396067, 351337559,
192894648, 436149623, 726031309, 12967627, 338055954, 670576132, 817690906, 607169908, 266832470,
481486105, 520452251, 700650899, 158264248, 141283374, 959304720, 765403575, 450966828, 83178440,
476362429, 991530027, 658459944, 394701264, 979506587, 280427291, 104947553, 327249402, 754720103,
811175509, 169818615, 317026996, 807595881, 740017531, 621711401, 994263705, 77527271, 545816231,
488408877, 176992364, 547331484, 490010908, 930192288, 251163201, 147645510, 937799316, 647767363,
290414883, 958256958, 348252679, 891082232, 348695145, 689789509, 575465766, 375075965, 22324244,
338091224, 836505932, 614052861, 997911277, 165852090, 813313937, 308971934, 349905718, 176870949,
755727840, 241828363, 118992290, 606468963, 575854821, 3776750, 712871908, 666767598, 955921739, 452574506,
649563570, 316631247, 264996626, 848090745, 7423416, 640108706, 492052667, 234615566, 616985272, 350544366,
577135302, 575026011, 974448442, 169326516, 478237431, 622609568, 154762421, 145459151, 547903160,
577273132, 399263507, 246437428, 69254076, 434438146, 584249022, 695927865, 597595585, 473728333,
694446101, 603847996, 672215865, 597585876, 422159840, 933577759, 203899307, 168428048, 564106129,
208250723, 810791413, 300917159, 460243522, 513246836, 750108703, 238546475, 611947006, 311328132,
475106011, 62625627, 311258928, 94934488, 850836273, 965408301, 293421555, 894757253, 887040838, 604168396,
806761621, 799345212, 109238699, 708791131, 423259525, 933381868, 666169772, 237911177, 423944958,
699938253, 641828632, 19911109, 897840142, 554582509, 90777437, 69975603, 770914089, 691382622, 742585060,
165777952, 655644070, 159971394, 572850378, 760619820, 212253478, 464483377, 185583314, 400796398,
426930815, 490792805, 316661648, 699569260, 809716499, 732255370, 655747372, 348352808, 161925183,
884420605, 685275980, 563129014, 772040821, 847652429, 991398961, 897417448, 126077892, 279100259,
457455712, 854283262, 857497127, 108965298, 161322072, 518097336, 958510569, 182375981, 252425810,
357149961, 39921977, 23470272, 582934345, 251043524, 96906417, 105910866, 233355982, 333349972, 85638880,
988048082, 669509667, 694522080, 472705891, 632990131, 105994752, 238747199, 714580400, 359663021,
331585658, 434679867, 819264889, 724708914, 195764316, 137406871, 572910200, 914489695, 849160780,
226485775, 630996352, 902783318, 339360058, 850149699, 536148031, 773618027, 937273485, 442058411,
170558671, 914671767, 535838011, 376762196, 653996696, 421947672, 439369650, 888312732, 418942712,
518803252, 86515679, 178983483, 427635452, 200471241, 439694299, 31057598, 470042645, 227061610, 620509547,
151129980, 475315543, 175695543, 930156216, 252390185, 803791029, 78425538, 39908293, 809007774, 399603334,
583417378, 22371644, 77364848, 953862104, 518940145, 51308376, 212345544, 619898335, 245364617, 635482905,
936318651, 60841067, 793875716, 361328257, 663802983, 269388427, 229033243, 644726091, 583655620,
995995720, 568444315, 867806117, 832199503, 71851824, 298827536, 69416393, 153779320, 238896277, 18282806,
861049643, 959367199, 330919128, 990952279, 220982822, 915537711, 847098243, 729474770, 806783405,
684897670, 152980150, 825347146, 521959886, 67219495, 76707901, 868711951, 782193179, 754926694, 39011310,
700773619, 827428363, 786985384, 608020410, 102598389, 210740880, 615609802, 359614118, 11100058,
503058481, 487695294, 383888697, 595514487, 959099782, 855570594, 385378182, 162793273, 425990174,
949089748, 103976860, 336100738, 608945929, 474399835, 794667182, 207865003, 917820211, 98745120,
199790393, 724264034, 346296366, 54471342, 517471404, 449768798, 274056981, 487894894, 986511836,
508389718, 529317127, 913077264, 80679618, 161678771, 922485905, 599331578, 302947288, 688506744,
878302606, 534776865, 130155306, 361076702, 228325193, 987712702, 405582528, 274048832, 383822718,
869858616, 905334424, 306768306, 327678501, 680155376, 579766165, 376009591, 580257084, 537534208,
822297589, 876901775, 649482799, 655480871, 699006542, 315579549, 316843138, 64171267, 743976655,
195322429, 992054182, 476869039, 940886094, 494119092, 985101039, 590778850, 953682466, 717098726,
644460859, 571025902, 769716291, 888981918, 398273384, 33384284, 529277751, 332334296, 164213048,
865558545, 486341137, 602932774, 761297602, 685890820, 158157869, 381804635, 742170798, 866664315,
279683650, 230568027, 659928337, 18356143, 460975004, 340067045, 85440423, 235274698, 893669649, 201768897,
207460845, 239760480, 725846165, 212010561, 335075768, 32111175, 451424225, 767307485, 503280387,
602976407, 873842652, 265707763, 251182397, 197208158, 428639684, 704982266, 240264077, 430482473,
194521196, 12685061, 589776593, 72104317, 229924073, 517908676, 991901892, 261501529, 501041236, 518279523,
546237069, 786828769, 398410399, 630795792, 240046089, 159893771, 423313614, 295357728, 594454198,
308758393, 283030960, 151489406, 764887630, 697557368, 291813613, 259211380, 969643483, 26167687,
781511355, 247491832, 838174375, 149556530, 421395843, 781080272, 209061697, 183210364, 764282763,
710663108, 148288931, 677780494, 681846126, 966235412, 26409326, 975816661, 766967043, 130861888,
539582363, 413430889, 974302788, 754199208, 667378020, 534582219, 94968886, 491838872, 671125805,
318070273, 276217379, 706383685, 997776295, 567208120, 618591107, 574679789, 887124546, 354810109,
258973902, 447825541, 699258366, 714817558, 990385939, 930147435, 937869692, 590293547, 106936680,
851894193, 677367321, 463184170, 816162287, 995120907, 213706028, 567324447, 390261489, 383334683,
689185481, 471176722, 106413412, 355536890, 969025819, 804582207, 623532852, 523762075, 300848185,
36568760, 255079387, 638454803, 525083168, 463650050, 51052054, 250108495, 772282348, 621938082, 92542542,
884104426, 628166931, 535280362, 626365177, 669005260, 372390402, 507619551, 953236666, 174119312,
827730377, 992620344, 35925553, 913405361, 742341237, 222776311, 6503291, 335634597, 924828989, 855219930,
696915968, 356447082, 340340489, 877504022, 825512898, 588166817, 440591416, 190892733, 409478031,
697010006, 331092112, 341624620, 207404779, 205820259, 831961617, 723688202, 535556864, 435425455,
886872239, 733785894, 535945499, 184124454, 706281354, 130841452, 789988443, 591313715, 456681738,
489725405, 546926105, 876190097, 823826085, 70961684, 469293430, 371246268, 210404449, 100290307,
756867836, 845549288, 138653608, 617701546, 929614711, 179740496, 60910325, 429001056, 329290788,
895765202, 903310850, 469602525, 977008693, 91908208, 930165616, 663026082, 884069458, 765476343,
670471458, 582019190, 455844147, 604623469, 614758470, 796066966, 419385787, 372259616, 689877631,
14788229, 399634941, 180261406, 538214124, 945131975, 914562914, 523761808, 849500638, 912591203,
877629529, 766251644, 132196097, 633819784, 995273242, 399461027, 860199389, 811528029, 180877320,
873194568, 753822197, 189044019, 615081694, 583287367, 437434050, 295659224, 811389646, 681306391,
934741837, 508293626, 580604234, 579167147, 256825951, 402599661, 145711621, 773520044, 349945550,
391860797, 913462779, 33160268, 336373031, 789073474, 131708793, 915051596, 711904098, 784762003,
512084194, 83560076, 552739445, 414139851, 723102125, 363069711, 224704522, 387524965, 623381456,
914395500, 611131382, 156071576, 971935532, 428678392, 766714936, 299117307, 148616310, 300657801,
768146008, 173201957, 670806163, 800428832, 79572032, 501660217, 129503324, 955883972, 243158329,
575440507, 4358303, 84342381, 231545349, 555322687, 225648243, 212089019, 626757986, 571361254, 634115947,
820380831, 456508804, 912554488, 393699675, 614501040, 68182776, 372078949, 7686540, 736892471, 631766153,
140459609, 197619322, 377198201, 697423033, 450779484, 592952235, 714566152, 604531135, 516769966,
182469894, 529367008, 451507530, 3594332, 143193018, 644920902, 179304208, 281972741, 122368757, 455294025,
538618947, 10140838, 429214975, 34368419, 107697065, 540362132, 849983278, 301413520, 684352005, 966207293,
880124732, 873263261, 937060709, 765754460, 747711219, 45908204, 842503281, 662231429, 949480138,
408869344, 253283074, 112005197, 893945148, 507449835, 182984362, 200143227, 670987949, 414540210,
363569793, 319770686, 558021676, 97691704, 395237773, 280239410, 463148932, 878198463, 427107722,
291598329, 581055917, 104879926, 603440467, 248459797, 483692044, 254343270, 469270002, 887060518,
497498022, 493144457, 819154716, 65789232, 83273618, 56026018, 646142286, 138820417, 114979315, 253012688,
570786377, 434240268, 725492691, 761661328, 271631475, 388167278, 319539860, 600671458, 104050233,
965349718, 174774194, 833891611, 535494701, 955705412, 857250688, 105390380, 830628006, 599137324,
118145786, 236943488, 707612083, 467933763, 108127098, 229061752, 672719873, 319800305, 201420578,
776582987, 263941051, 711099207, 801494767, 419276606, 190782459, 511906540, 557808736, 612822686,
608850071, 371805132, 82437409, 10501939, 930650567, 985382282, 407687819, 381796555, 653501399, 967082875,
349119421, 812407961, 74789213, 400712864, 978705337, 100236055, 662266037, 908877816, 250530043,
742463875, 757767422, 222801911, 362031896, 465366180, 114959835, 854061880, 390530398, 212776314,
93112812, 266236694, 209268876, 106759700, 351715575, 138289335, 572515335, 147908810, 688445002, 41973206,
628767771, 115037865, 826162269, 964304597, 467393869, 738249053, 973907801, 717494741, 52187523,
865624027, 351859935, 154840298, 878686376, 152898503, 501588645, 932182516, 107278195, 925762118,
900960084, 249276732, 661885844, 465897781, 830213255, 213034873, 465982544, 616699816, 481251565,
844915343, 450976327, 482875721, 937500663, 186402445, 977354805, 808558163, 56752117, 876180628,
578530390, 803904737, 700723584, 49640735, 629466720, 670340093, 362135324, 561205191, 74818013, 755046317,
448307087, 594827702, 648864983, 100981612, 78330274, 984986349, 706680855, 764720443, 345137670, 31736473,
8148571, 750282200, 745063004, 856349237, 92730325, 605004336, 755570617, 729090580, 581183491, 592073385,
724706380, 84114051, 176685524, 304464419, 289627904, 633864320, 446060, 460427423, 284466403, 558579140,
378753421, 473342868, 920068211, 624046255, 484694225, 324353855, 604292432, 410093555, 921558531,
587365816, 262279846, 759056307, 222443258, 574883325, 638836679, 79665399, 918521410, 992385001, 12192371,
887423256, 40326082, 695475616, 63023665, 12808002, 90161049, 21880670, 626658187, 436651962, 754175686,
653743725, 786973558, 629501566, 344188483, 945717686, 742709199, 836811160, 760105410, 110084962,
307321962, 661933531, 551387374, 156178543, 998322447, 767372349, 120753182, 169969017, 853207083,
461165414, 20844779, 795917384, 947521069, 933925119, 603715571, 414945270, 478135603, 605497665,
995737091, 627712700, 707365740, 667530062, 408692741, 89615194, 594468108, 167854856, 621253413,
218026788, 910211007, 720527582, 242982784, 424749471, 554048406, 427176670, 229532221, 349684270,
976622736, 341883765, 696454526, 724034535, 559355535, 146401576, 855675203, 263298379, 194444972,
37655354, 187755945, 667163853, 988790412, 182209134, 454712918, 626899092, 338391758, 458467218,
106341168, 198295994, 302060155, 977829604, 423731519, 346070971, 303571377, 401324863, 660672520,
665663026, 311528859, 200374932, 342798654, 581913345, 293074591, 693729651, 584912731, 831469643,
944224767, 710926384, 190895754, 294756284, 109749068, 711703642, 274565910, 535677539, 556893434,
332391364, 740270928, 244038837, 523093975, 318561861, 820708565, 286145322, 987386903, 230924253,
522403763, 604789120, 79659154, 608747306, 104433375, 257893569, 216472172, 648840946, 170009815, 65305792,
634266347, 614526560, 112724386, 540618181, 899288852, 680424799, 685347485, 645515852, 864944871,
514003569, 885455848, 264231182, 847601986, 628588552, 753202146, 928574058, 292994367, 226118853,
889804219, 336913858, 459066708, 115442496, 956131464, 235934595, 464152943, 384845722, 497416698,
492410027, 917186966, 395498756, 633792862, 476544918, 136793728, 228328560, 569811048, 683849240,
501440745, 350999051, 385894970, 12889314, 491462449, 523324101, 505895125, 582642978, 191967074,
920762734, 197123400, 341398937, 555573903, 898205938, 551496319, 101881866, 330426272, 939957287,
545077905, 580388307, 675890538, 340817084, 932090111, 368046698, 695925589, 479902472, 616780865,
503553512, 370968290, 167405198, 581912823, 975235323, 107298786, 913030827, 882236205, 629057449,
557242653, 241421355, 477841452, 83884339, 495617636, 19284921, 368534183, 945701119, 455859567, 648869613,
45728040, 620128039, 177008403, 919931832, 454083668, 181719807, 116214391, 560922929, 501324318,
235782297, 34342564, 487060819, 1064414, 895085939, 787004600, 286791900, 805264378, 984840460, 852551574,
728980695, 326753124, 495489629, 875465554, 791176695, 254924031, 54171731, 862437072, 130371457, 50833958,
473798799, 629567946, 350853062, 598457124, 366535505, 347023674, 751434671, 649661381, 857165363,
975261297, 951996439, 831050469, 218343247, 614062543, 998672251, 317630151, 719806515, 911129111,
795778373, 442810983, 760824286, 751232916, 553369658, 184443441, 225916267, 933777174, 992949870,
543902485, 341571665, 623039305, 743515747, 171165203, 305939827, 928914246, 357682043, 432498604,
378851182, 496411582, 792040090, 781733342, 703657505, 252186098, 832764022, 393806252, 369923944,
248390910, 679418670, 470991517, 741145492, 594316384, 462110898, 666173920, 994279476, 131076070,
436680332, 521985930, 49448451, 774018308, 778262876, 136603944, 424454614, 261391834, 615411383,
789444612, 998295638, 686476132, 813807722, 393802239, 320109241, 754023569, 8329682, 831858502, 600857370,
203374762, 193893488, 579867942, 430645379, 665371690, 613497119, 571328247, 800019873, 627936071,
650972463, 231490739, 575027884, 184479149, 378257291, 990206594, 965007224, 469646892, 12236370,
877980894, 361295903, 443206783, 808776434, 118998028, 484772737, 374621570, 963180990, 120887879,
997393844, 887448914, 206993437, 143675145, 818043742, 644817610, 111838693, 362670141, 750654800,
974041761, 268718740, 337278309, 855791894, 771607332, 68508797, 76833719, 39060753, 842419705, 148043096,
807166866, 605436957, 374398957, 113493372, 632037069, 8722339, 498608614, 257890494, 216221598, 413010591,
287079019, 302106766, 707826010, 961676556, 718204017, 241545792, 599840676, 718861842, 165566338,
69803906, 444472775, 406224491, 372113979, 849489222, 204705056, 903092468, 711975632, 943294436,
587411212, 206723044, 24623526, 157640727, 753054617, 883231618, 51154699, 244336600, 682021480, 816910100,
935990830, 205227514, 862008451, 622078232, 196763850, 660279128, 569477946, 244321363, 614085361,
758289858, 699970809, 562400851, 12886655, 686047741, 538308575, 1549016, 46925109, 192162356, 314106243,
305684122, 931562506, 886644933, 419382713, 824287342, 184329669, 510237512, 257095832, 536739852,
667592737, 420468959, 252787285, 893208163, 448126661, 735258219, 386029559, 45876915, 836648517,
855944944, 663873160, 827931839, 886642699, 390506511, 947591912, 966942059, 905508407, 106622034,
612043823, 561581260, 947059278, 290584349, 20241791, 100290, 61201595, 325078784, 522248214, 422411314,
770883858, 104267538, 516767022, 258618805, 595023271, 691839493, 369972670, 506997281, 418110309,
680168059, 592035369, 848536031, 403086524, 84672910, 648424969, 797701927, 533625542, 894702928,
158766942, 314906210, 52231770, 554962123, 190758572, 976951442, 432234691, 196334718, 576899328,
945405595, 934860851, 651579225, 853453216, 882597556, 926000125, 754569670, 476131804, 274438765, 1700444,
734755111, 961947922, 60023986, 722524894, 828094948, 68944268, 346296862, 760870521, 459005801, 944190349,
911580277, 526518392, 895229821, 408765209, 865161659, 537819408, 513385665, 153034718, 387034233,
477310765, 410974309, 384711706, 392936493, 606443358, 892269468, 128345407, 810404863, 378501781,
738408089, 423547185, 954180634, 237917308, 623651083, 621228504, 773174293, 433328653, 821834893,
246849805, 971175098, 55704072, 488839391, 560027334, 53878335, 945659233, 857649701, 441144870, 391115418,
690566697, 545662006, 671954891, 53013029, 637877962, 535821057, 364426667, 234170469, 506503925,
102447885, 362671726, 910162245, 445255406, 923607582, 820431454, 250853748, 943791573, 275315862,
676043627, 178159279, 110931336, 845648503, 163172185, 272480195, 256393378, 622038132, 288167696,
413918086, 655929224, 508262327, 133635162, 920159417, 5241334, 487635014, 589842921, 764323618, 783583847,
587195183, 375554711, 17196216, 327150320, 677597544, 136402664, 446941801, 842671779, 660712748,
138912248, 276087823, 708976131, 720332837, 139651863, 47740770, 760361341, 187480006, 452127816,
616227656, 210834806, 555687318, 296460799, 102269451, 432857295, 632603728, 773638149, 985272302,
409609589, 377570007, 113379508, 44512254, 390732865, 968202658, 969921134, 676284586, 862338309,
529823661, 286990097, 370077078, 56153438, 646044496, 579418020, 982854308, 950294342, 77211056, 540486271,
478270811, 76785614, 438355094, 523045494, 359650444, 40588159, 526113830, 939466411, 978125096, 152598002,
375680199, 110062441, 146076435, 325456104, 910456075, 568166287, 205515701, 294667069, 253580332,
34458809, 772620292, 280001904, 866390743, 948546082, 794251645, 155417066, 218449404, 231167603,
853661921, 87831679, 408380048, 157521229, 406641601, 947503092, 278285710, 916406132, 393626286,
809527054, 101060730, 536721992, 517812443, 597161469, 75074599, 847219580, 40418067, 93148416, 938637971,
785835591, 957413295, 540885002, 253675493, 409966429, 895565646, 481795074, 925849117, 768982131,
469131289, 145676187, 477576167, 245798289, 139653591, 262326191, 641410111, 310865013, 157916805,
152748689, 565777999, 182372542, 269805975, 435406572, 102572181, 337998613, 864503741, 3833527, 716533929,
360716674, 700442889, 148857089, 960308526, 77012429, 123490899, 677715333, 878005434, 660232511,
834231788, 17655652, 661990818, 690125800, 935693392, 161800326, 170487427, 899775642, 845451559,
759505951, 122945205, 461596901, 216867024, 483491117, 903400248, 609987816, 558207867, 572698701,
707304157, 926511579, 333138738, 356667394, 543141327, 158589252, 480760980, 848026428, 308674201,
455622323, 520807335, 81249359, 179590760, 326186850, 457876720, 218369072, 636739892, 584986899,
823069953, 87406533, 522714023, 614737544, 188757075, 901815459, 104733975, 874470846, 358673098,
932833593, 769606820, 178309659, 434712209, 818246545, 681738662, 830106305, 17404850, 737120184,
796172262, 123295880, 65025287, 221682321, 69890119, 693025851, 128395682, 860811135, 761842853, 137382864,
664278962, 539222158, 709294190, 920605980, 319663339, 393171466, 825787819, 351978567, 656891115,
27247291, 88409703, 633323778, 682869365, 980317364, 609483690, 324628871, 561960576, 708189559, 921016478,
646981582, 975980283, 234978955, 164030358, 505489739, 831269366, 865329679, 870567753, 24599797,
354266454, 869859986, 538421229, 26276608, 977921092, 241645648, 192488684, 84473186, 817602608, 969780154,
276784047, 237658690, 476461170, 920183542, 763106205, 322318736, 790088024, 790645831, 325014969,
712106043, 381234244, 581202511, 84670202, 164768521, 794131934, 966755647, 640295003, 297705456,
959899055, 61585166, 513001182, 118415759, 937155461, 217464300, 365766987, 116863454, 682601482, 29346466,
256600037, 849591888, 711250838, 104210519, 77748042, 862736394, 334159269, 802057115, 63016244, 919005365,
960700019, 71589590, 588938206, 165999074, 126296908, 842949186, 274023845, 478251962, 214985735,
987020043, 522249161, 54932570, 941575576, 882200575, 913243546, 25843430, 811981767, 350987114, 746543658,
532465049, 231432963, 939024656, 923823540, 845237568, 91205620, 470255149, 965243997, 296857612,
637126869, 791987073, 762886283, 993566476, 459278575, 742994679, 710423302, 417998558, 606953845,
123720239, 247373059, 727828620, 207356764, 278438569, 579660022, 701856694, 36586837, 481125809,
231557355, 937538836, 748765740, 426338778, 31694990, 47154808, 549371514, 269156825, 110756807, 44272119,
998673831, 218949606, 738911216, 789830468, 992708846, 150853435, 487802873, 105897172, 853863279,
423431587, 92637305, 355982467, 674033599, 894239772, 399073308, 843299344, 951655114, 289569351,
136502928, 658322111, 517992540, 339729698, 595487837, 399016186, 311174756, 959820350, 323622601,
75924972, 585323005, 559375608, 882638375, 505530481, 282856836, 419743958, 932753677, 54202297, 401185486,
474738605, 43873768, 434643308, 793373362, 409655753, 955990736, 664777000, 373639701, 968915425,
629470230, 453260083, 831200891, 802315625, 346625225, 660466260, 150273193, 534772413, 16021432,
135024970, 905465444, 365318076, 220952434, 663988463, 707077159, 922449298, 84771158, 335590908,
851524090, 497197054, 178295433, 128017839, 934738690, 834134476, 704792646, 734467563, 339727984,
100712094, 334777444, 6905997, 937342255, 842204065, 768996828, 13337986, 79341818, 677555985, 259254893,
447436058, 458540078, 199051458, 12290848, 536864953, 556544553, 52555928, 182848695, 512728267, 169039613,
688558130, 510218342, 737812785, 613260157, 146583853, 30166982, 310153979, 540168851, 64031999, 797624409,
686374735, 365745769, 113720993, 934569171, 418994844, 740738567, 291604595, 73957064, 156582406, 55687164,
682579792, 335604685, 824720888, 885417121, 494810216, 506638247, 271484854, 829294436, 210249375,
28970972, 597694892, 560717081, 482304848, 116616197, 350958603, 151373795, 886127147, 761316231,
782830092, 58724273, 825521734, 989341714, 109326595, 827158111, 167599603, 544827839, 395504516,
268785097, 882484290, 703524201, 861061931, 866484537, 995409222, 863703914, 453483000, 123391622,
772081343, 140569206, 822811282, 993630049, 853790383, 860163178, 58843218, 728807033, 202339282,
998897841, 814198886, 179946192, 67114279, 71078002, 651579776, 577690537, 586503926, 183471981, 877010050,
145758733, 202013928, 98461552, 676968811, 44545473, 684922276, 870719335, 860428902, 780368585, 923386494,
190303147, 143906037, 463835602, 493356560, 325842556, 474098231, 431200021, 772187451, 508651917,
814486959, 800258414, 725481049, 725988091, 45935113, 708873044, 366291400, 751400494, 679791804, 84347725,
861081807, 490985364, 217252531, 375094603, 379033877, 557715880, 22142295, 934993585, 733314892,
251874878, 936899676, 23692423, 768523881, 505766239, 455948835, 184325932, 638971748, 762912401,
882157482, 659882505, 295976136, 115046251, 870860436, 744604569, 638705600, 744880096, 351500086,
570654542, 825039233, 941203886, 818661509, 22991388, 566698575, 766201129, 303244420, 854134355,
880561041, 35355149, 646975827, 879861773, 783521110, 236291593, 176954831, 959826560, 26328118, 857705579,
492664209, 86988883, 861538229, 396008406, 711552012, 291476965, 326645456, 725361853, 306420946,
625606069, 215978833, 810664169, 782306223, 275303468, 976375019, 390930504, 670078884, 465706068,
945754669, 764124852, 47152082, 655608832, 955354222, 138326554, 752730785, 268176246, 233852126, 22509547,
430382113, 2894186, 558246731, 59566623, 840495333, 428799310, 524139880, 230115744, 591457185, 899144820,
494010527, 457982234, 187475551, 51216742, 592774283, 253978565, 656163990, 375280254, 916313347, 17771731,
116771745, 318295838, 146325422, 920046186, 387968491, 729119196, 830340241, 391112852, 637608996,
425498947, 704298825, 552569932, 381703242, 284832010, 806279605, 334143236, 435592243, 525689605,
631341839, 571829603, 897891724, 61156497, 634654056, 481859342, 423561067, 826091704, 742825846,
274566795, 481646325, 231210938, 461474234, 507517966, 612303952, 460122945, 234107058, 311402226,
457879928, 130500364, 286047352, 982483780, 668215039, 713231408, 633887067, 272368510, 528489063,
811185196, 91101061, 936852282, 640924945, 889858109, 80380127, 172429199, 182884872, 354281232, 715695814,
346581465, 841929761, 575542351, 332427819, 802483302, 568380763, 262729636, 421456447, 286650594,
88060581, 492010970, 190129660, 962247063, 276929875, 611633551, 797012942, 714957471, 685889828,
683090752, 580427153, 122230818, 963932407, 521535339, 143372194, 690146147, 132761857, 49870833,
915889730, 625740924, 478067485, 721272284, 411219902, 776723186, 721625393, 30897996, 429155089,
937777368, 209079722, 756988853, 492408763, 466239110, 37132800, 523096988, 626103957, 890744823,
817130672, 561460016, 698053293, 984435386, 887858193, 993590820, 60359690, 466926167, 604744349,
736730232, 615660096, 543466868, 128085703, 369550142, 274823686, 919485098, 394058282, 206162954,
469454640, 778489926, 535632327, 826504760, 113034902, 951238100, 189620873, 706731277, 524825492,
557433160, 480214428, 604816218, 278929836, 466933728, 156145103, 637391211, 821167226, 35700739,
248674696, 261061417, 701298068, 998407707, 367507206, 802033404, 335349660, 943599189, 446103833,
591809898, 520979731, 959738992, 520552853, 395411914, 926869609, 582657749, 921656515, 777521697,
169401951, 950497361, 286549476, 291752913, 937627155, 644284094, 549912749, 987806925, 656324123,
667242046, 35542584, 584205174, 430062165, 585913336, 97783114, 642702839, 787960579, 574308230, 436741842,
548010997, 384674587, 805209797, 132211229, 721760484, 505327465, 91636109, 639502179, 33555286, 676082516,
991562265, 293087616, 571028096, 193281950, 580218058, 129353890, 400598651, 511865441, 762040823,
437475439, 401111502, 385580105, 986301299, 466705578, 817352645, 983624846, 661002591, 733610732,
985234704, 710247146, 794605108, 231295500, 278462086, 160784206, 921785091, 326282941, 481563241,
159741492, 544226769, 383611113, 646414657, 42899336, 975178408, 23649724, 738814871, 317691694, 640843583,
124971151, 845900290, 526961124, 938499127, 49240587, 910334076, 210150152, 710219212, 301273374,
385223610, 283998802, 556487025, 413644010, 316174143, 180157512, 595478197, 689555626, 368298046,
456745164, 221523931, 898547553, 800681035, 266049322, 535949227, 950257866, 535076176, 841959239,
947424062, 36339443, 427668127, 824840646, 536362614, 250841248, 955998858, 545371014, 677493652,
446472676, 450454933, 843054064, 562535918, 976498679, 798785582, 961275879, 569874468, 906303710,
339678466, 555487779, 309236833, 599113257, 189661976, 608398008, 858369787, 727543412, 345282146,
147218540, 611005653, 112222851, 678151603, 408012085, 648611869, 769111085, 147845781, 437227890,
819090874, 655142174, 301179821, 329161566, 622629762, 514526821, 191562440, 494446995, 553634739,
465896995, 732400863, 507330665, 497536062, 245194887, 913327801, 987621795, 973074004, 290154209,
844874485, 280107365, 433005682, 920121079, 95016448, 341513127, 74277265, 409106859, 858399814, 613019827,
150333477, 683451846, 928593388, 370047317, 345285258, 592958480, 358111142, 757503785, 825472291,
794536468, 870934084, 17550549, 603965792, 249213056, 928191065, 400192890, 728483686, 48910665, 715654808,
376811903, 862726269, 515079274, 598956303, 641642565, 445898582, 618611, 710309506, 196110884, 527031985,
920899106, 640890188, 394680358, 335142241, 830811963, 826441333, 434846866, 366446273, 330915245,
468896561, 689635337, 760374064, 251615812, 620405985, 628192351, 73433897, 479562274, 917686365,
815763457, 189823219, 753254341, 124527198, 724302234, 803161435, 549227885, 384239173, 184526821,
51164942, 297438035, 139993156, 626960524, 402091576, 653576460, 206144480, 792773278, 104892409,
964795017, 744371777, 566542997, 81509303, 896782311, 102742521, 256955208, 613024511, 90671489, 30695125,
876933704, 270917307, 404840417, 189755474, 907421307, 893093403, 205425140, 91252826, 807029414,
699435315, 692705323, 663553736, 89238546, 284043762, 221627422, 15590090, 458645421, 410174858, 789763289,
170140480, 5244392, 336055697, 155999799, 964579118, 969854988, 106136110, 981362929, 458312707, 289978283,
662788468, 187361087, 301021993, 234616542, 716242469, 927206093, 751633214, 386421781, 445776890,
40028704, 835892758, 959861316, 940309800, 77601771, 283104366, 4790823, 146517711, 621789341, 414852950,
70575206, 58365562, 644878048, 412528275, 573481491, 131744090, 767904151, 93946489, 141536837, 12227326,
738640647, 807045028, 165242120, 61000357, 548126439, 495027972, 328981267, 478451934, 740641187,
294188279, 761869334, 670204504, 615391140, 797931860, 362563797, 324993673, 82363544, 518987435, 71299074,
968000571, 103780629, 825502069, 742020811, 559892519, 388145005, 820246715, 129084869, 886098081,
43239458, 295951687, 965454609, 405749244, 672799879, 76535593, 219053539, 484769371, 638662652, 186691214,
509028972, 607073663, 654386214, 952536565, 866710762, 395362758, 779581613, 462089546, 250851692,
887589723, 763006514, 771210771, 429426153, 323005822, 308222108, 683082790, 465838833, 94983212,
189026777, 352815806, 59212727, 786432520, 695848885, 310885893, 144716774, 247484875, 960832903,
196946709, 883578251, 902294092, 161848893, 439230302, 337821926, 666058316, 689507919, 324196102,
341812208, 197482835, 881547132, 590626056, 668520196, 416743446, 816751261, 323596821, 347387015,
126447183, 303422484, 724917506, 591082015, 988248117, 303310923, 89330934, 934210626, 600209490,
237468936, 48916021, 289233060, 590192712, 584612043, 617111772, 433942450, 928834009, 912079225,
675772140, 589697350, 639310397, 838030810, 457263475, 41955777, 775315534, 967492027, 471154692, 68658197,
216500853, 833980331, 458679236, 947136407, 451200169, 223757980, 986581769, 987481324, 3838306, 452696618,
85224638, 37329480, 277866373, 657490626, 276626297, 644852451, 362610143, 691409747, 179649782, 111040455,
503356166, 692342815, 856840187, 602424947, 654723810, 432158267, 312402708, 635112382, 147129195,
909847449, 645571249, 328812354, 201141839, 406829454, 840020542, 818506863, 459254452, 542191149,
277202921, 386182989, 476603505, 65016861, 393594790, 448278375, 228894643, 960383070, 934861100,
669191889, 597874967, 426732913, 992166806, 505320960, 767541452, 754763430, 976894292, 717393742,
257558890, 570006825, 541130035, 461744773, 764286049, 229934772, 862838761, 553063754, 492311301,
955424995, 448197362, 903289158, 224040889, 118282348, 778844802, 599700306, 401702962, 295474584,
662225137, 277825191, 785486576, 953810462, 255692083, 33106695, 45422244, 664100706, 581985355, 729847893,
647872654, 34915224, 842233171, 291097247, 451200228, 187670741, 558759325, 380197070, 119332398,
102518897, 218322066, 649484617, 73033285, 203373249, 174703241, 477276933, 152119169, 728454237,
838067581, 109417662, 980495480, 669878230, 344750215, 516738583, 635427882, 142123610, 360461257,
267209150, 768642917, 887281200, 752687533, 897839717, 728314603, 530112608, 172970730, 147628933,
432173583, 237096184, 117361870, 782209873, 595704955, 703018665, 505894179, 340099839, 198973752,
466622279, 84554560, 114296700, 399229815, 907368985, 893912753, 55327480, 405947385, 175620285, 646698394,
61520042, 868141682, 273874957, 167606531, 679084260, 150963809, 478482500, 340653656, 232906936,
924517643, 770151706, 151821962, 733135619, 462159098, 697773096, 765723455, 503286974, 102837086,
431609227, 368696156, 235956351, 354927753, 637509790, 644600178, 359376052, 390187512, 311033431,
619321221, 202447321, 164662916, 247472076, 777549827, 157996188, 512623438, 885989095, 808884155,
478460401, 325139268, 890168062, 249908473, 816621353, 669721126, 827996020, 174657188, 57562809,
550103206, 232759825, 318337367, 763790259, 119933592, 576692912, 88503984, 707614086, 536814594,
442579906, 517005096, 882106761, 129234803, 803019326, 299934140, 233379078, 474389486, 375459462,
30481038, 194994165, 51291408, 856191035, 848598807, 442603184, 512484688, 220290635, 152966988, 460518748,
75037450, 233173928, 539381126, 688403927, 325325561, 569088255, 886476708, 954982658, 230770865,
642861902, 868703794, 495609001, 717273535, 804934744, 234740441, 492035790, 376857337, 300178977, 1978811,
708839228, 917958328, 119430635, 109261041, 703525124, 567741895, 877543360, 283467681, 742672563,
740308260, 891168550, 115281422, 351559341, 516111324, 202946360, 155017379, 483847729, 484322314,
514173768, 742842510, 530085577, 512097160, 206185727, 697482918, 230852906, 316351155, 764792347,
509681555, 567687589, 653156687, 441675277, 303044540, 857122708, 479143556, 990133199, 428774416,
553259352, 434507808, 248708576, 711128063, 780381800, 400434804, 180337763, 799161423, 577495931,
210828504, 125526448, 257656433, 181790563, 771955084, 722710665, 975724628, 994125089, 23373079,
321238754, 610995333, 879949952, 160034482, 897038065, 473896785, 608753210, 983204135, 576027530,
122720136, 800652533, 726800089, 898807617, 620410411, 56039313, 663642260, 401571228, 294561088, 8756407,
159232161, 158732998, 841807099, 999408406, 884821512, 37170549, 532668949, 484061051, 883859192,
493748635, 961515192, 598041153, 422260903, 829320401, 497688101, 858902852, 269463615, 285625360,
277564771, 191383164, 436268420, 479132471, 994484430, 116901418, 220966950, 117622533, 354493915,
527700787, 719374566, 915259377, 603063956, 661012659, 821981452, 893399592, 740285772, 766267349,
45837177, 113137327, 630570439, 825255676, 168766359, 71572849, 762985666, 806592908, 857568991, 871500290,
424623133, 707570782, 474940038, 206132892, 265863338, 741987226, 827383997, 384759107, 30803535, 64616383,
329928550, 826752671, 596465409, 253785208, 423789070, 491587232, 941922516, 921086407, 407879404,
910054765, 37475583, 285145192, 573403032, 422664168, 292682336, 578928608, 985949414, 211358462, 16157488,
887623175, 160912681, 275553908, 59546132, 540900906, 904842514, 930779873, 801028497, 25288334, 649633994,
52839748, 273619823, 214495345, 596169646, 365082205, 473544870, 822355362, 690603374, 63047669, 110101280,
138083132, 816530447, 271790751, 431515709, 139737654, 3114371, 510150976, 69644151, 484447536, 879543778,
244886742, 22996165, 865712828, 899151573, 914258080, 354106279, 287294379, 147797492, 624728728,
614297648, 384083155, 491547393, 606544841, 862933685, 730604187, 660699575, 915428940, 49408392,
673116119, 579725976, 645500878, 527458830, 744673476, 138661720, 641598088, 617971476, 648172048,
460643028, 903251999, 803264082, 731836378, 424423127, 507718342, 501841211, 809361650, 957662259,
845153196, 579456552, 701877454, 723731202, 454331969, 612554175, 648317604, 819958401, 163150206,
242449413, 187464782, 491189931, 518642617, 901997763, 209316354, 772229841, 376462736, 388024154,
723018519, 922443028, 412720229, 399068366, 5554761, 205615118, 88782291, 324217487, 505320952, 167719969,
434963097, 785598300, 424742579, 734981549, 361255763, 565409411, 664371646, 464630560, 366266099,
158108777, 219779682, 95716009, 907359621, 763036087, 882413873, 630195154, 219727672, 346087372,
951404503, 90391241, 20994510, 609816008, 782863953, 817563819, 573162746, 476140084, 422000303, 423285306,
94519624, 545768944, 668908957, 131232561, 303759766, 421384201, 644845166, 776223613, 620496439,
351289385, 628856805, 223256938, 456046858, 92813453, 774744958, 856396878, 912956809, 685723124,
690239186, 313679062, 770129784, 735351708, 177608045, 440238838, 698447102, 891778508, 658228675,
532642259, 884322816, 948424566, 226822578, 841302353, 737892237, 210170181, 653809057, 659701785,
386818371, 10426002, 556713658, 799495784, 732433004, 742954436, 709677385, 604057557, 69005599, 728483922,
556203338, 524050708, 417256887, 80706345, 179679601, 997942750, 9051244, 150255007, 215151545, 292655705,
609221254, 601300945, 608213098, 195467660, 535640545, 21902165, 860150322, 338276586, 439364547,
137036774, 15316955, 518363541, 405287922, 775931010, 849560504, 710674733, 313057540, 844204332,
494398245, 246952916, 291421280, 15247772, 563178555, 314027840, 407807516, 491810919, 443406956,
675107736, 69488002, 764584216, 362357925, 676716241, 910618628, 605286687, 446886402, 296723617,
153093408, 714123548, 126886652, 299974673, 152621532, 621144103, 338861968, 170509156, 339306937, 2665603,
936234656, 149245638, 550237357, 592780517, 791348828, 265046071, 296102828, 515717865, 694287148,
87512124, 86616170, 944050920, 254657055, 230123192, 385576636, 276605466, 314465282, 722046809, 172264776,
558111380, 477001249, 44480247, 215006668, 839241564, 184000500, 82642000, 418406344, 712873707, 863009029,
708639178, 795494723, 727625618, 381800139, 695856880, 464628822, 772907345, 36958838, 233002044,
848444084, 630848390, 631601448, 192729352, 692497840, 688847682, 160806276, 93293866, 67154136, 808253234,
565768602, 399896135, 713998644, 254692945, 854632402, 143578199, 28640444, 29749763, 478025608, 449736021,
674308023, 506566093, 72473097, 38068263, 585327672, 603822935, 120614827, 698455924, 139726785, 971070141,
911856415, 912386179, 355697228, 903937165, 845629961, 144389684, 27567944, 4775165, 370394612, 127970983,
86730446, 437139976, 929318239, 850273243, 265628196, 939475825, 239462489, 231189357, 613139279,
530138890, 606656217, 282375275, 506766328, 790817934, 718857853, 400532442, 256212502, 308459545,
906704736, 242134722, 512448501, 995835466, 132539490, 970148754, 165734621, 828415718, 295990709,
891983047, 975327961, 852976171, 84712772, 257457567, 729736061, 927323449, 70777365, 589840085, 274452773,
690208446, 235030391, 929102635, 959932930, 842131801, 176450333, 889855655, 913571786, 248434873,
431625846, 903963362, 738308120, 712033313, 744577081, 761824481, 424870821, 508787030, 14932525,
421063980, 945501276, 539781910, 288801095, 185702297, 596688836, 287472125, 361091563, 560175155,
912314239, 874527504, 979843052, 358017604, 213800817, 60985708, 724351978, 90706616, 133891366, 206596256,
305283610, 630608298, 639162112, 204117636, 370094641, 248076916, 122637300, 493054699, 774858987,
606643580, 555094734, 237766572, 873588262, 901143361, 126227388, 725289063, 720158986, 461169985,
164859855, 989737385, 571750201, 59500301, 90190993, 210493517, 706846579, 303879328, 641501550, 512172725,
810446334, 716478060, 932210375, 372768015, 428450712, 912722666, 988793539, 860239271, 503836345,
851222162, 837553020, 717001254, 774969534, 612297759, 993946609, 711849870, 641810353, 963312941,
368733310, 782769769, 465496868, 291913077, 686149620, 163282058, 175074915, 518630169, 879395153,
975745646, 377457415, 127451806, 624971141, 71877744, 48365376, 963673451, 985246745, 519073325, 177146587,
498732158, 962757214, 582388149, 234378822, 217063174, 736647306, 976380194, 369867078, 243827383,
962238370, 479905567, 932938133, 766333290, 281066575, 774058241, 503202390, 78257268, 817355657,
890338244, 932869453, 10961398, 650428384, 277729267, 466877829, 112782267, 345366818, 600382083,
933282283, 201027057, 414974858, 895182560, 491621953, 707621450, 49633747, 965331763, 619605804, 91120474,
710801755, 997961863, 754084230, 933204246, 41491666, 107792111, 762926834, 155594167, 918044555,
479347501, 645692473, 368602666, 997501563, 306488869, 836099048, 103197450, 256936235, 975650017,
832259254, 738082863, 227439336, 242152123, 486260543, 433892633, 30059894, 663423376, 853578061,
271240766, 676755645, 894403990, 366543189, 301745894, 174499095, 996191855, 799733656, 618421621,
132373355, 949099354, 327422232, 810464627, 762446375, 589294846, 771741275, 979628465, 17602045, 2672612,
606217060, 531378324, 164089306, 193544182, 341634494, 647254404, 209096769, 765810829, 893877978,
702747048, 437042512, 784232210, 762489354, 554346448, 620602172, 600026151, 195040827, 669342980,
189179724, 124785656, 410883224, 250077407, 472558979, 217694094, 928559153, 646983477, 270785015,
160479238, 781824539, 904750342, 830429616, 487030563, 204991647, 279340796, 376852527, 670812339,
862607387, 181074446, 312287412, 68019822, 911168058, 865307819, 12105660, 522229503, 872521047, 188376976,
570725502, 318322447, 85413706, 495932719, 226722675, 717542163, 855811114, 545642982, 982624705,
312980063, 888418369, 715150279, 919592508, 346862562, 883110483, 933258711, 243342009, 37942742,
565303817, 895711840, 831397679, 576517758, 607085445, 241998871, 832020762, 779465282, 454137426,
266748939, 232208850, 480084832, 789788796, 526797338, 289559886, 445459800, 476705215, 36983361,
897397207, 346845300, 761874507, 465632441, 198293772, 43291255, 447257237, 260953389, 845966290,
313008659, 583031090, 459495920, 825073192, 785928233, 663705109, 661939256, 106737280, 45168606,
849566592, 381891175, 847301418, 77535999, 556837508, 180451267, 177041211, 395337902, 764421053,
847156924, 742042724, 545900091, 814346962, 915374463, 135994530, 292208260, 693855151, 123796350,
333869743, 144193121, 276894272, 952539281, 337800690, 985803299, 74094423, 753342853, 760860544, 97807465,
733531106, 160322662, 793348926, 554650900, 783758854, 665997978, 627371309, 37331762, 114233529,
851361960, 887978570, 587891678, 594220455, 724562752, 179684847, 426275574, 648258230, 558006802,
291243969, 850127784, 332913403, 510333253, 13445316, 127309220, 677404481, 957769176, 893130225,
150036039, 16257900, 206805721, 19502601, 539597644, 246831172, 990463234, 593670661, 596684437, 243928524,
489550588, 775197864, 746248204, 72593972, 730242612, 397590640, 487077915, 790410644, 990506626,
853638424, 511553591, 310077507, 168299983, 279084665, 950350846, 529361740, 172198896, 383896708,
489492162, 284788498, 853151035, 664373735, 800435164, 566982339, 519586114, 935682806, 405452432,
140661857, 81656113, 949141681, 136993500, 217225201, 108083220, 291588475, 654827324, 918488665,
736457324, 125606875, 658242165, 89750276, 72165174, 724606040, 249551211, 766114739, 465318065, 826106193,
143438223, 801370644, 490939494, 490175718, 822142992, 710201596, 34453318, 141294933, 232776502,
407914315, 220487865, 182525575, 460707080, 887999130, 925927895, 338891699, 468756963, 211900413,
892013194, 907536724, 616344436, 496459113, 804802911, 726357513, 825524097, 633969519, 482537273,
805549676, 27460449, 880099250, 439589256, 125239211, 518161955, 407644148, 961135769, 584177547,
462609038, 165802106, 439917924, 576467606, 883540936, 761885529, 672318843, 30072372, 957348716,
614466522, 310009155, 891792344, 633456020, 299292488, 925299713, 470068633, 392056883, 160633640,
721906768, 589108275, 728883886, 145041774, 746767908, 871822410, 220496741, 396292232, 356184403,
567217828, 919468640, 576962324, 989451667, 283011015, 561057573, 205973874, 707723980, 790349425,
177641347, 717628729, 970977480, 36176142, 409587590, 223271969, 710675326, 788096383, 368510706,
671708562, 440185377, 639672014, 854268069, 267121839, 93922710, 24900854, 778331441, 250487568, 787557606,
67055677, 207117402, 226210328, 328071279, 68792027, 6583842, 131190675, 295754634, 870393443, 170126846,
165766259, 754575833, 163756666, 74754221, 909062831, 253942215, 246407230, 359362265, 548895848,
395961058, 268900440, 187338729, 744053153, 933313103, 453790, 144730495, 434380561, 197433788, 244613187,
417776644, 71014949, 495361062, 157088317, 810768052, 937757663, 195069978, 59837781, 118537040, 908258805,
27058691, 80323749, 741361665, 578168005, 990063659, 259377073, 401995258, 47656103, 224263624, 83344026,
722630342, 532800346, 799626331, 255494989, 532321522, 641563865, 989002412, 347944485, 705978163,
397421778, 801009475, 83881309, 285605599, 563097918, 189409086, 948429685, 590743499, 855919991,
102708326, 921909354, 436386346, 327527467, 321581215, 620323178, 133186868, 5912047, 929739419, 533718260,
752405861, 386687811, 338134318, 819196654, 190537631, 845567852, 793193497, 978928270, 293508338,
12814659, 148695692, 630684536, 529027395, 392297641, 584159152, 282960058, 665892467, 489112964,
364822148, 101304554, 803116031, 297574755, 674782707, 146210148, 739893658, 913329605, 949911916,
375853181, 304409215, 696818406, 585140114, 649043105, 470712331, 17027691, 678446327, 487146207,
504888895, 462404645, 904373766, 740193087, 747972040, 188769483, 834281492, 923748728, 700569120,
583129918, 429864974, 845730758, 309300767, 762111217, 340537651, 543547845, 807696913, 198096880,
40807286, 139118738, 619818214, 876917932, 876614076, 525325396, 197925220, 135066201, 769152623,
464299349, 567924194, 439357177, 69283826, 547681324, 420169417, 639396335, 16594635, 482492742, 479390946,
482944439, 719239282, 59323910, 246715434, 668485873, 914485005, 404332605, 744916638, 738415532,
250872082, 313759673, 829531039, 273774401, 298025226, 340485089, 420372689, 288797912, 538105942,
482521136, 975088521, 987963870, 158116931, 872951100, 963057265, 453098802, 878228440, 489867946,
547342264, 468750112, 20397268, 578755968, 536406508, 960870466, 955360087, 918177303, 894028840,
489812210, 105678321, 667881989, 994168787, 395163297, 469423418, 547963224, 194720812, 636810541,
457699090, 7454046, 826554075, 512834769, 263541617, 544439643, 958439024, 170386730, 301886133, 740977417,
544602973, 466867874, 979535987, 606134122, 488878960, 846554, 208468318, 328658749, 614167310, 783623546,
188212746, 674783727, 327946262, 114319747, 926068509, 588611274, 109759640, 400901859, 272188870,
296656942, 819699963, 661673316, 88872795, 20283740, 841136813, 756969710, 868424733, 187265312, 766585111,
595336185, 281659071, 73981366, 177776981, 632124812, 336493503, 128078880, 918908377, 608143103,
814381495, 768041292, 508432689, 644141675, 222203099, 247644616, 726170924, 647034047, 161229638,
590142250, 917896317, 227275603, 906736235, 977933368, 577243790, 738373243, 645850883, 488574059,
444903396, 883123089, 14153929, 975576733, 190462433, 416242187, 722850608, 547402801, 45533474, 887124444,
310542981, 147660755, 314163691, 889156161, 923178273, 21955324, 551488887, 347669212, 846576853,
694147851, 860651476, 292047167, 344793665, 280148997, 929070095, 157044395, 286587300, 571757404,
766609075, 322528898, 826144872, 674010771, 208612689, 274683462, 948052708, 260423601, 313638364,
211936175, 584328309, 806070544, 839072280, 183674724, 166332228, 808329360, 371537198, 343019638,
582161032, 910756785, 266199764, 401247224, 404488442, 68252406, 904974892, 503224507, 400430823,
942942169, 598302241, 592504198, 962393036, 618900453, 92211299, 350365723, 7604235, 731917913, 34525333,
475591973, 232102887, 129955402, 917890212, 886695235, 245405408, 795005332, 566746973, 281599351,
183445201, 493007451, 305760466, 35714557, 38841510, 810888070, 849539134, 166945249, 521786379, 949046071,
190731817, 344614847, 2861695, 712038547, 585197138, 106770995, 598986991, 860967123, 19251645, 564207939,
734824392, 84265860, 697227366, 141334507, 804933498, 631223605, 465945699, 924909187, 243178722, 26464664,
388602050, 694898926, 80933984, 498390487, 690030024, 769124080, 942197193, 729833709, 534378010, 30211464,
965421724, 360583168, 320254849, 803296718, 290129507, 110143343, 427472795, 589825138, 11039972,
996990856, 737969232, 868751638, 522105723, 862981404, 534988943, 623056086, 562108392, 788034099,
42687959, 54249633, 985396347, 652998161, 114280670, 441128789, 82475817, 224112486, 610626749, 474129439,
682929928, 438171669, 626198072, 491362796, 43091244, 452773033, 824513340, 608925525, 67938673, 466689412,
552266153, 940940171, 111460676, 473072171, 620387996, 214056997, 734440323, 336746907, 130066802,
12803550, 413458227, 279906131, 260105049, 148075678, 337069800, 667885554, 834389230, 677148073, 1665531,
217591868, 359132118, 522392818, 483406344, 291210269, 484544806, 768277542, 199585220, 414722578,
187341836, 836050999, 923643076, 436635182, 840178125, 60378028, 110738817, 666014112, 482341543,
778406422, 871324815, 72632438, 28678679, 315815998, 152370875, 297151109, 506725554, 356768559, 140999192,
700216146, 512357297, 400016710, 134316910, 809122053, 861013392, 745150179, 342324642, 300627548,
363064443, 955253993, 178236786, 90381384, 360962067, 959885703, 222093270, 901513901, 862579294,
583114983, 628710465, 883967803, 580245012, 797263620, 918793148, 353911272, 882620042, 447246019,
809312452, 205711280, 943695008, 950722005, 1259870, 534455360, 423771350, 980538701, 935444221, 607165091,
688922100, 832794201, 213290133, 854080260, 610088977, 260960443, 918825630, 753580738, 301182608,
725723844, 724359151, 855548679, 859406927, 219365201, 915501414, 417986069, 569615306, 375847633,
236377460, 527258657, 179197940, 384215756, 5853563, 77040143, 625351929, 725783277, 745380085, 51194098,
909161170, 998086312, 696392179, 17425188, 585487936, 452781314, 671115720, 49269137, 435341375, 581700427,
674739474, 335952105, 618213286, 877441728, 69903024, 246602798, 152806019, 98228393, 80395527, 721874440,
624052121, 202986838, 215951903, 884534805, 382555276, 157443657, 915646463, 820961459, 27352016,
663467079, 454316020, 858431, 502434863, 426755526, 659871944, 946237328, 184309140, 716097719, 932477478,
867935657, 841360324, 978886301, 204237009, 554742774, 700574918, 785064063, 990048366, 860432998,
384779632, 146794388, 396634069, 198986970, 840682298, 778712810, 634444670, 568796319, 418149145, 597882,
571785406, 270477916, 385124551, 137263206, 121840547, 122193471, 215466226, 336620304, 65268808, 83976638,
189752788, 248799719, 602184062, 68572104, 271978543, 154935381, 179824120, 612343003, 422646094,
150973922, 148141628, 463578907, 816155296, 595349978, 279620752, 918273868, 856798693, 163949917,
790910950, 748623325, 45215137, 168552500, 101991052, 245880044, 324242955, 492534092, 450390373, 88979746,
458685463, 327617431, 896249131, 362118458, 207936830, 199262211, 103499066, 223193758, 376661541,
516432436, 493702197, 344501799, 258660508, 382973875, 571617107, 579796161, 190541168, 93212509,
147767668, 951727351, 667826589, 7015554, 507246711, 333324462, 412390301, 756965792, 662353047, 128466495,
883610461, 653967660, 718420769, 585891689, 440997404, 671801736, 993948009, 288868968, 995400257,
328766971, 328578583, 38042376, 764404904, 778855650, 652674817, 24751782, 541906140, 799785873, 38199614,
175833675, 103714512, 192730060, 83842185, 294831892, 709851070, 620913797, 770300798, 632295732,
828721956, 716377123, 827281040, 637857648, 56513063, 841734688, 281128111, 377938899, 659253610,
404550322, 198593860, 516030601, 238705429, 324594547, 617557138, 580441438, 903885785, 326941053,
816313743, 875033487, 791805425, 371571254, 308140804, 746694867, 241769735, 780344334, 962630905,
603876271, 815043212, 598797726, 427348140, 38011715, 757393246, 570430246, 431304407, 532477556,
581265219, 241498367, 984451404, 594049015, 684847253, 165991349, 837454739, 462480729, 674162044,
15493543, 149954655, 745101719, 520607604, 77711681, 672836535, 74288772, 514942213, 148058063, 253259793,
243778000, 926683606, 15052560, 974576719, 874446239, 430025590, 636016807, 462625111, 363345994,
318195733, 652566654, 795327926, 148268596, 804456008, 830607492, 364308394, 364874662, 727181374,
454454443, 334981595, 982371412, 505968453, 787841098, 207631459, 918604743, 89920004, 800306701,
944563308, 100215805, 790739399, 484171334, 704322758, 12943588, 788183926, 911279514, 200555128,
634038996, 716768818, 796166031, 286518943, 468801354, 903723660, 671229630, 501702637, 332019168,
394048115, 313604643, 592365489, 555069328, 274046492, 17478193, 902201097, 895602012, 677037781,
756295684, 780866098, 609775953, 892582298, 909733505, 298042185, 487684428, 883826231, 149981718,
988608646, 79586299, 756076787, 831288634, 447620559, 863406255, 29922425, 123728616, 472318499, 45211127,
10326524, 579432071, 406489645, 485305310, 278747918, 265378210, 179916163, 740308504, 363785214,
419587961, 341604891, 290340348, 253876640, 591239653, 102191969, 852345576, 743837845, 546716615,
443536007, 192698270, 974625387, 618429851, 308855954, 913778406, 635645477, 99486029, 452696776,
820867138, 446136638, 954453959, 749258573, 550560960, 921433965, 606759766, 732401902, 605633801,
449295343, 266178975, 151965257, 224259201, 772448717, 830369673, 386830006, 486715410, 89169774,
192658418, 955046439, 135260650, 710508022, 626419980, 124168510, 845354254, 715718342, 379615743,
168271475, 662900539, 252927565, 644060947, 805801599, 220215885, 409350095, 281592721, 811850873,
722357441, 393843054, 90360098, 300081901, 799490180, 233545806, 196683074, 861869395, 641425396,
789536892, 104264807, 828065123, 974551458, 976899428, 324484284, 308604186, 404993772, 729040339,
965736349, 832786349, 275916418, 343492531, 695802410, 764440603, 17295588, 766113215, 530508618,
998954333, 816298516, 88677607, 427403825, 296063791, 818739432, 845332338, 628275812, 560800782,
938067723, 807198790, 913899431, 797812711, 311396640, 799899861, 37163754, 30980011, 207741805, 4559591,
99933859, 458958110, 940698204, 49735816, 989428997, 785610543, 689251263, 499859384, 897938193, 886120774,
685591316, 76040185, 41961394, 523299849, 470253347, 596297904, 107761112, 634457247, 588209371, 847363674,
185397269, 497657835, 985617576, 440563817, 674609210, 74708593, 476853145, 253389982, 124982759, 37558675,
282974296, 540498055, 811557521, 824168578, 621182537, 94490982, 706807865, 228060460, 69769518, 925998748,
541349130, 477915972, 528728330, 691204280, 338846870, 710016255, 118334263, 969454180, 64821398,
384949819, 848423778, 762751992, 286489011, 831997685, 911705696, 933596124, 740477255, 49927373,
467765948, 878813125, 74829169, 335265432, 395280869, 12734095, 243338493, 25818059, 973531833, 522675589,
926788574, 979295691, 519936540, 444515444, 363448294, 165834595, 138320247, 391448765, 249141413,
83180281, 548021115, 731522079, 614786041, 231988506, 807251998, 398920063, 160052993, 371255714,
255299431, 67135696, 405762751, 845665609, 239995911, 541439738, 863714859, 179471985, 35129647, 28893705,
127962109, 290835966, 621205291, 5619899, 478241994, 812854209, 100468762, 119043182, 486940600, 164295581,
790666994, 819421169, 333321086, 290374545, 627632444, 283640880, 62424039, 467182150, 676622655,
968970236, 286058627, 852988470, 312043970, 458891109, 745410734, 451755966, 980948523, 397477374,
304513078, 338364136, 634249058, 120770611, 147275297, 26132739, 311474659, 206915338, 919866500,
171684720, 296192619, 251404746, 279117238, 215885709, 831069827, 813074105, 7959130, 730548520, 734047574,
796263683, 799588984, 448034868, 934242652, 743325594, 236107717, 578962897, 765438483, 596892394,
386854991, 658930192, 316819127, 311336163, 822475427, 77259802, 57050680, 816848849, 541441890, 171218820,
628902170, 797318537, 573410446, 891876475, 772813936, 370228964, 306644496, 57092295, 15758927, 190324846,
255724703, 256587495, 301238463, 252382639, 171309548, 5392426, 226717520, 450408309, 759866803, 485984592,
671946189, 307314966, 833809173, 934959394, 329555554, 244792020, 879043702, 610255161, 492479757,
85598304, 865661561, 541417132, 234831641, 844108606, 8922859, 555826809, 661745234, 433959217, 655739065,
321977728, 981802056, 824662197, 797269966, 69873626, 62021165, 91021743, 974505798, 656868237, 866903668,
126030106, 237645881, 80697218, 954394666, 987035388, 59518301, 500818030, 291502877, 14978950, 831074241,
295947533, 249802563, 224589210, 176448039, 87201564, 225758912, 217809933, 604941873, 346748567,
682359779, 748861508, 873189314, 952089431, 743778666, 88541921, 900081514, 812967605, 506425310,
560331692, 371532946, 103830938, 583433404, 290923083, 759517877, 504243224, 457857527, 892344761,
111931406, 874788493, 362093058, 102869455, 886529353, 633953277, 663842084, 388272172, 339924658,
135307623, 524289820, 165648718, 157522664, 980676782, 325700372, 285097336, 990028510, 942822574,
377798436, 944518387, 852763589, 527763430, 510954621, 858923951, 907098779, 598696935, 821499492,
882499662, 241378465, 132121686, 438847970, 35586811, 501950898, 820991462, 315005369, 320587474,
664595153, 16362208, 751291986, 661635723, 837381477, 352315976, 136024001, 674166362, 353394552,
905657205, 503511117, 377308757, 830407522, 51005662, 812305792, 963874735, 770295305, 265632727,
905570474, 513667832, 661849522, 59303511, 866192817, 443909203, 722528737, 49195513, 716334425, 94366476,
556726484, 214816213, 983609225, 161813937, 817830893, 841592181, 171426176, 389863415, 902068108,
398013086, 442745953, 778284267, 302243098, 528870459, 138074897, 624388356, 567253225, 304523364,
510592680, 741667830, 516224594, 535584622, 871087421, 3531439, 206045134, 361749952, 698460656, 445074975,
329971183, 102520069, 860271069, 603019299, 666162326, 194235386, 41277700, 488298171, 248602983, 11235880,
892168373, 221940423, 899699117, 884789214, 608189885, 577889814, 378498721, 688836350, 79684188,
117196656, 719993135, 268704724, 278764473, 649695652, 909446979, 511093200, 780762158, 545800322,
634263574, 640133871, 206653817, 763289288, 448037788, 789579016, 326873598, 40008732, 220718520,
889093292]



queries = [930071620, 458971912, 632346717, 742279513, 66472549, 427629917, 190750589, 882492972, 237917166,
316744319, 938187913, 866896177, 30079716, 532463577, 460209772, 217611020, 619890318, 885467129,
279147989, 512165279, 233613115, 738110801, 540488097, 291247637, 874517997, 662723272, 359367948,
334943077, 284002258, 917833256, 872112497, 501506366, 899155906, 248682332, 137061812, 325515021,
386304028, 806776029, 777687561, 866895671, 745002437, 861061266, 67194546, 831086732, 663752713,
831070654, 259242195, 454268429, 795125815, 722563748, 717443788, 923938264, 179648450, 216242312,
631018885, 789824758, 489040881, 668501525, 661947091, 104897631, 570990802, 160883307, 666170102,
923839441, 707615897, 401493884, 761874400, 422954115, 767410803, 448319173, 641399910, 594366520,
91095260, 395457861, 663554690, 595485184, 440235022, 734993599, 100360430, 760239882, 946625341,
965342033, 540019842, 998645440, 723579135, 402392747, 820416555, 405156608, 430078134, 995462372,
573443272, 936256776, 795539264, 817353550, 571036161, 81607385, 491686678, 513450614, 432858781,
237179360, 477914211, 694420700, 622023966, 930181535, 819469257, 232858217, 545660716, 628723370,
877590792, 295677252, 259319715, 940622271, 428792357, 235038845, 107331583, 431618949, 654835211,
453365486, 647004058, 253315522, 570817194, 865706635, 136824794, 207804951, 656900860, 596766593,
726120898, 45866622, 327425343, 566713311, 198460743, 508387623, 732405316, 100990001, 166984970,
423760006, 655629032, 431564013, 729452484, 500931361, 221671579, 434418271, 296803842, 312185647,
371633267, 561733861, 314113745, 679075153, 332351678, 220930267, 284807978, 234856243, 319525354,
824085852, 753635140, 962851544, 820963615, 368300231, 296727387, 327142745, 778384573, 396264267,
612251904, 153894254, 152380786, 772878734, 782213045, 74237919, 176423923, 754025401, 295953557,
406191775, 883251061, 735986226, 893217436, 152275359, 343170649, 874522749, 944469871, 990609237,
871274563, 12122452, 179719221, 187686118, 665425911, 491209771, 497669202, 734688548, 980740815,
543672264, 254665438, 773137764, 369926079, 553711778, 451346899, 663123444, 146689409, 814364253,
37201820, 579745181, 581427352, 552537921, 225854409, 310865564, 812128052, 30066888, 69370829,
505920018, 573224386, 599125360, 729471443, 67260871, 682023517, 437605195, 256674611, 124978953,
104959611, 945410526, 966186794, 100285904, 286558597, 316268342, 514851017, 692877342, 705864269,
328975613, 772658094, 590428, 521890588, 490971143, 426888594, 850162501, 194738509, 506939462, 30004293,
600643354, 878747385, 497548689, 963920129, 656471679, 193584248, 204362728, 241470501, 102423283,
457754138, 766714806, 868705332, 189099045, 934918705, 987765295, 248693080, 397441222, 281598632,
932190865, 334967899, 606734026, 337980381, 209381917, 921053819, 469350330, 457879354, 535834002,
670530336, 184494566, 137938976, 582646610, 268972513, 179289570, 270185590, 358942580, 776266851,
608922022, 384779307, 955913525, 576907873, 78365936, 248677848, 156045676, 217239960, 280925316,
887979138, 963246406, 433941363, 743891644, 935470701, 501034856, 963294497, 102744675, 538511448,
966207180, 722527808, 51154829, 903138988, 339729345, 953744230, 997542051, 218028736, 935402998,
28915826, 981392702, 291597264, 624049194, 981141086, 239735142, 102561770, 810464299, 636055104,
651058425, 396640742, 8652242, 161731514, 991752740, 18000434, 694416275, 518930853, 905551609,
696781826, 778402274, 847308799, 817670568, 967275448, 625998591, 985382216, 807403459, 508025162,
846009395, 696260241, 218900118, 295949764, 744001300, 816294903, 618101739, 710535555, 522294495,
421913922, 473661301, 470543453, 820716838, 883219920, 329026175, 130438977, 580728477, 851879426,
12110501, 366272169, 891826118, 335065884, 706841745, 544330076, 978786661, 919491448, 656873879,
284233133, 872795685, 805214559, 479774864, 49199038, 906725152, 954431567, 54430651, 396314588,
508403244, 596982010, 78255163, 229005091, 153984878, 914051824, 341449393, 945846640, 38064283,
450974439, 797489923, 156162393, 872317574, 110787251, 968950353, 4789102, 640131857, 308219744,
608210905, 854249154, 5369883, 277043096, 155305271, 445162945, 869688365, 679742424, 32574986,
766393890, 125649959, 963053812, 572519957, 722426589, 534773836, 739912288, 377244656, 913901169,
611844914, 861888383, 777861430, 560353309, 965248044, 4087307, 148951889, 717590510, 113382704,
766265311, 505469878, 510976295, 17423828, 481811540, 505320959, 889105263, 672056838, 851893610,
175829063, 227404663, 969029230, 113594169, 645439092, 397584088, 959817803, 912584272, 444472819,
959822221, 609968834, 853793846, 395056675, 546051707, 685988433, 663853831, 930179866, 360510995,
150315822, 289020200, 603630862, 589797410, 251089873, 189605150, 376741924, 670277527, 695952233,
526981709, 339737919, 361301403, 22993442, 883062052, 767738381, 555498088, 543509343, 725340928,
876842541, 698450338, 360426185, 989212675, 253070531, 9018708, 199749784, 218396969, 866967843,
492482392, 191465202, 30174454, 646594177, 313649815, 900909065, 359092594, 810455396, 690154049,
385711656, 704806912, 218781241, 904280903, 404579089, 540472754, 811533124, 932889184, 658237350,
150308547, 921524487, 12183452, 740712336, 594439735, 899014798, 698951430, 995409652, 895597850,
867024455, 190321292, 283006993, 288798745, 86678483, 547991623, 28671612, 935771184, 736093409,
534888784, 74827148, 162889519, 474006523, 210178932, 248605422, 795312933, 714443764, 611034072,
715686282, 309264209, 841958829, 712411293, 16983792, 452696750, 951617413, 753646972, 828000940,
22898579, 655702363, 250083699, 430488880, 731408980, 658954855, 676549915, 148752552, 537682278,
608751592, 555941366, 429917230, 57695505, 471005757, 403069135, 38002701, 817686368, 728544122,
937510990, 444419244, 476365340, 359126540, 268717850, 399548103, 397511412, 825542390, 194592028,
677637215, 698454933, 488367808, 644582422, 124832856, 349117166, 114287256, 990629330, 538422461,
104517824, 242568194, 184270873, 455344095, 725993446, 744064016, 337841642, 553362073, 286049572,
884095494, 257103285, 792416684, 606840291, 980317128, 633842250, 298015723, 546063896, 103173256,
616797647, 574882965, 604503988, 80345701, 789945952, 401461258, 231168770, 677885025, 743790887,
940408131, 546765022, 935506808, 774636860, 78365927, 731280042, 823801251, 782260166, 807578382,
965402029, 959905116, 336067197, 882084503, 571026705, 488399162, 710202518, 545056221, 210317044,
275280161, 656492225, 588202493, 296753906, 860429449, 823318805, 664617053, 131713378, 50903439,
37852388, 180445900, 535635032, 639368954, 298035680, 567245294, 571802967, 940489501, 738325351,
816710725, 532750227, 733573586, 457356457, 501747241, 249532720, 178513638, 523146454, 45747368,
194936189, 848178366, 472475027, 548115101, 165571464, 159781838, 345590387, 240929122, 158130929,
471165405, 341565997, 936291453, 370194040, 777731604, 920888662, 71857524, 544095734, 604810696,
158636696, 375345379, 773088436, 831060963, 802455118, 487616095, 740606096, 118304638, 848385695,
603824035, 319598657, 608888281, 356473524, 634252692, 469156848, 326242491, 918830642, 903919406,
152968624, 797298190, 485544243, 880121536, 313454724, 743323227, 646979749, 404174430, 921637564,
196039000, 722484520, 176929419, 463355389, 687929193, 553531799, 829551762, 613677956, 821618143,
899159182, 767917552, 27388378, 596893632, 293496446, 652609013, 126119324, 122444654, 279114915,
39518715, 827610565, 79580773, 184399256, 699987538, 667223935, 865776372, 742359524, 700257213,
774049021, 662497678, 269545609, 325081412, 852434217, 541114105, 717396962, 505323927, 93330842,
463862504, 760370317, 88693082, 18380401, 641157739, 944077139, 381717397, 361035648, 635772675,
375068228, 985240103, 910595852, 114808030, 820119926, 670468839, 974488913, 523886173, 625729014,
697507860, 159115372, 247645223, 792027139, 852940562, 2536150, 604063436, 761828069, 499163035,
74812538, 889156110, 285042239, 556188627, 479903928, 987593561, 217161890, 157975174, 563170835,
637518250, 733482607, 296268927, 40576710, 508714678, 709771015, 579770745, 895754593, 86553691,
71572854, 565061169, 459308242, 346991167, 497645717, 925803738, 887225222, 725916655, 817630991,
599118744, 258623382, 975593371, 207410708, 805905039, 673418764, 598587657, 476512435, 275272282,
710472436, 603782092, 948026908, 252402637, 458436947, 969273236, 753726934, 8061287, 818100471,
744591810, 339817661, 377587738, 350855818, 424647100, 400520683, 695924766, 112679117, 210421528,
962220781, 891338802, 74136736, 69467726, 308919737, 279459948, 906726303, 161214426, 541778819,
462178960, 422659341, 400440483, 885473707, 917216579, 535632714, 317655627, 292116944, 609603237,
596568493, 918184696, 485976395, 944058662, 733532039, 894636650, 279483285, 51197640, 80323688,
407917912, 874474860, 470346617, 785174502, 882116630, 138839251, 278006532, 271510535, 520249569,
832020260, 968536253, 569702504, 515923003, 650366841, 210238355, 201122547, 513341847, 226142129,
608803245, 123720742, 810452823, 979613173, 831664601, 649483174, 378562857, 437062208, 225668367,
544549250, 317937282, 257455024, 459510945, 286645861, 907362697, 778904216, 253291198, 718591762,
453224806, 203714731, 160357222, 787787139, 491219827, 274024123, 279047098, 334992002, 571027088,
305009074, 226721418, 226713844, 609076836, 926787132, 233428070, 591080976, 827412182, 775408614,
787434252, 150092684, 633964312, 55170102, 102739434, 664372833, 107481111, 465455220, 985828263,
59640528, 825013825, 208656935, 266229867, 238694970, 353870917, 536378268, 680509175, 143656084,
772659282, 393827427, 128611798, 653199687, 905541354, 223594163, 616899, 474173976, 283478660,
259220505, 755201305, 439938168, 316826219, 707630390, 851322614, 742597356, 649650270, 85474471,
511560031, 508318436, 4854454, 883125943, 83841594, 640275418, 631319931, 400054259, 710526198,
876928227, 633983082, 467753633, 217672268, 701730926, 754458867, 92651078, 366293381, 865294995,
165346746, 573263209, 615599295, 507260102, 346687500, 388040531, 805287035, 84315492, 425218953,
259242038, 476319214, 201040479, 374328978, 180282519, 385294831, 591401509, 117472571, 80734862,
750588955, 211354989, 933942188, 630774310, 659907761, 218158166, 649605728, 434491710, 754652501,
47934200, 724302555, 620362232, 215882934, 75215638, 117330070, 734043141, 847093616, 257072331,
508753424, 344880539, 540982374, 971964248, 179193814, 918507951, 543498364, 982662276, 220457037,
517143881, 886657638, 83244456, 133821938, 6578950, 506551479, 980226115, 709890105, 398610111,
751393899, 492408965, 958442686, 41969101, 729097090, 756897875, 217677922, 716244901, 357947860,
187242278, 947073357, 53870612, 913273400, 320284929, 76079742, 299222283, 37331301, 634254865,
119038187, 934245050, 279702637, 280645, 842606681, 965334895, 383872502, 538612498, 161265976,
606445305, 571797341, 744878503, 894338995, 925561542, 1049638, 201138582, 852387529, 621220491,
106700075, 679508343, 804775926, 677437930, 569600584, 578292611, 618031161, 845103330, 326896143,
423825251, 936107712, 267091260, 487076656, 728867110, 393804506, 855561488, 704726187, 202349058,
24361548, 561461712, 879496021, 184327642, 428471919, 695853846, 460785754, 393915146, 897839978,
615159635, 959866842, 695926446, 399633521, 226720722, 582653469, 428784926, 520677672, 327956043,
850076123, 634055175, 824673244, 258703388, 870112116, 163072258, 805534755, 11162995, 633315070,
77626219, 456869320, 476365435, 920018099, 564149302, 511443342, 720755354, 760863075, 315716010,
603839164, 591628207, 648867023, 109055984, 179961389, 191266863, 666328513, 657005922, 365711103,
156028944, 644531540, 390357089, 762465522, 163655284, 365390668, 385926226, 230705147, 574883279,
719480490, 852760287, 561540619, 308128468, 300902540, 125534509, 597515423, 882274361, 611632863,
665489783, 334640445, 511868824, 655448574, 88382474, 540488098, 851627805, 976525457, 761171955,
536735714, 530113445, 973908858, 830169512, 106085492, 821499223, 391856613, 235173114, 879535279,
821766553, 772331769, 32107618, 147861336, 636962180, 290668952, 222609953, 426347970, 701874850,
439860052, 770140818, 158133057, 661882734, 569957830, 805239308, 301182120, 138659904, 94464572,
397398398, 584168887, 981514841, 897861214, 492330585, 94975543, 490017705, 286062010, 501255345,
649681191, 614742686, 703524383, 101684489, 918288455, 308659084, 677786453, 952355196, 641579160,
476156654, 147670032, 102612226, 691949032, 613148602, 239233890, 364107746, 30976563, 913900921,
43265689, 508398573, 724576661, 310144844, 899158520, 532333177, 101034136, 110034675, 296400499,
108906570, 434281196, 948501904, 898515254, 639817457, 649083472, 256698189, 391290099, 957216816,
211995965, 707549257, 17422399, 921085110, 487294677, 49492139, 934157082, 216370951, 279073499,
258638960, 781582222, 845312980, 584188836, 389914138, 680301428, 797864922, 20242011, 125606310,
589842398, 226261983, 810420095, 804449610, 767077788, 462071896, 158112848, 571761492, 975163018,
221046636, 794564653, 118522081, 330139185, 487689590, 913327894, 466582187, 714173893, 918885945,
49868874, 614177792, 806305781, 773114483, 887608627, 233075751, 672473262, 292663825, 814689759,
10469855, 573410022, 816910668, 866535953, 786978509, 339728476, 489544795, 95007087, 699952005,
361288152, 399258960, 135066032, 60010687, 429989321, 49269218, 578201447, 892288501, 130396928,
167953285, 90389878, 854619856, 760838696, 840213273, 788100765, 670812017, 242523102, 117249799,
459358279, 979865449, 163692851, 14419239, 962006658, 636985758, 313792015, 569986567, 680193795,
165756965, 570555947, 960660526, 128450102, 295762024, 335131568, 869149794, 38409822, 639546244,
975236631, 488531232, 4406279, 615286291, 170508428, 249190335, 367754334, 797753696, 409536384,
918844499, 586939878, 771587889, 470703774, 845701592, 475772435, 865325732, 919713457, 365673886,
208842149, 689389524, 700168781, 959859027, 19012832, 940057018, 697337155, 745629626, 581981269,
132668449, 202949338, 84345701, 645964202, 230863021, 106360522, 139652050, 419715270, 882489816,
676880649, 381575519, 174573082, 886003267, 111838178, 433907705, 797796415, 810533016, 517964758,
431540790, 385996534, 104702878, 651579748, 272311912, 158743561, 377798742, 680609358, 430141719,
272432374, 538240146, 622232733, 998573187, 976375882, 50379412, 652598423, 822883847, 644531067,
645986334, 229637757, 828020935, 962184464, 318461315, 770173393, 954376938, 408474100, 939373301,
940246211, 74118254, 722615967, 475063176, 291563562, 310087265, 594785704, 276795005, 808959555,
976547158, 629175666, 269541397, 127350343, 658234358, 94486937, 325713600, 694423155, 726166730,
955954231, 800017215, 453183203, 612900339, 257434187, 158246777, 801981745, 739673182, 253912251,
176998743, 825067634, 385578171, 788075210, 310424238, 34439331, 185643772, 249103466, 39913174,
476491972, 446875, 903252219, 206986786, 677739088, 525912849, 308671727, 233096375, 711728742, 27944037,
756164067, 847473092, 500786535, 975096263, 816537529, 141288211, 400904128, 968995727, 456028580,
198978372, 265864255, 710665137, 430031893, 970206071, 623176848, 90816523, 129921330, 826115325,
558716780, 819217641, 986802214, 974583566, 810529267, 727546388, 578961557, 377451475, 766341007,
774749672, 39921972, 190470590, 723699137, 501705259, 741668127, 93193668, 45665909, 580776276,
807157977, 720190891, 306482397, 770322436, 911141960, 627955098, 932688534, 911261579, 106738986,
153954439, 527880503, 51206996, 717100520, 419383485, 639037769, 256513870, 342991156, 468754515,
834390521, 136028207, 710648463, 631517613, 649805579, 916038422, 626425879, 322575016, 131225098,
513274985, 36150956, 761926971, 978110921, 878492863, 164044822, 685890048, 716910813, 34385277,
338849675, 281324858, 553395689, 406576246, 427135789, 588884125, 161862736, 782732832, 634451592,
682916301, 420803439, 773716350, 414432608, 926041601, 38052224, 557801399, 236344461, 907605960,
460823597, 715027224, 54479017, 279105624, 69343537, 871491251, 846039347, 209066828, 585329711,
740016103, 146096784, 601252911, 739698495, 29887668, 920339968, 795814331, 177592268, 244905795,
707661570, 523762043, 282991026, 705972993, 711756189, 774211955, 278463405, 462359385, 878001373,
35136799, 197855913, 431463172, 596732695, 628725564, 690128905, 14909954, 710663113, 311766651,
915508451, 652927314, 611632515, 822149745, 144087711, 597559322, 895929586, 458075980, 288250962,
395354674, 177068137, 630989491, 455862835, 589287713, 842553729, 965433816, 742053290, 168358014,
573398359, 886619417, 857699869, 375454905, 115018534, 605204320, 214884896, 630564812, 434323952,
210828538, 254980773, 173014433, 620320151, 998893382, 366588216, 768128666, 698458080, 787688501,
327483652, 724587209, 324875936, 71556598, 750489784, 218027010, 399307522, 102731133, 132928384,
891125522, 359144735, 551442881, 368670493, 36311211, 278586885, 789765063, 539483573, 75177630,
942115569, 466434573, 28256111, 218380920, 116049066, 413166321, 448284933, 680167695, 654401429,
360494792, 878234934, 792882749, 737955688, 489092382, 215863384, 615407052, 616404350, 165706579,
880115721, 915411270, 868333599, 428780584, 305080105, 650999298, 589335298, 790653088, 430459660,
614458024, 206698869, 587207483, 325016168, 772243217, 120858393, 399072552, 567094417, 565894170,
206829761, 149510093, 164057054, 911135869, 162600779, 614208913, 710906429, 833803668, 906717125,
11558833, 564883672, 193100834, 555749276, 695518630, 210675482, 126056164, 54668854, 918502660,
565440664, 754930608, 632202237, 813551257, 243936290, 86615425, 34380644, 257115316, 192966683,
135059045, 978205220, 879543064, 21299980, 54224111, 848433911, 948161566, 609090084, 163622322,
158136633, 77235124, 786520783, 457887412, 470059455, 516150135, 460040697, 636773001, 596197531,
942399559, 932346724, 917921597, 441944585, 886516181, 929130720, 979596461, 176448516, 174736756,
952056673, 891960508, 659927649, 764396842, 321310573, 998850333, 131378712, 614439030, 336377481,
945585432, 816624477, 558149258, 196285251, 419999494, 928240613, 690113484, 484067483, 136520564,
391789438, 583072786, 545881669, 207391667, 914193640, 284582745, 26377272, 766332211, 103080978,
666158909, 667885519, 83021163, 778341253, 362093533, 165048578, 456905809, 670017385, 947855229,
556007387, 549276046, 536165858, 520228458, 725963799, 997866585, 865631503, 882094689, 189509198,
527394614, 17109595, 147834426, 403077071, 580423099, 779308021, 725926519, 893217615, 437439985,
734463215, 187747542, 760465631, 621780855, 473679722, 169526869, 998298340, 477889828, 390508031,
897824416, 45876861, 866685599, 874513532, 911690528, 995957389, 54233760, 90018953, 777821471, 60673453,
132797452, 990355329, 286311429, 402021189, 985394851, 562405277, 632201318, 764768294, 384747363,
278920707, 545821793, 481809478, 761926695, 758046958, 661870132, 805830206, 832017891, 311398169,
884807032, 150061908, 948025716, 135061584, 136796156, 308787200, 608255598, 195047337, 357579482,
794164287, 825484006, 630878947, 936174440, 969756020, 467123697, 80382961, 521974862, 838541810,
607116653, 833856524, 685568911, 644716855, 985813380, 546055670, 826130424, 311968686, 826152823,
828068376, 161295092, 620192407, 911804616, 781056734, 686477099, 600641712, 10341198, 979615191,
814351440, 136562659, 578159316, 870351865, 845651863, 582491052, 639356978, 711185494, 978003174,
68562371, 101917549, 621177803, 635138194, 169393831, 691925269, 76366232, 164239912, 982654116,
90465471, 603835586, 470637727, 584916631, 243337876, 409881639, 314065402, 12157770, 535518759,
799386507, 710557161, 470255011, 826800035, 274636809, 444869988, 595485942, 884616454, 12887812,
637566769, 613169599, 414695581, 653635499, 152782537, 847323298, 496370537, 447480671, 511567688,
825824551, 229042266, 308802718, 290514275, 393740825, 743532185, 748839909, 641636290, 202178102,
241834320, 52784396, 775623476, 863710559, 4018795, 370354914, 731639695, 745072012, 865890481, 30743610,
336628714, 826945531, 368724474, 479782538, 326249688, 69720135, 975810158, 242859929, 310039860,
195048227, 3807285, 430053393, 555569535, 915372422, 734440517, 258630889, 442666043, 249948971,
418534455, 104072391, 644822582, 127964804, 52743123, 836069057, 378498777, 766206068, 266782628,
183525925, 476710532, 930935791, 163107931, 585326241, 485978207, 645788539, 180544652, 235770806,
639219407, 25182776, 635142817, 717497908, 854077162, 974489072, 114948012, 760138339, 152631925,
316770315, 855923523, 862951742, 190522750, 419741485, 557748951, 395017258, 436641715, 399072306,
651093822, 171277141, 883230996, 626651362, 830523110, 63025299, 239805921, 505895228, 106864905,
468757335, 629001119, 568202456, 923808348, 973903260, 190807072, 886676074, 894639437, 803131929,
288705855, 633795250, 270903923, 139759745, 330881731, 732416011, 918501397, 381799809, 325026841,
276603753, 851746822, 276308001, 607108336, 768083862, 510225637, 907362728, 255568274, 567212147,
127957956, 111888633, 307337321, 563148417, 935832631, 677316138, 184455232, 609099751, 697945837,
359373908, 576687588, 870039882, 120611838, 382768682, 170491351, 202016777, 188696599, 645656042,
638685287, 200826932, 522398239, 223994836, 123274350, 77533687, 337801315, 17626037, 571348216,
936905060, 399997026, 103916536, 773125284, 326453186, 196611642, 71076233, 649784805, 922010150,
891782913, 80389891, 696539715, 807033230, 102519456, 268134373, 559032510, 359100171, 35407567,
845389111, 176832186, 128974422, 247466346, 341444206, 60997856, 716340874, 728945069, 59088929,
644094065, 339297663, 527532312, 682495010, 168796807, 755153698, 94976371, 989577859, 577674708,
641674665, 754746652, 49448078, 178215085, 12805560, 962240291, 833774248, 762912731, 311270595,
222577181, 21936569, 338750749, 854272343, 440486813, 472828754, 730557157, 59280170, 783205618,
388187773, 662891047, 589067495, 689570409, 861060175, 77028306, 79661085, 235688350, 728988522,
349907776, 440248241, 455855469, 90308251, 647858446, 447649024, 330918571, 149072893, 947075665,
401113161, 533667986, 790215516, 97874120, 301169000, 786803376, 290373379, 790476941, 540372992,
866773846, 150003338, 290233798, 992350038, 560033711, 540958459, 649576727, 615636162, 469991568,
107785264, 665774892, 993213541, 229924959, 672701694, 728366447, 489841973, 905636731, 67189085,
925864001, 211250287, 882210410, 479904955, 752542500, 919713703, 249337881, 956018249, 974250835,
400432595, 756253750, 298577417, 62900068, 98433098, 231478043, 256652407, 847270634, 225687266,
407797856, 311400440, 339739944, 506854315, 478460106, 729467783, 226167593, 441107430, 300956597,
100713715, 28297319, 724696154, 788858206, 512897011, 872139891, 555317912, 185619119, 162149326,
416200007, 547303319, 35986905, 541409163, 786994042, 524102777, 512611733, 227593639, 805857421,
409141054, 283038985, 321065642, 734489487, 231094666, 3838052, 433898840, 407605258, 479363015,
901045300, 677406191, 268880797, 902043069, 362123366, 15295195, 754764496, 165652461, 541687628,
276068237, 628678054, 988049911, 618098968, 822323949, 59503924, 522297005, 69637740, 440576239,
903254675, 363323259, 663839968, 146517764, 501427111, 716290570, 919841596, 602732, 91586729, 147661703,
390507507, 160964608, 462910442, 250518526, 127965224, 886275225, 85227062, 225602622, 443243035,
86601113, 118381049, 824247502, 522385206, 357994186, 242871071, 516922756, 828224025, 87786384,
89347548, 989450160, 429983687, 274048130, 863007409, 427169275, 975987576, 369901597, 646452269,
857499696, 881432872, 706099827, 569926129, 279550528, 947599990, 190928248, 400644887, 145452855,
585270425, 973044414, 814474499, 971035388, 647140426, 800660879, 662951218, 87110341, 842671199,
711209080, 557512825, 640005448, 416185642, 139200147, 217185012, 855926574, 962190765, 237881454,
772211010, 567214058, 15060115, 760373151, 863873372, 515906090, 41312585, 30866925, 437447136,
494525236, 117298485, 827222494, 711166069, 954958546, 663536859, 538772343, 298035025, 889857963,
570179875, 608815868, 861451751, 170009485, 744879612, 903440820, 664442574, 145563657, 558888823,
346600067, 543352454, 400602669, 707841907, 656695836, 883594572, 860431804, 243341121, 907361634,
440188008, 891938590, 16184765, 913272303, 409804554, 291246869, 628415710, 323595786, 820011805,
8724662, 768970845, 74888580, 54330929, 541906155, 337800726, 717009504, 190269141, 330220564, 957894353,
481188114, 861675845, 435873938, 234875940, 149474883, 577080828, 394696828, 197083409, 410540428,
14918228, 573755990, 877590974, 64915107, 732340488, 521375820, 559050216, 709146851, 760431248,
583199851, 800387550, 180184846, 653914434, 83288348, 375009202, 167603921, 276126880, 597517045,
847095623, 860695590, 36492550, 439461604, 836925775, 295745534, 149300087, 741601405, 256913951,
918057354, 604701521, 824696114, 2823714, 274866380, 716184371, 692650075, 974216011, 917880138,
731595691, 309542963, 448269384, 962705327, 766391588, 492011295, 344519525, 516109491, 653817012,
871141861, 819497879, 218841434, 178228033, 744822965, 276711745, 422646469, 295828022, 571773603,
287253427, 551496169, 830139311, 325141019, 18269612, 149650172, 341569352, 662294876, 547980672,
339495144, 478695353, 642534609, 366542150, 468787745, 545895463, 808823170, 16994271, 606536682,
633435405, 620259421, 565601324, 775340460, 231138142, 604617314, 535363023, 831200652, 450898608,
737119783, 128056184, 485967058, 688567251, 596466796, 641444477, 531612976, 82408478, 765727092,
297756667, 748565535, 348215404, 895139036, 728481554, 690588310, 895767292, 58339523, 241510545,
118995660, 82624553, 581389943, 633969730, 761873408, 465897727, 468357027, 234628655, 614190363,
638810600, 268812591, 578268063, 501012401, 740278981, 590995956, 215056814, 778717352, 311189283,
199028317, 609647142, 885283009, 551392038, 428779161, 123360889, 486286205, 786437107, 726326691,
328776154, 500497352, 851629342, 959851400, 841591094, 293330476, 256960875, 460690222, 584906434,
541441098, 292189061, 500654244, 898524902, 520527335, 221511121, 561749970, 992735728, 925844642,
707656940, 231551614, 197518947, 932209799, 465810155, 701861269, 772871182, 545807761, 711221910,
630329325, 903303245, 207991499, 35661743, 199564158, 423881660, 587168904, 943603679, 97153391,
16124622, 581211696, 190519780, 424750391, 727363690, 279561883, 766113979, 819892983, 293086051,
306828423, 737696751, 40575490, 558150829, 547844832, 965303433, 969642469, 883980769, 550384077,
780911478, 292196472, 81717524, 204831486, 487061916, 193109504, 852977936, 515511602, 567718239,
455908708, 222794166, 704786977, 682745914, 338121093, 200433766, 290365696, 611727283, 280237197,
944813520, 865827051, 937937934, 39778007, 439120144, 884113374, 287489565, 724886478, 749367080,
690173270, 336476864, 476488958, 211918295, 42597564, 514948414, 696038092, 135779790, 856353555,
438361544, 765805341, 954383162, 517965356, 745090875, 329660803, 487378656, 199515756, 663923356,
277823034, 657265816, 742604337, 742262225, 729766017, 327943416, 566162856, 765777787, 125898637,
321427487, 586399937, 579953128, 613525606, 640860884, 209094178, 365573092, 147470962, 120772359,
89170857, 987550828, 409594951, 633858051, 329159050, 646984245, 3957160, 621237434, 759005826,
929744324, 128435461, 67893623, 236171150, 359366949, 856074253, 817353421, 704816013, 76827585,
975301314, 185692918, 849518052, 986362101, 486625401, 715024224, 584915958, 724708148, 903134957,
624451382, 514081862, 69464102, 196672088, 293905420, 555799907, 422595596, 518347542, 176719859,
461596785, 721104560, 577325904, 540309369, 10175282, 250378173, 659159048, 521970993, 333660475,
707364409, 803810284, 661984503, 690168870, 192227093, 478243762, 383035060, 302186971, 204074378,
64712300, 394048574, 457353500, 109367517, 810417920, 784773962, 395308900, 482338404, 685383645,
119391997, 330783240, 558010775, 409507608, 899615878, 418049455, 663766679, 299816709, 993947385,
109717208, 71049477, 772061889, 452636156, 748162496, 179704758, 251428701, 51062201, 590696059,
907480306, 621246240, 77746167, 37979019, 69619827, 650881343, 655511849, 729941387, 479256517,
109223815, 766585149, 925902820, 44335632, 401125324, 224259299, 248748413, 966999769, 73410858,
669563425, 189671633, 448062103, 949381819, 848567680, 623535171, 762914157, 326205176, 22995393,
849566363, 135299894, 719503043, 916328062, 409646479, 143945166, 730160144, 545379218, 876926574,
218359943, 955372946, 963923975, 376859751, 336563857, 877883770, 764787110, 942415209, 845227309,
520728385, 939971792, 770136611, 706936648, 535656405, 488472924, 617918418, 78319316, 660199071,
187341186, 414762134, 932490104, 347378377, 778485900, 626933887, 456709199, 419988389, 143436962,
616353366, 985656404, 639552922, 596360563, 406145270, 150712858, 781421103, 523094410, 723002823,
242140697, 740272435, 187341339, 633963332, 700696427, 739981949, 784605094, 28630660, 759813213,
311548633, 634182272, 155013742, 197468351, 209310704, 609503611, 277273259, 754567052, 452108375,
128591977, 731273100, 432209817, 190077359, 881367481, 454070486, 129845140, 829835305, 778503402,
960348499, 427002870, 602759370, 180323430, 540834089, 243345778, 481807356, 386829074, 841672107,
886662052, 152576699, 737724322, 674782827, 794585328, 649589759, 842212306, 279112648, 323602314,
878719381, 14546322, 561476881, 365861773, 762126012, 743797164, 105942191, 430586850, 306668595,
355339107, 810620007, 686725668, 217203873, 93198245, 925929114, 346296830, 243344135, 271337780,
825516359, 682885033, 659722944, 503230672, 167489226, 743323459, 149325565, 24611657, 802077605,
171504714, 761311822, 851402177, 312996246, 466930089, 569634028, 376772033, 9210548, 629478674,
310328909, 640898375, 423266665, 834462107, 316734428, 312830417, 346080203, 822047966, 92755928,
618061967, 523809338, 686419836, 264672353, 825518194, 278759848, 83868519, 697009518, 777529382,
761274885, 720490904, 752637115, 983587225, 977566938, 341757687, 768640813, 277386530, 488338550,
609479668, 762486665, 7584658, 111454661, 146669802, 700074060, 616333538, 306824376, 48915642,
806632928, 189512529, 744112713, 231206374, 412491937, 679813222, 811949711, 132680343, 952095099,
479308072, 217974332, 740272022, 333816591, 821350619, 411780825, 832786541, 644135892, 211959152,
206245859, 983189682, 439358815, 635884084, 477842399, 586948898, 375459053, 181269840, 769607199,
618346106, 127951040, 685569787, 49025946, 700245066, 592453320, 557460508, 225768598, 654734782,
797141071, 442155464, 505330880, 573407681, 742452988, 431563711, 438945132, 136686912, 795375078,
644826086, 827324296, 412529179, 923553073, 273986999, 899823964, 645697738, 185589842, 898027650,
655923092, 577532088, 649661949, 498469332, 445265017, 66924647, 94512318, 250108341, 556649854,
190519833, 572768262, 810783602, 897828725, 707946686, 841846401, 478473209, 427158575, 117906241,
488358624, 306784769, 568410465, 409726310, 279648903, 22362428, 632997971, 38033366, 671123017,
724487592, 173267719, 714855678, 257648040, 341847416, 933620272, 577919572, 5283315, 800930926,
431588851, 637883123, 362119406, 201535533, 54216827, 614779475, 557011615, 548781894, 573544662,
644882370, 817282752, 743324767, 178300330, 173311477, 222233752, 452116187, 933275354, 214244896,
63028385, 152904113, 208928770, 762045586, 695559987, 963659822, 880055581, 135162712, 921374542,
119345190, 179607410, 359838531, 756966762, 893222394, 66813332, 521628403, 586735254, 741541891,
147837857, 864079649, 572915260, 44567097, 243345576, 336396613, 799975715, 579235684, 609957723,
799529916, 924145836, 442800708, 706759507, 465324249, 666521294, 433714377, 662149226, 492591354,
723707862, 666005750, 65039001, 123682242, 768562616, 513731165, 571787738, 296084431, 287665944,
53007092, 241821283, 696406532, 653360726, 350987219, 803894157, 443817444, 9904058, 216933428,
250090119, 621204357, 927277312, 717354229, 826152986, 945466499, 588198429, 226429772, 637608032,
770833368, 579729393, 608940738, 440555757, 743990208, 621903066, 754570829, 301258227, 93946114,
583924229, 306391140, 877557051, 322590594, 130703480, 726168659, 968294138, 868123047, 530709394,
641811933, 61587017, 548734075, 477307201, 858914150, 832645116, 505936657, 914318303, 409108005,
491197708, 614059725, 226730176, 37945378, 857456, 782724266, 681586464, 182600185, 111172207, 321551102,
599455842, 851314125, 865672905, 115472977, 752727104, 682285098, 778847376, 399628102, 805754860,
209035419, 184311621, 981644588, 366524338, 613131123, 637877449, 945992797, 351108257, 247486486,
930169998, 843133310, 457030388, 902136269, 253646099, 482081381, 649692552, 563069708, 487865540,
274566200, 839338008, 696992917, 752617844, 629380481, 363856617, 395124518, 975723164, 384724506,
94807600, 77529654, 808666966, 932979792, 487140477, 50977930, 150004448, 730824802, 427137823,
334147770, 185626452, 983208073, 771923995, 530062532, 543596296, 605243417, 828547617, 857507795,
943288932, 27525763, 368538774, 232018220, 520703930, 146556382, 582657578, 40496241, 224492182,
456018556, 101267863, 220179367, 871679641, 194406, 189515417, 464558099, 104882110, 55337632, 457972858,
670915694, 878480402, 483806788, 788092947, 646982605, 491571503, 342410996, 152974583, 657646333,
300109887, 510258180, 993961856, 198997478, 729087675, 128082547, 678134636, 197407662, 762078143,
951673865, 168294560, 287244207, 316618460, 352658923, 300402064, 729840484, 71007316, 852454314,
662920991, 235595782, 326900637, 807351927, 322530335, 844514150, 984686951, 487967021, 232889188,
711864179, 770195755, 847418138, 947511820, 74195931, 689697160, 384083712, 47117377, 980165595,
291602356, 603974269, 367913499, 469274898, 166672886, 717456826, 994145260, 745828499, 83179668,
126998560, 916595387, 739743457, 123101954, 909782305, 470596492, 273659869, 615616048, 831070357,
964916214, 741668462, 447491467, 271923793, 770171524, 503073207, 885315223, 761849257, 794213227,
89602678, 492153535, 83861697, 276121836, 292646183, 664372028, 937503240, 351980436, 306592526,
422306437, 559908147, 205994007, 659494748, 535527945, 477940819, 326793599, 378845314, 707640259,
852362477, 466083791, 579077220, 276604358, 491611240, 724706611, 192891989, 246511809, 376767910,
720058637, 268729075, 163262888, 173206178, 266876603, 527661128, 513674892, 710530801, 842367418,
587435180, 974457670, 21893868, 667293298, 536474511, 516633693, 306793808, 995345705, 84276310,
266844905, 876187332, 594530689, 582149020, 684901118, 256950405, 856038560, 665958655, 393619772,
276765167, 856950996, 328826814, 286495764, 440220759, 317690737, 481498116, 32610011, 365721542,
104228382, 423785543, 408866413, 973598361, 677728209, 251763807, 60451275, 493314747, 717185050,
913087798, 414052312, 396244710, 147634145, 836632984, 441868888, 863712182, 91037012, 852454295,
579423922, 618156172, 483464121, 505191950, 283603918, 286579063, 694325619, 448154338, 959771725,
780988951, 3549031, 54237818, 339655815, 174701549, 291170538, 595957277, 403120477, 85217466, 579206450,
536752677, 943245983, 480174299, 471080645, 380596307, 707831785, 243821483, 124317109, 572897395,
633804245, 444898106, 403707566, 191951642, 877002556, 74193212, 331448532, 216085042, 252415669,
434904351, 606576243, 585898212, 230769717, 628624862, 653553428, 10169598, 740308407, 771778485,
964615062, 603556851, 490238698, 614636869, 950867218, 684804411, 536720610, 473802180, 205998004,
91708081, 528626983, 302130401, 72151565, 40258020, 635792535, 859224398, 118788532, 787681190, 32373294,
576429846, 110027833, 482515681, 328004832, 182968922, 292052043, 921347941, 615328133, 366541116,
886124459, 936523950, 768577295, 35768487, 516766442, 2669164, 568212767, 592055364, 476495350,
760669705, 639383818, 87166826, 123257031, 684896875, 244435001, 883135496, 279094553, 591617526,
405170171, 968880421, 696011358, 787673747, 454067178, 354938416, 620030618, 379363480, 1232122,
305595574, 799490252, 279120087, 918633602, 871535688, 201010350, 266274603, 821480824, 974569620,
183036377, 107379553, 248677969, 274027378, 460496147, 467480070, 555542919, 464287756, 487732116,
547904552, 589580016, 306796618, 22267683, 222973396, 180961307, 805223694, 716248945, 31052074,
938262477, 783520403, 126306611, 998310127, 316881429, 220384317, 833866781, 680419577, 436666533,
990053592, 692824691, 804867887, 337898985, 567130972, 616781975, 286672710, 862733494, 614634,
843421978, 24602297, 17022692, 889770039, 689338705, 505320957, 386853886, 826098807, 953830689,
458608072, 128409341, 830616875, 362621882, 171198761, 455302507, 439800230, 758488938, 920635503,
60081769, 597590672, 428938219, 84267406, 956672003, 94994976, 761561293, 154041205, 172372634,
982093981, 465863542, 461131783, 422379363, 915422700, 22432151, 797274633, 952537008, 252401855,
690231796, 292136418, 45839249, 508272592, 774833232, 371776108, 756973083, 113456112, 378050248,
789665471, 767446438, 439366197, 594981547, 155516611, 726052227, 339706039, 631771090, 156150311,
584194626, 94510121, 98773349, 175810565, 905532487, 670818792, 515906462, 206021686, 646977654,
930149241, 886530644, 886911427, 358030915, 89292586, 69900401, 918233332, 88792005, 511888449,
896167888, 764852744, 584182489, 158982338, 439359864, 421393614, 76828765, 773622715, 178300084,
254461477, 184415918, 348510191, 574348885, 434950444, 802053415, 833952266, 476852132, 497399474,
149636137, 634662398, 146087929, 175203397, 159176962, 761298010, 372178111, 928591285, 569301502,
171422840, 511860489, 340684787, 892317268, 825539968, 682599506, 878270555, 174368888, 888843752,
226173774, 737224335, 364483796, 102202654, 280952151, 833737396, 183497294, 785599198, 266074936,
631511929, 774747173, 295736626, 578961614, 929635328, 983204689, 984033456, 668415450, 65713791,
494050027, 961998559, 233072127, 610321305, 351352086, 913327990, 884444639, 301210274, 918693,
102842253, 154773196, 600272011, 524970544, 652862895, 553633454, 168804294, 914408519, 64888843,
824971503, 355162435, 223819257, 725949247, 522398836, 783534037, 136003988, 965380627, 877987309,
427539249, 133201786, 737146414, 282961249, 339701986, 458546936, 713253219, 83969401, 467202503,
668427649, 990498681, 756487545, 250847319, 351706416, 678146998, 304390361, 87076265, 34416393,
825518715, 266202130, 456043622, 942915103, 49204562, 75051396, 231095197, 419708881, 571801176,
394663317, 623045782, 899745536, 825032330, 845853156, 623383413, 555467216, 895571505, 209093335,
676304475, 109415790, 815439282, 785555326, 736413881, 168563818, 911689616, 595466519, 973235191,
730560249, 243164470, 190387422, 804951633, 585742294, 14555845, 976896500, 816312235, 36130681,
886126022, 323443024, 205270537, 143177279, 513407721, 592777515, 41291727, 215147229, 932397792,
862873716, 571545585, 74790673, 607136032, 943295196, 625377240, 368586734, 118747168, 382293124,
671043003, 600369914, 803166602, 148045245, 140705408, 133201443, 131461262, 826166115, 825512945,
4679849, 725172071, 130858468, 154877949, 960627459, 285605858, 824821424, 909086831, 492329966,
817211041, 479821921, 285754367, 451337, 110971078, 803463258, 92210022, 928566201, 602834990, 230725178,
942002117, 700449052, 951705865, 325091569, 978925055, 628701909, 340122804, 965345661, 807228699,
17258701, 183311602, 974562419, 564942837, 811382473, 858372786, 24413607, 28671557, 397406801,
131719751, 848054630, 945496055, 804727536, 113659084, 352317005, 539218659, 574992713, 77099663,
138322491, 797738231, 556721015, 662706510, 913903590, 724623969, 54975003, 88810027, 84675564,
243923297, 987024414, 365507528, 882353768, 946761335, 724974649, 963253914, 487873936, 768627482,
322250440, 465434067, 25336277, 422400213, 253900713, 186231595, 321980283, 81515038, 190521731,
634461924, 871718168, 333674000, 451122342, 662270390, 209621703, 646979216, 932878225, 902945220,
33501334, 978891592, 89201493, 112795198, 176689376, 491374661, 750947336, 987455838, 599122697,
35091229, 933282470, 538580114, 104874804, 49377488, 47188850, 633808419, 453454537, 600257938, 80336449,
89527084, 556476229, 533327559, 279121740, 421981657, 365967904, 949282567, 618900964, 253819436,
152688072, 801424444, 854323973, 399559665, 905229068, 234616515, 556736600, 835992163, 77230832,
218028843, 632115051, 998673741, 955021805, 945751311, 440183501, 325825019, 478459332, 822943683,
326213207, 509820601, 918824631, 495368070, 68236108, 825522919, 357685198, 195049003, 887017180,
35142057, 802338015, 954104858, 737104052, 903589592, 340045935, 312809574, 474104398, 682498913,
200003643, 505829430, 413530713, 644868115, 351729399, 960957580, 770976066, 150019002, 516164454,
853576467, 118172820, 318017969, 805802843, 883958426, 256761818, 589344495, 724580187, 845338611,
330979662, 165677394, 503635281, 133349375, 24317095, 255170805, 31852904, 89877830, 980509743,
591637249, 441127700, 968142575, 490943558, 483641571, 234989511, 433855711, 802036863, 577247864,
272071338, 870991625, 995825191, 380111753, 335199330, 530825394, 841835302, 3717884, 826456206,
319824833, 217599103, 754397282, 116367628, 949668784, 248422701, 881108513, 235946829, 35129032,
293012817, 768127754, 671952123, 616428942, 186434909, 874245567, 945153955, 212022158, 730550332,
68408278, 993567442, 226485623, 761302467, 309581842, 525086057, 313598211, 613200375, 847629328,
44540717, 766380807, 759512625, 249353847, 885372409, 861421562, 939475104, 881196539, 222023116,
790657001, 363735388, 397540729, 243914093, 888349555, 808321642, 921436390, 392793717, 16885240,
226444725, 188769418, 751296440, 83552418, 924821722, 132006699, 152923100, 556649711, 289911735,
491194340, 30653114, 409990230, 740035924, 208509927, 891779655, 739535353, 821475851, 759013009,
430242765, 124169882, 889558303, 35859046, 338819698, 525230322, 163158794, 241528810, 762993898,
536332555, 890456103, 295978745, 616098731, 217541889, 583065429, 610148275, 865320171, 762083001,
87067255, 288614810, 275877831, 34364915, 487694718, 430896370, 634482693, 330572587, 740308313,
364855080, 804482086, 817914213, 936666207, 45726101, 768428097, 123772448, 380282489, 900949319,
312038797, 470793177, 69627663, 821211871, 671786503, 801656390, 993584550, 535276424, 353890226,
847111391, 38061251, 950526740, 88960940, 975785385, 112135935, 275242653, 476850920, 925999927,
120662307, 761282422, 581981053, 20290035, 808644988, 676007912, 861322202, 10073707, 548455441,
991495457, 303144159, 849364505, 303352371, 736707160, 668511450, 422245812, 481043016, 918179385,
390374453, 388207664, 570338474, 193328376, 616366642, 122670304, 565447842, 165780946, 194417937,
743230586, 88874755, 637987474, 325805621, 546342454, 977526404, 998672364, 448036860, 756304116,
613849758, 626813542, 826154763, 105687057, 246636947, 988791695, 595056249, 911417725, 802039105,
990185656, 346855749, 553643220, 749344227, 770827455, 184011873, 287431116, 148059853, 866401284,
110049593, 286664953, 192909796, 196337314, 486881869, 840590896, 348397816, 804621860, 682189326,
320995675, 406699972, 836509443, 370184631, 546258567, 291503137, 722833495, 265992058, 120029090,
672235174, 103735564, 939821368, 497499412, 732480361, 530410277, 397218355, 51406217, 449288688,
771764720, 383894542, 262972570, 847255433, 411030393, 583292212, 995408357, 14413111, 741486447,
431962868, 639017951, 97655851, 248431052, 903679030, 682981738, 29808338, 665412005, 878471031,
434249424, 791908962, 381797203, 178273462, 801017860, 828003695, 273567382, 981604961, 780457414,
762057904, 90753384, 989265594, 300632307, 873194224, 737090962, 254671764, 670204913, 337374680,
844592719, 51402598, 976963197, 770567159, 287456844, 634639481, 750097424, 300624438, 365594239,
301211121, 178476903, 180396290, 844881091, 825514245, 876901180, 591291933, 130860280, 334160894,
729471387, 292646696, 983468032, 9009629, 795777841, 369381381, 528497932, 567163719, 954985133,
313959270, 297442506, 413391267, 871671928, 186548596, 693848773, 962943342, 390380143, 109068535,
558078784, 52385584, 426427166, 648267674, 298035760, 157950656, 283881521, 600163599, 870863578,
148277609, 46940011, 248046074, 83695723, 488288555, 567746213, 928560401, 378939355, 490933521,
505325324, 430000417, 822300163, 277274439, 446893598, 437062185, 165770405, 861998777, 58046406,
757939246, 661839383, 558013471, 32921627, 192919431, 570240561, 806685882, 39942022, 779077575,
776537018, 710411298, 26410731, 825142401, 926784388, 742828003, 186526555, 393595066, 341882356,
847230417, 981767301, 487255601, 374550739, 949487858, 993947491, 612878109, 938510285, 645740745,
845984640, 535637220, 637864290, 629967482, 73342294, 554293301, 795173220, 430545461, 830616726,
653693932, 501796987, 799499147, 288799026, 560335557, 102574443, 611001762, 178296517, 753070075,
487018169, 187693567, 459503565, 571052347, 707356823, 633370651, 187353760, 998911141, 984445300,
494435610, 399879081, 902088040, 809189566, 248406097, 678361062, 304458806, 998595616, 143418351,
204200581, 161311441, 418111265, 595530641, 742027399, 764371561, 975116399, 659709440, 51192668,
279715324, 910178499, 935469433, 985056754, 148670787, 501496010, 10394961, 882210222, 624702474,
300554675, 510216604, 986539583, 800277913, 337073469, 298025922, 866543872, 788118679, 156238417,
36137549, 679131268, 449177582, 106894366, 925314870, 206164143, 861103371, 800144151, 170009786,
310622360, 165723853, 955995609, 104330432, 481807693, 438772355, 266004135, 725554490, 314189248,
857173581, 705924990, 33569094, 900409328, 977853627, 516768952, 644897584, 71868107, 492408846,
807177858, 948425620, 741338231, 921788227, 695851544, 25268092, 167605264, 314684975, 318256823,
347118981, 739792188, 175804812, 150969058, 505501186, 427363160, 38170184, 849540134, 914510597,
913605641, 170502387, 279821603, 734779105, 313216284, 275941756, 598096920, 860158244, 66817492,
666163902, 385293380, 689720003, 374568981, 269870084, 603107006, 55250864, 285623961, 63025330,
888174418, 983532116, 529659337, 30051052, 733242576, 350847449, 860398747, 144521735, 397421907,
923738996, 588386311, 649567224, 195041432, 904424466, 840842834, 572828244, 284123324, 489591984,
671048837, 950337853, 389863226, 721862230, 110070738, 3571129, 243870330, 231137641, 288727467,
987698141, 741996587, 965372542, 192724108, 883567653, 530719257, 929544831, 311113939, 640227762,
910804145, 49660264, 197149396, 958232881, 51038539, 817147841, 561501631, 970982795, 100713882,
14813605, 456028252, 976996997, 858916496, 531615273, 913262185, 41298666, 229637847, 610066771,
989395931, 714152272, 579266898, 589000315, 545835099, 530377096, 345283057, 701332068, 248434442,
703560647, 686108862, 399116245, 476356831, 595512153, 994656715, 571879372, 912749942, 554153324,
357160256, 25289442, 555844310, 645874512, 152704935, 996923827, 81898366, 748853417, 421448137,
484770860, 488220869, 313721656, 218333578, 478452845, 846442778, 497527763, 253620218, 424707600,
964627490, 471296434, 902646677, 451784563, 714006706, 242029457, 284950251, 987031137, 163015888,
57172101, 429620281, 51160086, 490024423, 820655074, 942252064, 984921695, 891086681, 584029264,
459590587, 774731896, 434090424, 491566001, 358692316, 920736839, 494588747, 182497899, 181098979,
730562102, 964547130, 478862231, 472924062, 976110918, 509719688, 847165520, 469214007, 665811788,
911392190, 105270018, 733652021, 163381446, 368617448, 905556355, 753113028, 885430514, 630182656,
849482866, 131084379, 450402383, 400017196, 663832443, 58824056, 491998559, 405437637, 92854591, 94608,
450343, 195768858, 34458086, 672814104, 732415851, 644613789, 565304444, 145725109, 674163355, 364776990,
145711133, 463537644, 192729790, 144645100, 409122863, 737825554, 505320956, 569518891, 803306825,
225808969, 12803585, 830891668, 661762711, 368301310, 228636059, 857255645, 612946768, 69205042,
386572470, 739687971, 205981757, 176689312, 934958092, 3646085, 81902196, 14204919, 212090379, 759516954,
351255197, 993589472, 162606388, 148271361, 77125417, 205630964, 949542147, 511063633, 995214791,
146303391, 559355561, 444514020, 295846223, 335042120, 878002937, 415542918, 447562419, 178289677,
721777380, 198295745, 440590045, 634070370, 863672059, 690118811, 658955541, 818535115, 940278984,
522175716, 949084851, 105053260, 567919259, 127964076, 945429447, 281003629, 704465222, 165650089,
311399515, 677574613, 210760839, 603635254, 391868909, 920380212, 149727856, 396194635, 276006843,
738673524, 46158299, 790675936, 660054174, 20899123, 893196960, 178694385, 799061467, 436865655,
723082438, 206922936, 330918267, 764499581, 584772045, 101347487, 661835929, 762851574, 343957025,
920915669, 24861536, 621919815, 759035704, 772242534, 641439588, 998727435, 832000765, 454265657,
476241593, 277719514, 76792972, 886893327, 30822837, 884006157, 351954481, 404532440, 400577663,
589336102, 794881976, 724924480, 137020619, 340160044, 326873824, 677170214, 212011650, 319988948,
256762380, 565775560, 891965908, 266184352, 154841143, 775886553, 954388570, 397712780, 772186917,
405397628, 81685573, 796976435, 99904134, 550447937, 327134027, 220965911, 346434968, 786469437,
371929243, 969912571, 123975940, 366942570, 517334139, 393604849, 865582817, 151822098, 149359317,
448311768, 180450754, 561539121, 452779985, 69428873, 809346729, 803920043, 404635037, 208561677,
132244105, 168972412, 285217916, 456554144, 336207321, 639477639, 243340556, 367225501, 799899052,
223258581, 862751815, 728960399, 341757007, 35574916, 100576525, 75414783, 232943766, 888267903,
907509723, 572639418, 375500199, 538465071, 461167224, 35707324, 748649201, 100974844, 172496749,
12811729, 222779927, 653938486, 584635431, 131736582, 636954617, 20313062, 81789885, 475698884,
431630104, 276280934, 340917283, 418570419, 318511191, 41968252, 969510099, 209083013, 557860237,
800360921, 571346712, 437081390, 608883838, 35497139, 139664044, 729051196, 640258880, 66986584,
421370800, 974893795, 857199711, 766131097, 187340974, 495258293, 534985145, 91243923, 694442870,
362033233, 648352610, 731606217, 611632398, 91056632, 207629956, 377581863, 869933692, 689706083,
543903297, 427363540, 848577952, 138657862, 129892960, 716703062, 198980363, 667193252, 624598311,
61160238, 382985190, 462611475, 831280594, 473384603, 284720145, 514550246, 157941345, 883239042,
641570365, 165655890, 458942930, 792027972, 606199717, 501813858, 230022981, 809499813, 90376577,
296055849, 295544759, 332535427, 222801249, 227578417, 783587790, 131624600, 381758230, 743833203,
861072960, 470469347, 785479505, 666167311, 579428451, 249552184, 534114015, 820799973, 992340916,
71864331, 97933572, 200503085, 641475452, 488408875, 292186912, 795027037, 109493734, 110702025,
501566781, 359631919, 387676295, 826201468, 828172879, 641403194, 645207249, 665110216, 17721670,
541579274, 274034336, 443085186, 288308130, 948425819, 366282058, 291253151, 489731930, 192673328,
262243364, 330093347, 190950948, 129631926, 633384138, 198980838, 664070739, 634014501, 468757258,
544237700, 954426197, 513171119, 579714413, 662796846, 589757554, 105756623, 790651268, 647829659,
734463085, 933808970, 733584756, 149814364, 309512671, 110015255, 840156287, 616181013, 205715562,
408102371, 587322858, 87446007, 762464426, 577263993, 156214455, 51166795, 590324770, 932757119,
38077491, 936182490, 510219310, 673041010, 827171580, 103446023, 166698269, 510113391, 947507722,
375086065, 289601666, 144717910, 578038139, 883461001, 744061088, 433912671, 430639938, 722954481,
401482814, 841816852, 132811898, 413440961, 568901754, 41961223, 846594475, 784761832, 456650185,
392163153, 261050407, 177340065, 403072393, 347223030, 127865826, 280717302, 667588686, 961886271,
605097753, 252184748, 350998299, 198366007, 865964272, 868280768, 73049487, 141249898, 127865969,
84608572, 375308893, 97801324, 836676425, 138705132, 27373796, 12941896, 408326378, 630209098, 259214011,
831859501, 847209303, 481991582, 658239289, 864087072, 786324280, 260213060, 505050029, 311147772,
895626843, 952125610, 457471631, 138659165, 214022838, 237644858, 754089814, 522804358, 646156640,
876905909, 736701125, 3791283, 982526366, 710275347, 756985936, 529303451, 822303157, 947039827,
819542146, 137036027, 234102319, 955996076, 351545449, 12198711, 781000027, 214516091, 625371127,
629467137, 493180710, 959786166, 522310056, 695926862, 190398166, 692422193, 627925504, 623765273,
441122669, 209102132, 689444311, 226800591, 173189922, 811464533, 1175237, 556015867, 427955770,
841348301, 266784165, 644829844, 332392689, 360940162, 79663698, 778245769, 337797072, 415343090,
47537432, 678128492, 925353334, 105905935, 493010611, 547224379, 202037712, 800672400, 131730130,
998295809, 51047170, 80560945, 871444601, 117323295, 268588406, 779545584, 481230381, 947499458,
701857265, 338054449, 578199671, 152614169, 728483899, 172665076, 562868020, 630648350, 452777604,
527758000, 255564903, 831427090, 591590732, 61309887, 129673009, 367855548, 760734960, 414730265,
845653873, 80767344, 734647332, 764583694, 283567601, 768503787, 572818683, 136997146, 921547958,
773683576, 26154205, 360618305, 768053207, 370101028, 915310082, 738314902, 179696584, 286055122,
12155589, 100983996, 628269021, 688493667, 143533734, 340167871, 984443249, 7685735, 661855501,
717570572, 85626972, 489005215, 14973885, 49212499, 414653799, 136127685, 492273573, 171188602,
138308372, 56038122, 122502633, 898748264, 847632533, 448508084, 290039674, 666140779, 979613805,
998093871, 265573126, 192936561, 476723936, 819255098, 826160809, 25205063, 418271066, 961216333,
724836043, 309339422, 341834293, 648182876, 83883378, 790346675, 461740524, 489725737, 936284483,
18110288, 22992310, 224357509, 778385536, 689718732, 913389341, 836473126, 988062584, 830388553,
469603014, 87294095, 124060059, 520477382, 152247460, 825046790, 685566231, 303450382, 932951562,
574711000, 274050002, 576876909, 610040621, 480095175, 325706555, 382960125, 499353693, 41956207,
647150765, 689843704, 90367904, 32382322, 242400260, 961111916, 397477180, 587335966, 853981786,
746624867, 457634691, 873022073, 96626356, 271632062, 251291345, 984451228, 316816544, 210566935,
507343864, 654411136, 300073685, 489505836, 216182389, 195242865, 662378726, 139661636, 633842677,
123244218, 241380208, 231132633, 280371375, 714680553, 845542133, 618589882, 787997305, 145696688,
390624872, 596131389, 91567573, 921003653, 41014447, 526984607, 255077347, 918181759, 210165862,
944218155, 133232712, 692005116, 225886297, 349685744, 551655680, 325177984, 151821981, 139278147,
423549985, 653557201, 603974513, 439017261, 711123830, 609804270, 603854936, 481537096, 834451015,
22698686, 757490239, 503204755, 309334553, 825047970, 394558286, 375953309, 771660465, 707363161,
103965198, 943715220, 473147370, 932933971, 101805984, 766325512, 408655307, 177005397, 589840702,
646978877, 132136216, 291465085, 418166804, 581196866, 158142658, 664291578, 476868524, 250024181,
155547461, 982063226, 660711475, 226093144, 829141187, 231131542, 371528499, 434602933, 677714232,
810908405, 209072936, 752976038, 635847154, 460302538, 828544086, 217198383, 663164027, 637558083,
630183064, 608933652, 898523263, 744879849, 257254097, 676387429, 954436509, 366166115, 399258285,
710453147, 989770372, 826234342, 552104061, 885633168, 989374023, 540344903, 211990597, 979285071,
584793425, 902287377, 784352400, 754572150, 130013691, 676731073, 434957622, 302048967, 980768110,
781735208, 971128848, 731508346, 852665459, 937828213, 155310540, 208218852, 855900384, 487038465,
953681099, 122480861, 296207784, 772047186, 38362057, 256534450, 390209361, 777515487, 491537784,
268960386, 941298842, 733565007, 354299093, 427055649, 641403373, 848438437, 890033470, 648240092,
982991098, 176448467, 602980749, 450974204, 830837735, 623541880, 942421155, 629259050, 801569062,
861066967, 818271503, 183537981, 346613152, 207872890, 281388537, 592427493, 976953455, 841281545,
448036271, 567743360, 280988930, 327032315, 962766668, 350821806, 806758931, 276161310, 723032809,
303536876, 172692505, 86541773, 394817220, 290857374, 258654098, 281074388, 43709452, 541439965,
465588568, 597551723, 579320312, 699194073, 683654604, 540005391, 221850532, 554964780, 606796645,
44833781, 937780532, 915381051, 751377049, 451448240, 862988179, 947460985, 626697844, 61711686,
852454515, 230799714, 650937187, 247495914, 665226055, 995405376, 458239599, 179996889, 162610775,
412442100, 690117171, 295386607, 686735351, 524315928, 151196379, 395283940, 359658783, 395646848,
90850820, 708034560, 836756392, 646996198, 94986775, 683089276, 352464322, 950601067, 399260503,
533850784, 492744250, 934740485, 279202560, 106989328, 945700313, 438358588, 465711290, 23546483,
983154636, 567130514, 450030920, 963135344, 539582965, 928932380, 729504810, 5382659, 145697369,
409384588, 190540937, 288216815, 226308576, 591186382, 691401284, 818138725, 781687135, 831280663,
157017495, 920008306, 880113028, 607665155, 799227247, 107589202, 160940997, 251737772, 570499835,
102553461, 338353587, 612634167, 407892964, 425842252, 994400162, 20092666, 37105554, 825086179,
424554091, 914177626, 638662866, 130499559, 347384669, 397210736, 889839535, 279189692, 191953353,
703524547, 386898255, 192471293, 166002703, 156073809, 321793446, 710211726, 545657502, 189039608,
424442061, 398355133, 454077997, 943211108, 694541037, 597770673, 849541838, 337806032, 334721314,
323035069, 222782180, 123028904, 735012262, 824878259, 1908551, 440215670, 901266210, 825376118,
393642699, 897957159, 68553845, 92233188, 913357355, 614058558, 864239017, 498180545, 77172604,
266773001, 945465864, 479115923, 432206403, 806646669, 548073525, 364340752, 85611866, 986497742,
102713539, 879864066, 185049226, 372181397, 26252472, 72425907, 560697092, 158111964, 825484195,
546559537, 281944204, 976309094, 583318089, 653556149, 486260821, 206005590, 8960192, 682608856,
30409387, 881101961, 619840700, 75091550, 766611678, 639048490, 949098265, 392516193, 721885942,
575451976, 139662468, 77531296, 497802864, 852761238, 103854155, 774372190, 606918318, 384833088,
406891682, 860264724, 857256947, 332950874, 847162819, 543910385, 579318794, 879511935, 648309500,
666009710, 335595005, 813067039, 787035944, 85437321, 628725775, 207922414, 170920923, 962723013,
674004489, 378261158, 614954889, 468750158, 489154022, 136354542, 447317385, 32109464, 154970900,
193789822, 914468582, 337009377, 632161115, 521704595, 985844597, 492515842, 426736352, 399256162,
837383288, 8283412, 893394249, 106814933, 887881382, 41290156, 819178131, 617045541, 248498190, 87507175,
903271672, 876853040, 648020083, 30583372, 153168086, 235952509, 722193110, 794554358, 434607169,
363816495, 473566204, 65288416, 842472767, 942616480, 611480662, 291252947, 665520784, 200665008,
37790407, 349995093, 945461918, 633257479, 707753461, 168277305, 91222390, 122217988, 279122103,
800440666, 937796718, 663241638, 585141111, 609867257, 947016200, 26222305, 529301038, 813768597,
834593030, 843887695, 796147585, 941134214, 581901535, 256272855, 973004067, 819231950, 715183822,
862772534, 731894450, 688839718, 743931603, 187460868, 949122072, 105385987, 885418874, 870993416,
551404544, 530622273, 947697229, 408857870, 800902696, 945429064, 205978524, 729047388, 71254859,
23651899, 850196832, 279361929, 375887754, 811787901, 943679938, 165604323, 594463713, 876636833,
913276297, 866698673, 283101129, 328730360, 10634605, 593671628, 302354535, 432171675, 989965377,
949862381, 894672003, 874934373, 521998358, 451200209, 721611985, 888927808, 667380846, 340081044,
74066747, 479238472, 325808340, 938507486, 85454934, 953712348, 148084734, 50159437, 161749284,
168967524, 991561042, 939092933, 536760722, 305753489, 434702453, 405415203, 497681181, 677925614,
536732355, 926222918, 799830339, 274874217, 761876858, 792079660, 738239818, 714839062, 843183440,
401668541, 980040718, 836448516, 615349521, 966990379, 739620841, 571510310, 580057172, 921853947,
304448381, 206265911, 712091887, 857925231, 164797134, 764288164, 483224959, 584178040, 714913659,
5579275, 875708503, 606854419, 479905544, 439643476, 301785123, 235040828, 577190080, 421286895,
268138483, 292186470, 283186703, 449555589, 258893717, 271212994, 364395192, 785790373, 937619696,
377196204, 175793985, 884774445, 158193773, 14720672, 615648813, 722595953, 281139927, 381873161,
25495158, 686110922, 695775518, 437306179, 187479166, 761864498, 326676091, 474354602, 391092249,
787685001, 18754157, 583129543, 974508809, 134284937, 853339735, 427377410, 763024128, 190762939,
597440720, 301182128, 611905589, 626426234, 192947653, 913426233, 182140511, 694255790, 567910824,
934575894, 647132113, 770901638, 123438609, 962961985, 882160827, 478237961, 977694872, 325120937,
596250991, 431601559, 158067080, 148691753, 668768609, 820860982, 202455101, 471935766, 129343277,
461569694, 762480592, 918961089, 925270997, 592419119, 696434033, 734465038, 435587457, 294704624,
672417965, 808398305, 227761897, 899764865, 88510734, 741503901, 901862608, 898864689, 456029207,
535212981, 68809594, 662227237, 867084082, 945560510, 767338586, 48108594, 870896431, 455845436,
54422932, 195367713, 969756953, 918469296, 506578820, 49135221, 310877322, 670853224, 393802694,
723710954, 865675404, 702824296, 785600197, 424659043, 604762375, 662293548, 188376660, 164245255,
844116137, 9673524, 545865964, 184269216, 974566372, 617887837, 935184624, 807241741, 991546526,
130253851, 395344842, 855916535, 950343918, 636632185, 404398148, 466440150, 305210418, 29753339,
613562701, 853652192, 785305121, 437854180, 433224264, 364384958, 12887578, 861182935, 918114388,
589769617, 872107577, 198980723, 73291240, 976464017, 227315435, 578588499, 369746940, 674523711,
800283156, 507350100, 460635779, 658410859, 740151721, 752101415, 799925390, 249359978, 141331354,
491224884, 816272912, 550419845, 928174947, 787715289, 579447056, 935684044, 912630339, 843025929,
670524980, 92663335, 983196878, 143402496, 712053484, 873623510, 669559648, 788074758, 409365840,
126787865, 592031157, 773156519, 721724600, 779488042, 244978310, 899011945, 250519409, 257456726,
424745561, 178933389, 947518887, 42220636, 187354785, 922447683, 155014784, 840874504, 653612339,
227799905, 551475562, 793246198, 113615826, 313005363, 914597126, 495591098, 994367920, 727074113,
933332644, 616354666, 780926816, 507455507, 877547407, 623040614, 182520840, 630189669, 484354847,
541754198, 648949185, 487919049, 792007791, 187954658, 583180780, 457648076, 857692098, 434438449,
803594998, 609223342, 605805464, 290836955, 269449283, 235031742, 237046331, 12892816, 874516652,
784887498, 181102984, 876402330, 887047412, 349700983, 71045324, 532473564, 114962063, 314718717,
354891707, 882207028, 946767809, 313698823, 913453453, 194418678, 449235577, 945596655, 870516365,
179656688, 488694199, 316716658, 808792668, 762925281, 744879928, 768165006, 554585402, 393533296,
701725486, 865271133, 81877458, 676820982, 218866415, 283006396, 523095577, 72595610, 93918249, 50885717,
592603275, 865129179, 786983262, 80676375, 123482724, 205262332, 659875243, 143577374, 866894735,
906724607, 723695993, 326226097, 74768111, 694171660, 123262861, 403191319, 963427468, 205852990,
67110884, 530255409, 104062808, 94515500, 482522466, 236182041, 968295477, 3077, 877456499, 862358053,
401170053, 564539565, 82471263, 791921435, 407622683, 998608865, 856467869, 81313188, 276785836,
541676931, 93932830, 781257753, 711858909, 275309553, 800627195, 847099808, 218029594, 163084280,
153023437, 161704506, 492373306, 304935839, 128707174, 350582046, 83021214, 22150359, 560811062,
171181599, 295950966, 576174802, 384218012, 842076382, 861442653, 852958402, 706836922, 406112814,
513275651, 953530763, 465314353, 720660400, 427352511, 408686478, 987904248, 635685766, 490091371,
631767240, 876759969, 769114223, 587276648, 744779924, 434087947, 960350351, 555775620, 917943895,
280329728, 842500374, 654706200, 37141830, 453840003, 566866546, 871183479, 604806823, 265994036,
707488721, 189112175, 575026127, 456532533, 18395696, 845559458, 156113425, 315967462, 246841463,
248521207, 308201165, 818849006, 983537476, 402451409, 292927645, 88571693, 914374424, 775456507,
4783198, 345351137, 11029332, 266302352, 418782370, 707357575, 732070125, 398665028, 534776907,
877585767, 754077491, 807563406, 51916209, 920152048, 870502339, 614519145, 542184308, 400072287,
818805406, 491402467, 750585137, 676049613, 495667287, 782839889, 279581602, 887606317, 439932024,
365624479, 204634750, 158221640, 128049702, 868092512, 799690982, 54301376, 590165156, 830369954,
271881561, 657814282, 330918099, 941265892, 275319336, 960917428, 75629981, 182524938, 670799124,
541439869, 594662780, 963376772, 885954775, 399065544, 627672469, 598975142, 936869530, 905015130,
874472477, 929339288, 383564687, 48434395, 997934660, 629524670, 824279031, 363573529, 810957684,
199993312, 243178001, 891342960, 806793926, 711876246, 897199379, 293073817, 175674361, 870021862,
975106301, 41957017, 277651265, 345265630, 914702030, 918495203, 802862892, 753732459, 441975338,
45870343, 41019256, 837104064, 604991110, 481507857, 898071987, 103712588, 589903899, 866510434,
949507831, 550577685, 589940391, 582110266, 427391634, 641417539, 638523519, 136057404, 363885732,
78287043, 617392396, 761249652, 275307693, 272985500, 580841556, 303284209, 5243343, 947427195,
287228715, 209306324, 613682010, 187747314, 743456752, 144362552, 1134113, 554277299, 478032018,
556530782, 555884864, 59514564, 102588150, 377346589, 522107794, 850017430, 860608994, 450407552,
730592202, 274816586, 144228326, 725480288, 836074205, 484365282, 781270573, 914336624, 495727043,
439282329, 629493147, 566726923, 853483200, 164706725, 538677102, 147252066, 124688104, 12893359,
915471059, 721888066, 994278873, 556623343, 158631033, 377832653, 660600772, 150028477, 783986085,
220493630, 764845899, 862547503, 85614355, 766113607, 128776191, 112688727, 572772890, 942943903,
249279119, 306445597, 405106390, 618906126, 377030104, 386845992, 288193585, 214901458, 252144890,
481237814, 489704877, 603297639, 151850763, 9688301, 732265526, 424442427, 840097140, 59521446,
743308293, 51042551, 811312305, 123695320, 810776573, 562732110, 668708573, 301888521, 889857821,
143209914, 155425447, 188614409, 196702965, 135051168, 461249810, 969729197, 273895111, 845946856,
169623377, 492451137, 63025107, 241908533, 507470682, 663991531, 425829998, 167605000, 802205612,
790010864, 27810852, 641433571, 710739061, 861003098, 223099471, 60909187, 762025027, 959860036,
447768885, 503120337, 661666360, 281711959, 665334396, 829396751, 337858981, 35243604, 881544234,
156131061, 823020090, 641634313, 749385609, 221540671, 408694936, 179788407, 16950071, 764394964,
114248341, 947742859, 644775177, 661002711, 165828578, 405911865, 684898630, 362090755, 404326525,
265004024, 211670093, 887378799, 635187848, 348653695, 515748675, 287380452, 914486442, 77018685,
789502743, 202986671, 345156810, 989870901, 455879178, 841421623, 760300618, 816304189, 470661163,
858520485, 5574810, 607080843, 946148911, 4550245, 319793270, 240984831, 212090515, 794108478, 156040347,
568371954, 16296616, 444509608, 778270357, 275932099, 513456425, 766038416, 851267037, 528570077,
46199697, 608552260, 785259562, 381935544, 18441241, 614319623, 916601509, 984621290, 166571354,
428712638, 714579789, 518956935, 549058654, 682106210, 639567045, 352320394, 285080382, 309087538,
138078512, 144097504, 583122411, 677623419, 716390925, 19132487, 291721414, 842155956, 106135010,
841819724, 69017565, 629097065, 848067758, 603917074, 405524359, 679419553, 748836202, 589743823,
824568076, 686280628, 884019693, 276913613, 129570286, 906712872, 493439098, 433932502, 888364029,
964167442, 14694899, 751735905, 770019925, 618100233, 135029088, 171391038, 324578800, 260194845,
802051597, 889683174, 707613763, 690588892, 248592988, 646406699, 774719427, 810899637, 242540513,
267412054, 504005238, 698458305, 865644674, 15017068, 368302626, 671727989, 796546519, 48317739,
400142588, 520465845, 225551068, 404327312, 401599425, 819276336, 532794083, 156354439, 541745095,
925819509, 727815944, 592272584, 309482664, 311087070, 538503861, 913380104, 928588696, 968323675,
785156756, 738181939, 158796844, 582000075, 739887772, 873181277, 640118823, 976936054, 439360104,
148733109, 183345279, 568001525, 769127760, 998703957, 615634390, 613576118, 694266313, 630607475,
430047918, 545787247, 740204523, 623564525, 377269157, 12171734, 782063812, 868843625, 197975632,
723807382, 74168770, 478050532, 350096579, 341788810, 506767053, 626117902, 822307894, 673558677,
649673813, 689583679, 857236266, 536223590, 842834360, 179814019, 663401297, 353882166, 523783764,
517900713, 799623501, 899146334, 130239235, 379440464, 470254267, 705131899, 279834956, 398268050,
461483725, 156380271, 265808363, 158114361, 72281059, 577861978, 526971446, 402559558, 25369515,
695233857, 853582102, 922353673, 592610265, 259220386, 602934802, 767376205, 199001477, 369974518,
821567028, 285129512, 803286369, 235967422, 49429264, 463103840, 208385616, 175923069, 599728757,
81054771, 776558696, 338073360, 681831386, 938601198, 12967251, 532788558, 581254681, 262261361,
598857029, 770298676, 786829337, 764285702, 426015112, 622620540, 790380966, 661267879, 645137834,
536434086, 771916103, 335092097, 150296736, 102749467, 134998100, 152494884, 810788836, 46441303,
584992295, 395233716, 130844506, 277839685, 766114287, 824751090, 626423343, 795938021, 528797884,
855929518, 764285641, 520475748, 415902060, 540301914, 152795508, 915207602, 204225123, 913902473,
399488967, 180958950, 445135499, 661969840, 590931735, 130482294, 563358667, 965310354, 754169124,
921077594, 545810319, 849346787, 217582624, 809563477, 653047274, 177765837, 2666069, 224008786,
51204009, 164006281, 412793101, 434316032, 239011612, 602011569, 438502640, 457495481, 743294555,
165644171, 315540631, 452779376, 553200483, 553003398, 893891670, 290497636, 750604369, 547884745,
630645028, 389557937, 51195520, 707868711, 112701772, 913375984, 914465512, 448034916, 674738603,
620402604, 431218182, 218335834, 711896566, 893917606, 580430900, 949193611, 836846369, 606556077,
82410342, 610998397, 592394583, 340531132, 254020051, 731540069, 685616778, 291598175, 10421659,
716302553, 547810880, 605430911, 343273299, 591265476, 85417657, 795009847, 16277647, 887560951,
686261851, 19256909, 898784769, 285652543, 731160290, 613773739, 566890007, 390044824, 820315183,
890157662, 488910555, 492039027, 323585946, 301883944, 576118720, 323832701, 732401292, 790608893,
889473448, 507585761, 660278259, 287273267, 860794541, 562879096, 303789436, 789771422, 608372266,
252380602, 490290973, 7589723, 582652176, 269924937, 496409337, 232963156, 371535494, 256163946,
460676067, 614070060, 979628061, 845183452, 177637298, 697453836, 949125297, 530707543, 766622570,
841932910, 316794349, 202724644, 714593642, 711974079, 74713574, 641641060, 12220038, 588212059,
319127889, 466557985, 291966849, 566985428, 846015149, 349822425, 385576764, 187473936, 891321658,
153982317, 763852280, 862894242, 860159473, 731598627, 133030688, 733793620, 862824943, 192729371,
472841543, 603941605, 787724022, 752338635, 781737908, 860649819, 481588021, 643103925, 886578856,
557208905, 496524567, 100512760, 629267743, 130858112, 38180209, 127843846, 466124041, 762898573,
279967244, 753868722, 891985980, 919888900, 729779603, 383353543, 164734073, 296274556, 193541775,
430487136, 443839460, 138303743, 618677387, 52383020, 954452604, 251429994, 817353846, 932200066,
307217740, 477971328, 333278602, 905559827, 25729265, 436627948, 208654495, 810635181, 187755113,
806849166, 245587476, 281377469, 893411746, 750230870, 799738572, 654747328, 718493018, 645935734,
614056314, 663579463, 223846017, 676591202, 512463253, 414163869, 867982378, 323542850, 760675806,
851130817, 785361874, 157007092, 274839662, 234031986, 107185187, 648394683, 290638742, 167286207,
339914657, 311506829, 150291054, 5244176, 613598934, 495611375, 779379179, 850906235, 677052604,
492409379, 112126484, 666023256, 842205941, 868025825, 522606373, 567310306, 978727737, 790666280,
921557434, 991243813, 721502278, 408781784, 399075081, 639297410, 268755894, 227890800, 932340424,
879517329, 519763746, 375086613, 301967764, 405182175, 611957163, 157644134, 724578027, 561038390,
912649269, 228931249, 417670941, 477257877, 360212326, 496501878, 246563128, 328616138, 886596792,
634848810, 165706748, 884217881, 306580742, 860350640, 714278538, 407904637, 248984645, 401003351,
107287287, 511723546, 827200136, 515404431, 974730090, 848074009, 806225252, 349690882, 45861092,
258625292, 544804355, 781753983, 598826740, 974042348, 958201641, 19095118, 77533328, 662180466,
825233874, 484613153, 368510360, 858905828, 575507420, 730555626, 641810567, 192981284, 585100208,
436210622, 883454578, 33009043, 411060101, 877630719, 248955562, 813043901, 356668043, 275238083,
706331788, 555681205, 623539819, 221654656, 950324026, 862994582, 175731603, 30900784, 797665169,
739703217, 475548287, 856485208, 118537449, 69905178, 589699528, 51030421, 269407220, 89323726,
448057506, 689571283, 554125253, 387681681, 530100572, 291598272, 326673147, 561863363, 512623727,
925875081, 900691478, 499739555, 75457478, 439892664, 244525872, 327659957, 619959264, 416157592,
636802457, 445756704, 342634925, 940597583, 565449127, 231486835, 54952932, 951702933, 955318853,
890516140, 710226546, 666027671, 72556603, 768093013, 78242631, 495762680, 384785095, 918280374,
39913308, 766620375, 425545957, 907360382, 796013225, 93143129, 899690224, 744881526, 120603968,
379684849, 257433910, 752728883, 748145963, 19004966, 987949588, 715601311, 772218112, 274014655,
117539339, 446110964, 230094179, 33214141, 804506359, 990946011, 386254048, 882607907, 725790518,
822355270, 191378317, 444881156, 15790727, 377450383, 889314183, 786989710, 577229521, 455664973,
637518372, 882913441, 981359904, 207659805, 316707681, 614763740, 740341996, 92038438, 110206901,
923889024, 899763506, 692727360, 487037416, 655732352, 819163977, 506582357, 130856012, 75960421,
968976752, 545644791, 745291663, 290234014, 347195629, 465981371, 549949372, 382804810, 20377522,
440221968, 845541034, 306290344, 241394286, 60373818, 372655026, 436898062, 637117368, 260945929,
887090323, 201791105, 621463621, 465869131, 921651943, 395219720, 358340339, 334983720, 811029137,
364088591, 603298704, 579782671, 990041439, 136459669, 102311046, 232976108, 343892565, 196674328,
236370981, 823364047, 598758825, 343396415, 974519311, 721899525, 69146450, 947552709, 290633118,
686046062, 660647355, 235233414, 598365334, 317303434, 676986262, 133967029, 460704625, 756965161,
647158178, 456273086, 104935629, 590768329, 527247138, 26308262, 552667658, 561842538, 933042976,
56992280, 137538374, 780380120, 235464432, 673102071, 597420948, 616230134, 376836513, 659136156,
851849217, 832743911, 462104960, 990406820, 821279219, 968005793, 394900708, 838044278, 148946847,
539355983, 793193220, 841166306, 307434209, 598035612, 957984780, 831285890, 778450502, 545748932,
324409087, 996071742, 958212349, 133381314, 966277998, 176629987, 264236999, 882385726, 87439555,
377424674, 487482406, 248101839, 659706692, 351723941, 404337114, 420375372, 541606408, 870039666,
257591140, 834426579, 558168728, 276083448, 814359013, 708870058, 922444612, 710926168, 843109357,
882183098, 17483172, 833964518, 893616501, 978102278, 33774031, 567211774, 794511897, 605007796,
316625371, 962024012, 689559289, 479447388, 17720189, 67940363, 97700177, 781494602, 145301236,
944552788, 952425554, 383363574, 915684359, 862585145, 18661268, 733169631, 933582223, 102519123,
388187703, 356435880, 30066013, 383130910, 445006044, 648567001, 740286158, 466945276, 320062953,
957530464, 795028860, 843028416, 318412386, 884378566, 722392249, 919916816, 734782978, 243980952,
102837090, 152253371, 981495623, 407912473, 738410695, 655348844, 118235119, 962903082, 248675892,
19003132, 337373009, 356437643, 560740666, 873692425, 676075276, 131742192, 740308354, 119370908,
816431038, 938079199, 697334775, 408362593, 71039067, 959808491, 141289349, 9328360, 677371764,
960840165, 782203831, 407980561, 974939766, 744764789, 487691096, 511241134, 974261181, 458536588,
306467418, 68509166, 981426151, 852937000, 556548091, 512564894, 890403489, 295974823, 579765432,
262258563, 928633401, 757334347, 711186731, 251265237, 81495484, 483471621, 177358154, 163004006,
454139439, 440137507, 603802509, 11873693, 655609785, 523762006, 375989452, 970884262, 423290459,
778267664, 201050504, 978175508, 419830841, 123324232, 712010183, 409599153, 650325883, 296738680,
590222995, 42950454, 148059513, 861934534, 581959540, 426825752, 158265659, 651129244, 580765528,
45840104, 883157188, 744211669, 146627018, 764466690, 427141650, 205203314, 608945927, 211121176,
771962863, 371230415, 732418049, 220211724, 596686309, 831452097, 427295278, 360699996, 547333749,
781987656, 286096034, 921447439, 385560234, 69904773, 487644162, 34412091, 826231305, 329919609,
503550898, 187701429, 848159108, 176119263, 431247181, 860996344, 663835291, 685595125, 889857210,
980625952, 547866036, 110435261, 90426177, 84677193, 685925734, 48913327, 222795757, 725316477,
128200282, 327426100, 79663571, 300178803, 844900425, 940933596, 235565303, 629428087, 176402658,
274047000, 216845783, 645507859, 793196364, 738680769, 832191137, 462543789, 389035419, 260935389,
550386877, 482913655, 648842618, 538120274, 355668319, 862510638, 545794932, 507306160, 800434065,
725375999, 525029288, 557998450, 405209054, 501778172, 148262762, 848786661, 492041608, 308392862,
149071836, 979372003, 357738165, 209781240, 27406397, 363427445, 644696554, 470590029, 659029556,
709654635, 332425252, 934729790, 341306274, 688520899, 874522397, 156056780, 762043919, 533884446,
208658623, 517434638, 228326004, 58128308, 434432333, 807334444, 607082842, 659920567, 579771145,
493877697, 919480464, 584928112, 623039425, 303604211, 961001385, 581992943, 344734510, 395221425,
498437135, 917841987, 461572828, 825503910, 797711056, 12235566, 987286803, 461492123, 579817360,
966248102, 301968382, 278896314, 562438555, 546411080, 30202178, 19793055, 976332144, 831982162,
227948403, 567136870, 787050355, 341772231, 522505347, 219047612, 328583770, 750645359, 261450526,
418844351, 639430648, 653138054, 269383286, 330915581, 711960081, 739877750, 529077043, 106501446,
977552341, 6906504, 90727190, 17918395, 353931588, 612301503, 146974726, 69907229, 964845957, 151146437,
244765917, 280343720, 511457556, 255733467, 409121333, 926754266, 158137088, 108107355, 277649372,
421665104, 581992597, 164278288, 810521362, 716328250, 32078507, 237587744, 337849463, 796022269,
732260642, 384778207, 584194907, 119647530, 579208578, 204119127, 581407248, 322008387, 35704790,
274948522, 757635723, 94939502, 657361854, 516530146, 98130239, 804484122, 642725635, 285423956,
66848018, 790419271, 199970742, 337798148, 587189755, 471023932, 309253711, 758933579, 658984696,
684787109, 202372620, 211993121, 592758849, 864523057, 147886825, 199472224, 429158825, 330919053,
637727345, 934860903, 85636871, 673972124, 878253760, 848455658, 118785240, 962063453, 165574767,
991605728, 45213199, 399256810, 485983013, 26156435, 218328447, 663819735, 609188980, 465115959,
556449579, 177042937, 251447362, 497933449, 970011928, 249066830, 914239555, 995408582, 800840708,
534250966, 536960302, 17424813, 957605703, 493440697, 489771714, 127515153, 985892338, 985796584,
454317202, 891784857, 314113580, 851860207, 381850979, 194564851, 590442480, 84349025, 459618842,
997015930, 663670093, 816161897, 933303853, 730014761, 378809069, 732982004, 410908514, 434115387,
965407518, 24757741, 523192717, 230682141, 723062198, 74934486, 443917152, 505043905, 521857140,
787937845, 845251626, 88742446, 124529591, 174545686, 291507646, 708855569, 289606497, 152757162,
496412195, 39496704, 38173887, 670806076, 206147776, 626548800, 938149169, 541124989, 611031415,
690580576, 169267504, 821272369, 376820747, 877464972, 827735321, 903449976, 979512111, 667351048,
539699586, 564220738, 10360572, 687231489, 677502711, 67151617, 817939369, 122212570, 808590318,
303366838, 652616581, 65150704, 545840082, 35710262, 810606734, 130395606, 301264973, 581913225,
110102510, 718474272, 297312310, 304511031, 104266721, 84620205, 471369084, 655640621, 783574495,
307680071, 723067352, 452779472, 318281750, 291592427, 171321367, 609806557, 69635694, 426074702,
878222153, 460633237, 585203258, 594632222, 405904189, 146179292, 763653772, 889115602, 95596144,
266117691, 998672355, 421393987, 464641245, 418543816, 474842881, 158477546, 282395787, 950535190,
595675558, 159140231, 667538725, 39909409, 296568894, 209639878, 167462930, 884108397, 347954507,
639052023, 383340562, 754893875, 724288089, 826150599, 976376858, 34863844, 428579159, 826488851,
148853035, 65243451, 834272552, 529266378, 588094743, 226703833, 401639128, 982386028, 969103470,
169985675, 883120990, 503070532, 736409854, 822376757, 1595829, 149305624, 283128987, 286445049,
856691092, 31602139, 484531816, 489850390, 221952585, 955500749, 451166483, 368526522, 671133032,
759947848, 101974600, 809371328, 13153035, 398645781, 222014534, 795029562, 760141935, 455940504,
916706408, 677062523, 129417403, 100556159, 719745533, 666124831, 340308300, 962904261, 41398405,
422661833, 634056373, 742793922, 487693484, 943665941, 179681742, 292136463, 652618764, 158542616,
283273166, 975279109, 523307907, 545265830, 842292122, 880054654, 114253138, 431386417, 133359570,
649794349, 386057495, 661712917, 942781949, 964564282, 728436709, 234849411, 305472037, 709122819,
811223258, 219030404, 737840782, 104887906, 10969150, 455854771, 740233768, 728483917, 940990546,
152971364, 265376520, 860267756, 954160062, 60982239, 190487140, 218414644, 383291546, 340486106,
359652017, 476133418, 526877621, 889328774, 659700632, 311335341, 209063622, 44548740, 302138485,
221577872, 45205300, 83180001, 325818456, 587300943, 114561439, 40027131, 387973741, 932862227,
962396836, 50146610, 31198096, 68495347, 352331114, 377275217, 630464501, 184382559, 35760526, 837913410,
152976251, 418982146, 890168451, 131920724, 622628613, 923612934, 74816431, 313890704, 323598629,
86613967, 327225132, 965217161, 736662506, 291766781, 515944699, 468870644, 886538701, 326255479,
134200566, 536549177, 976526, 975264288, 874465784, 161883526, 301236009, 387813811, 366275678, 77145800,
240007432, 942992800, 253352184, 694148626, 996420983, 943299279, 976609329, 907399401, 307324457,
491223420, 312991904, 324230804, 152071324, 952305060, 714941676, 3568903, 222419977, 918437793,
200921396, 893715044, 401321702, 465608336, 501040025, 783520321, 674077472, 307690519, 540971963,
180320150, 992780959, 2863698, 242049014, 710925923, 165846300, 781684566, 575861624, 414169622,
956238701, 589809343, 449245270, 460528031, 493075204, 287741752, 503582361, 179341376, 393902741,
148271699, 235038338, 351820062, 281533167, 488491035, 818497948, 344788337, 961038103, 434762500,
770118982, 563131666, 265023571, 508338167, 832554877, 254316943, 711864179, 423740050, 945752908,
856209657, 156287547, 672233622, 694253082, 529314216, 276729055, 857528562, 856678996, 45725862,
486788881, 658243998, 647935184, 430039848, 725946965, 827323814, 729050914, 209073645, 25271812,
751255680, 165651454, 901843902, 661646511, 491164049, 327340696, 202042253, 782885780, 630217951,
480070369, 795339647, 151829808, 370365179, 903252765, 205542347, 377835360, 918859150, 793371799,
198294412, 327647284, 679647485, 734459882, 934980732, 563127688, 54916889, 202231540, 452714303,
295342081, 523949696, 407598355, 443388674, 399904744, 532351465, 390519738, 945292528, 714347701,
936278300, 756968261, 395370440, 139652873, 605449416, 8348984, 576863204, 672780294, 607290993,
789687776, 449197107, 772254540, 654810330, 290517365, 67818805, 250984932, 960370772, 265745584,
997922613, 600245819, 937194049, 709014687, 411189236, 406560661, 628213835, 383664566, 901849276,
842554844, 144967898, 313812458, 722912852, 647798876, 248708526, 12937077, 880107929, 631863036,
274566183, 807563153, 236324322, 183485412, 743305191, 858375842, 116796740, 124546716, 280106194,
770885304, 395504158, 102226340, 913616535, 838154231, 65368125, 98468688, 139857521, 506563034,
284019307, 279090402, 370113317, 571985380, 522547415, 998709796, 14955802, 529308239, 658542609,
470700272, 522976917, 811543659, 381311461, 222878753, 303445626, 209296637, 514095352, 302235516,
670808675, 158657340, 51213310, 820725842, 618439133, 366423414, 386843925, 598347020, 845559766,
992776134, 924890327, 481799347, 903935978, 39913692, 426339840, 205683274, 393528634, 503087095,
206965540, 94964244, 824349922, 977929613, 37170243, 774121333, 495253266, 779778227, 456400330,
910201765, 238752229, 926618842, 805807617, 395223504, 338302776, 877114854, 114307143, 884185145,
670985010, 732430515, 645828806, 250103257, 187435686, 639330932, 370070578, 958610631, 646050593,
34979610, 59557283, 809137886, 519581376, 404533410, 883323279, 575877787, 126197198, 186376546,
459206608, 306317031, 645034817, 960953257, 406037794, 455862004, 940880329, 918521311, 176914823,
461575479, 257890883, 286621854, 351377414, 685524966, 668289426, 602985459, 421389175, 316170947,
743219799, 842550412, 606798382, 182466048, 346920250, 124604615, 37491481, 204198692, 180277877,
136068245, 866842666, 171208725, 207413463, 799595277, 898811348, 785134320, 109982490, 371206208,
175796740, 23662145, 52776574, 556649253, 70980581, 596222182, 7682512, 243160588, 979522551, 1204696,
319125876, 349938602, 228236696, 106358252, 324213604, 22138336, 606450150, 948426557, 59006907,
532313277, 592910985, 136001988, 639112607, 109251420, 501835055, 565427742, 756348775, 164552652,
113344590, 960455096, 366151283, 722509461, 213760991, 718324530, 207645924, 920153704, 189106816,
522248244, 429227369, 927177430, 684387819, 950515947, 751463824, 195014936, 228325790, 171233766,
764737657, 92163833, 628248712, 756393190, 136223760, 38773098, 886675373, 541174624, 160805880,
34455335, 335102346, 376696546, 213915176, 201260610, 981344912, 166571349, 700004386, 807522974,
744141439, 729041182, 87171256, 775636970, 442434047, 747990322, 492531397, 770567210, 510631539,
614144999, 394840282, 142018116, 842455584, 69543412, 638754944, 606197907, 579860958, 538426377,
807574756, 941976896, 393729660, 754064069, 903315873, 806472605, 560725772, 85744799, 204632672,
400603079, 201991966, 211001566, 884102694, 334997962, 184314264, 73047261, 578853826, 244917051,
661640149, 222642476, 123355392, 397472833, 128080185, 289423804, 484738122, 192463001, 17535395,
538573768, 803914994, 925498051, 722882057, 943695843, 476860651, 143641408, 216405584, 608363729,
253183960, 633796427, 465666225, 617108042, 225747903, 830405922, 849554600, 293752134, 960822613,
520526739, 727816270, 226723494, 40324243, 44540431, 733811432, 828991316, 336408328, 583006017,
417458726, 269438441, 151736338, 500610663, 997311161, 665088732, 275088759, 395500545, 256959508,
335119541, 56699568, 465965744, 750610246, 821471617, 595346099, 710925929, 682871977, 164750152,
679353232, 104922119, 234167736, 566713492, 949504450, 766119756, 455297647, 545509533, 228230051,
678144279, 326876662, 487062605, 233618073, 338861787, 554657249, 947520115, 452302591, 729109743,
80680230, 544264007, 550400841, 253869924, 751715608, 882631517, 165780455, 884357300, 496460192,
791865434, 541619825, 234590239, 484337022, 211875638, 842411470, 366309330, 634001999, 297466625,
857535043, 568446484, 393937233, 919563606, 371781265, 47680768, 165994886, 505504560, 550383787,
791252888, 789151282, 629433076, 3991101, 112686272, 210104116, 407758739, 408866891, 312850888,
528599637, 152973141, 851229920, 620249015, 577175258, 394056469, 907212927, 793192080, 194433643,
407884688, 430703225, 520474634, 490051180, 690083359, 754450315, 487684545, 539676333, 139653353,
69003616, 232091112, 228059608, 237657667, 955956314, 668930984, 397678223, 557361765, 92202231,
976136069, 36528377, 86691915, 918059500, 32110337, 649572779, 207203715, 399780830, 731890749,
143933188, 257377337, 967101539, 583637538, 870721967, 743081614, 722123431, 707041828, 205794165,
626616772, 341605014, 349355920, 572567233, 349942725, 476483145, 608927027, 742833750, 348612507,
221565397, 465979888, 726119158, 673034240, 196689702, 793928905, 522164062, 151484935, 203449721,
72666159, 771826105, 429977273, 377926915, 634456431, 42412458, 269314113, 898765439, 260321484,
781260429, 460196283, 963004159, 388013449, 614246002, 649626401, 560250227, 423385759, 324579814,
674003503, 517882855, 605287511, 953672710, 366458272, 80905792, 479295388, 555859064, 291785393,
934861008, 341810792, 839659590, 811781963, 490266472, 114790580, 342152366, 296144327, 486794061,
377249318, 517027888, 546404583, 107921807, 52364135, 943295308, 917892067, 979487133, 383201069,
895726407, 866990113, 59251291, 406405367, 629467260, 637572567, 93865117, 861193848, 648319180,
491585885, 585289278, 296102058, 118037624, 545635109, 891917858, 912669505, 311393020, 486927309,
791266484, 246561924, 107578027, 394470556, 911035991, 545897117, 216050595, 113529219, 601224570,
910262235, 801026845, 730520278, 100243452, 233152752, 74035023, 641636729, 729010609, 175797102,
255278180, 117025469, 419281637, 670460218, 914193117, 286694409, 546764776, 102839739, 678228142,
301316688, 802958323, 143888614, 192602006, 916092736, 107770089, 206771866, 837520405, 146175945,
574512674, 600309896, 562611397, 145769826, 740288690, 94772691, 76687739, 644678895, 725461149,
190513025, 882485097, 605637975, 415281366, 40196418, 856435498, 659880815, 434266413, 762423773,
105960562, 168653064, 135263236, 664606110, 952536615, 107784120, 924625353, 195835911, 332125171,
122769913, 789150055, 988009258, 270614909, 3416549, 670225284, 190894754, 967222021, 45516804,
644851329, 752696166, 703524247, 1740858, 773683374, 335597244, 218341960, 609806202, 652707237,
233002190, 786452335, 146519113, 711839091, 808330710, 183301508, 884468054, 811350400, 941095638,
545079310, 547346819, 732401097, 299717296, 768407805, 921446469, 888361355, 542586773, 893943643,
164212606, 436213662, 45767202, 634689345, 246135085, 309224260, 831264818, 77728749, 165752436,
453090170, 889857902, 648926544, 203320530, 441191201, 165632770, 171644761, 400928679, 257439533,
965449534, 535830367, 154902278, 680709613, 140531751, 397503700, 676632121, 112705539, 214862317,
298155046, 368196544, 614471591, 69807204, 260970029, 411191476, 634149161, 280143806, 551495397,
240321937, 759167915, 257104096, 437089862, 98446459, 382783197, 249255596, 57060615, 629493272,
641545916, 597525876, 599035815, 132871840, 4394143, 369965525, 855809796, 761870303, 634211326,
461250582, 567455919, 558506782, 8526229, 553348747, 115039943, 417265162, 401290319, 804622982,
212563091, 83552635, 614591677, 360837603, 814484400, 959861042, 268332993, 963258500, 605036518,
505894658, 606869140, 323077978, 429705238, 36796180, 709114183, 725765113, 315270288, 78401238,
523252069, 715706737, 740225540, 298034821, 815067294, 758175814, 257697857, 538334305, 962993821,
129422223, 417911276, 743324888, 742514694, 649355662, 117189298, 804427527, 436649589, 986257413,
545885246, 252727534, 419012441, 106328002, 985388651, 291604291, 656973393, 390664749, 596001350,
165001133, 686447321, 831071466, 992884817, 714605481, 110109458, 715840660, 959896344, 646405535,
516722764, 436853129, 845423752, 783128814, 645995140, 71152117, 804887604, 3585517, 673960912,
863455772, 8342614, 318166485, 222661034, 279087258, 933579504, 729237492, 218954237, 40753187,
789786173, 556454529, 461302819, 783735223, 638227814, 620355368, 101838908, 325672793, 884995308,
74784028, 829620685, 237217035, 342404582, 849561601, 290412460, 933300178, 862504997, 307512312,
694166712, 356706547, 595347811, 627177810, 969819575, 87943324, 286114374, 148885765, 118019133,
131782027, 620406073, 788988854, 58222674, 31577534, 981026355, 741642893, 45432974, 853829504,
765461083, 325764335, 822110188, 424509621, 429174099, 535026981, 816877341, 977945360, 625564832,
145608892, 870740382, 7756774, 644194903, 687899489, 189805228, 641811010, 170008660, 608791291,
349861824, 975983623, 148634811, 691323251, 89567394, 998209003, 629024696, 843020043, 824336609,
324286426, 15538987, 923249201, 110029976, 833393808, 244038881, 100246087, 5748562, 191837362,
434215189, 896865927, 685556515, 571803503, 826205123, 493708371, 97796136, 510251557, 281397166,
476859180, 886123276, 530123609, 826106121, 220969165, 222145630, 206930852, 377102654, 584963025,
976202208, 628105568, 667134725, 152086058, 254846291, 631647041, 104461570, 832594052, 987749310,
921663594, 870786910, 718475474, 877994677, 806112004, 623133410, 966216497, 557005462, 518374100,
899641091, 887610099, 828047103, 212504657, 505193225, 10544241, 679807269, 213733683, 94366892,
257821936, 831219359, 858914844, 837300774, 795014282, 556720149, 763035750, 69676225, 395873941,
759056275, 635798534, 540495889, 60363156, 845542471, 271141169, 10335182, 739151817, 838766841,
715440103, 245268150, 505900854, 445236152, 541410123, 140627177, 671828234, 107777442, 101278566,
833712111, 194003733, 528556855, 409463394, 959828981, 934003004, 23461286, 913328316, 194362169,
756239891, 38018909, 60456055, 967926260, 536688299, 209492759, 211744181, 542916470, 826114409,
443531864, 179369248, 215000290, 330917928, 329565083, 69629032, 419737051, 424316978, 695838230,
579199307, 266834207, 527728691, 87042894, 774063409, 735246202, 275284095, 630200966, 965384680,
128081542, 190284897, 807335357, 517215917, 41958041, 250006851, 808260127, 953679826, 676660743,
578949051, 87381489, 688995584, 220953342, 27339801, 536964390, 70993765, 496358554, 649537177,
763801534, 300635209, 886121377, 716128243, 411095385, 867218570, 830842554, 368595268, 163152371,
772621941, 825516911, 596395006, 856455306, 421999409, 859892795, 401437099, 23690926, 84039330,
136514268, 279942832, 590141305, 151419132, 247392959, 104266906, 478242931, 69302583, 565534673,
499295264, 330323420, 913402032, 529192864, 295737327, 154823218, 402048432, 499282879, 682595748,
416143625, 307595662, 20765889, 422276709, 183602224, 955063090, 506742621, 375559996, 291440731,
479470948, 179686964, 1786449, 591989611, 451200212, 547915319, 692669883, 239504081, 620493354,
587108806, 647214426, 106140960, 620505964, 892672916, 557312147, 952536606, 77059749, 749413169,
341323492, 708429714, 474338408, 941599561, 735333275, 924141359, 462558353, 812516881, 226575752,
903292862, 671331768, 587010550, 884345134, 405129579, 857547593, 272287868, 77029916, 460931672,
217744905, 212092169, 59506435, 577642167, 182872262, 703610925, 807848817, 670965493, 686394594,
675707325, 290148994, 346116146, 196791350, 179804602, 975400970, 104251286, 921543457, 585194838,
439362826, 234151782, 853604314, 399261420, 862456079, 530718787, 530112900, 550491402, 447199723,
540738859, 995874827, 263959027, 922574814, 592421884, 743487279, 789704660, 43527480, 650165270,
813898827, 647088442, 883237102, 318123528, 995060766, 975291058, 17590247, 221649480, 914489190,
48910736, 295730956, 406664491, 709883862, 434959132, 241836357, 754401099, 473127731, 629473221,
884533446, 337518131, 516198840, 894704821, 364159417, 309389547, 87441726, 677079127, 244874555,
612717186, 384833662, 197754750, 646981591, 850158413, 34442408, 384820994, 408472150, 451762882,
35297257, 460428625, 598811831, 796246925, 381749377, 575026500, 509085906, 396640342, 603765501,
725894454, 184640754, 129191380, 516716279, 722941264, 337603642, 906720408, 188363498, 314504338,
737099499, 870758967, 427074265, 540496099, 287688439, 229037282, 179508261, 811095190, 793405716,
734249595, 800430879, 959832649, 499013980, 22980399, 966297297, 336499207, 565771810, 783544115,
845553526, 126065378, 324600403, 988378465, 955767925, 308872964, 624222272, 550092662, 338515289,
232405377, 127960257, 756198385, 164730937, 76072793, 836127779, 56035676, 789861484, 882082562,
906734961, 38064985, 745067423, 398849268, 192666964, 82594625, 512462105, 434204803, 299941585,
914078932, 491178496, 964780009, 892775925, 804589750, 991548373, 514960916, 282956180, 653202440,
549353600, 440183911, 597587441, 125204269, 355851614, 666048368, 185488770, 550131648, 596167318,
385065306, 747974294, 593883333, 609606698, 9325350, 604458247, 291163843, 814481562, 109817803,
412897964, 366523601, 876187173, 988388858, 677586602, 913885850, 526788584, 707036239, 777867492,
496057824, 280179669, 339729283, 992783060, 40420732, 12511798, 69886548, 132197579, 785599223,
295848958, 69918318, 621889109, 579463216, 516616092, 348125679, 655674596, 480084650, 363777841,
717434542, 819469776, 605198399, 585327599, 463147386, 997437782, 171513726, 924701444, 286282776,
435106407, 924495633, 283156902, 396320166, 721936012, 520321710, 768995648, 427663054, 424454762,
356319981, 570900199, 898035308, 778115177, 103566262, 551414660, 169988710, 466802337, 359655165,
102845644, 575934907, 956056321, 920073049, 362101393, 147152716, 979600484, 430224044, 314109051,
581154518, 918896510, 644888227, 618052576, 192729901, 696393158, 393838391, 119332958, 969794037,
854515818, 489865451, 496522757, 344743707, 474316888, 438989415, 769450509, 937243289, 63033571,
45726814, 599787303, 583381819, 144006136, 894002257, 50877812, 841760621, 848254796, 185381597,
321004230, 983679347, 479866836, 296079000, 808796614, 464630242, 958481660, 755730182, 988039972,
555421405, 884650234, 516973077, 913488909, 874523546, 870626989, 576502700, 459186318, 803864819,
68999166, 239990028, 476259565, 69904853, 479905296, 405486222, 152823113, 165996175, 325031921,
234415820, 297457842, 116896727, 330919099, 825444982, 581812699, 586007531, 41956580, 915441778,
467895741, 766187168, 46712466, 551536726, 578934422, 926579366, 92795208, 402614106, 479484272,
305715103, 974371079, 819711340, 733893336, 339942316, 782781898, 899735448, 60121880, 358097669,
655948484, 220493634, 206848006, 209880249, 734882234, 216495503, 19759070, 719220509, 73959763,
831929820, 495610456, 473735351, 717811165, 617389903, 767911872, 400907291, 580762803, 943276872,
909503185, 260920590, 31022601, 314992591, 64154150, 184325971, 508408375, 301199974, 976897491,
671121894, 241869763, 592424694, 474413723, 862693075]

```

