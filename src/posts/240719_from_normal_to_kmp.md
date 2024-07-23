---
title: 从暴力枚举到KMP算法
description: 从暴力枚举到KMP算法
date: 2024-07-19
---

**例1** 给定两个字符串 $S1$ 和 $S2$，$S2$是$S1$的子串，输出$S2$在$S1$中所有的起始下标  

**输入样例**  
```
cookcow
cow
```
**输出样例**  
```
4
```
### 暴力枚举（朴素算法）
从S2第一位开始匹配S1中的每一位，直到整个S2匹配上，输出结果  
   
$i=0,j=0$ c匹配c  
$i=0,j=1$ o匹配o  
$i=0,j=2$ o不匹配w
|c|o|o|k|c|o|w|  
| - | - | - | - | - | - | - |
|c|o|w|||||

$i=1,j=0$ o不匹配c
|c|o|o|k|c|o|w|  
| - | - | - | - | - | - | - |
||c|o|w||||

$i=2,j=0$ o不匹配c
|c|o|o|k|c|o|w|  
| - | - | - | - | - | - | - |
|||c|o|w|||

$i=3,j=0$ k不匹配c
|c|o|o|k|c|o|w|  
| - | - | - | - | - | - | - |
||||c|o|w||

$i=4,j=0$ c匹配c  
$i=4,j=1$ o匹配o  
$i=4,j=2$ w匹配w
|c|o|o|k|c|o|w|  
| - | - | - | - | - | - | - |
|||||c|o|w|

若$S1$串长度为m，$S2$串长度为n，最好情况下$S1$开头就对上$S2$，此时时间复杂度为$O(n)$，最坏情况下$S1$末尾对上$S2$，且$S1$串每隔$n-1$字符就与$S2$不匹配，则时间复杂度为$O((n-m+1)*m)$  

代码如下：

```c++
int findSubstr(string stra,string strb) {
    int i=0,j=0;
    while(i<stra.size()&&j<strb.size()) {
        if(stra[i]==strb[j]) i++,j++;
        else i=i-j+1,j=0;
    }
    if(j>=strb.size()) return i-j;
    else return -1;  //-1是匹配失败的标志
}
```

### 下面来看看暴力枚举的缺点

注意到，当主串的co匹配子串的co,而主串的o与子串的w失配时，主串检索下标增加一，而我们发现，如果\[coo\]kcow与\[cow\]匹配，那么c\[ook\]cow绝对不可能与\[cow\]匹配的，因为两个字符串的首字母不相同，更好的思路是当发现$c$不能匹配的时候，从主串下一次出现$c$的位置开始匹配，进而推广到前缀和后缀

### 从暴力匹配到KMP算法

暴力匹配的缺点就是主串和子串需要一个一个字符判断，为了解决这个问题，KMP算法引入了`前缀表`，通过预处理子串，实现遇到失配情况时合理回退  
  
**前缀表的计算方法大致如下：**  
设字符串$S=zxxzxzg$  
子串$S1=z$，无前缀和后缀，则$d[1]=0$  
子串$S2=zx$，无相同前缀和后缀，则$d[2]=0$  
子串$S3=zxx$，无相同前缀和后缀，则$d[3]=0$  
子串$S4=zxxz$,相同前后缀为$z$，则$d[4]=1$  
子串$S5=zxxzx$，相同前后缀为$zx$，则$d[5]=2$  
子串$S6=zxxzxz$，相同前后缀为$z$，则$d[6]=1$  
子串$S7=zxxzxzg$，无相同前缀和后缀，则$d[7]=0$  

```cpp
void getnext(string p) {
	int lenp=p.size();
	nextt[0]=-1;
	int k=-1,j=0;
	while(j < lenp-1) {
		if(k==-1||p[j]==p[k]) {
			j++,k++;
			if(p[j]!=p[k]) nextt[j]=k;
			else nextt[j]=nextt[k];
		}
		else k=nextt[k];
	}
	return;
}

```

```cpp
int KMP(string s,string p) {
	int i=0,j=0;
	int lens=s.size(),lenp=p.size();
	while(i<lens&&j<lenp) {
		if(j==-1||s[i]==p[j]) j++,i++;
		else j=nextt[j];
	}
    return j==lenp;
}

```


> KMP算法，百度搜索，细心体会（byd一本通