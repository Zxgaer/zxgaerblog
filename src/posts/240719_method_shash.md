---
title: 【例题1】字符串哈希 的另一种做法
description: set
date: 2024-07-19
---

标答用的Hash，但我觉得STL厉害，我用set  

```cpp
#include<iostream>
#include<set>
using namespace std;
int n;
string a;
set<string> s;
int main() {
    scanf("%d",&n);
    while(n--) {cin>>a;s.insert(a);}
    cout << s.size();
}
```