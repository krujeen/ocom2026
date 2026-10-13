# บทที่ 1 STL Algorithm, vector และ pair
สอวน. ค่าย 1 วิชาคอมพิวเตอร์ | ภาษา C++ | ไฟล์โค้ด: `01_stl_algorithm.cpp`

## เป้าหมายการเรียนรู้
เมื่อจบบทนี้ นักเรียนสามารถ
- ใช้ฟังก์ชันคณิตศาสตร์ (`cmath`) และเทคนิคจำนวนเต็มที่โจทย์ math ใช้บ่อย: ปัดเศษ, mod, ยกกำลัง, รากที่สอง, จำนวนเฉพาะ, บิต
- ใช้ `vector` ได้ครบ: สร้าง, `push_back`/`pop_back`, `insert`, `erase`, `resize`, วนอ่าน/แก้ค่า, ส่งเข้าฟังก์ชัน และ vector 2 มิติ
- เรียงข้อมูลด้วย `sort` ทั้งแบบปกติและแบบกำหนดฟังก์ชันเปรียบเทียบเอง
- ใช้ `reverse`, `count`, `find`, `max`, `min`, `swap`, `gcd`, `lcm` แทนการเขียนเอง
- รวมผลรวม เติมค่า ตัดค่าซ้ำ ค้นหาแบบทวิภาค และสร้างการเรียงสับเปลี่ยนด้วย STL
- ใช้ `pair` และ `vector<pair<...>>` เก็บข้อมูลที่มีสองส่วน และเรียงตามเงื่อนไขที่ต้องการ
- หลีกเลี่ยงข้อผิดพลาดที่พบบ่อย (ล้นช่วงของ `int`, `size()` ที่เป็นเลขไม่มีเครื่องหมาย, ลบสมาชิกระหว่างวนลูป ฯลฯ)

**หลักคิดสำคัญ:** ใช้ไลบรารีแทนการเขียนเอง เพราะสั้นกว่า เร็วกว่า และผ่านการทดสอบมาแล้ว ทำให้ผิดพลาดน้อยลง

## สิ่งที่ต้องใส่ที่หัวโปรแกรม
```cpp
#include <bits/stdc++.h>   // รวมไลบรารีมาตรฐานทั้งหมด (ใช้ได้ใน g++)
using namespace std;
```
คอมไพล์ด้วย `g++ -std=c++17` เพราะ `gcd` และ `lcm` อยู่ใน C++17

## ตารางสรุปเครื่องมือของบทนี้ (ดูก่อนเริ่ม)
| งาน | เครื่องมือ | หมายเหตุ |
|---|---|---|
| เพิ่ม/ลบท้าย vector | `push_back`, `pop_back` | เช็ค `empty()` ก่อน `pop_back`/`back` |
| แทรก / ลบตำแหน่งใดก็ได้ | `insert(it, x)`, `erase(it)` | O(n) |
| ลบตามค่า/เงื่อนไข | `erase(remove(...), end)` / `remove_if` | ต้องคู่กับ `erase` |
| เรียงน้อย→มาก | `sort(b, e)` | |
| เรียงมาก→น้อย | `sort(b, e, greater<int>())` | หรือ comparator / lambda |
| กลับลำดับ | `reverse(b, e)` | |
| นับ / ค้นหา | `count`, `find` | ไม่เจอ `find` คืน `end()` |
| มาก/น้อยสุด 2-3 ค่า | `max(a,b)`, `max({a,b,c})` | |
| มาก/น้อยสุดใน vector | `*max_element`, `*min_element` | คืน iterator ต้องใส่ `*` |
| ตัวหารร่วมมาก / คูณร่วมน้อย | `gcd(a,b)`, `lcm(a,b)` | ค่าใหญ่ใช้ `long long` |
| ผลรวม | `accumulate(b, e, 0LL)` | ใช้ `0LL` กันล้น |
| เติมค่า | `fill`, `iota` | |
| ตัดค่าซ้ำ | `sort` + `erase(unique(...))` | |
| ค้นหาในข้อมูลที่เรียงแล้ว | `lower_bound`, `upper_bound`, `binary_search` | O(log n) |
| สลับค่า | `swap(a,b)` | |
| ฟังก์ชัน math | `sqrt`, `pow`, `floor`, `ceil`, `round`, `log`, `fmod` | ดูหัวข้อ 10 |
| จำนวนเต็มแบบปลอดภัย | `ipow`, `powmod`, `isqrt`, `ceildiv`, `posmod` | ฟังก์ชันช่วยในโค้ด |
| ไล่ทุกการเรียงสับเปลี่ยน | `next_permutation` | |

---

## ทบทวน vector (เครื่องมือหลักที่ใช้ทุกโจทย์)
`vector` คืออาร์เรย์ที่ **ขนาดเปลี่ยนได้** เข้าถึงด้วย `v[i]` ได้เร็ว O(1) และจัดการหน่วยความจำให้เอง

### สร้าง vector
| แบบ | ความหมาย | ผลลัพธ์ |
|---|---|---|
| `vector<int> a;` | ว่าง | (ไม่มีสมาชิก) |
| `vector<int> b(5);` | 5 ตัว ค่าเริ่ม 0 | `0 0 0 0 0` |
| `vector<int> c(3, 7);` | 3 ตัว ค่า 7 | `7 7 7` |
| `vector<int> d = {4, 8, 15};` | กำหนดค่าตรง ๆ | `4 8 15` |

กรณีรู้ขนาดล่วงหน้า (เช่น อ่าน n ตัว) ให้ประกาศ `vector<int> v(n);` แล้วอ่านใส่ `v[i]` ได้เลย

### เพิ่ม / ลบที่ท้าย (เร็ว O(1))
```cpp
a.push_back(10);   a.push_back(20);   a.push_back(30);   // 10 20 30
a.front();         // 10  ตัวแรก
a.back();          // 30  ตัวท้าย
a.size();          // 3
a.empty();         // false
a.pop_back();      // ลบตัวท้าย ได้ 10 20 (pop_back ไม่คืนค่า)
```
- `back()`, `front()`, `pop_back()` ตอน vector **ว่าง** ทำให้โปรแกรมพัง ต้องเช็ค `empty()` ก่อน
- vector ใช้เป็น **stack** ได้ ด้วย `push_back` / `back` / `pop_back`

### เข้าถึงสมาชิก: `[]` กับ `at()`
```cpp
a[0] = 99;          // เร็ว แต่ไม่ตรวจขอบเขต (index เกิน = พฤติกรรมไม่แน่นอน)
a.at(5) = 1;        // ตรวจขอบเขต ถ้าเกินจะ throw out_of_range
```
ใช้ `at()` ช่วยหาข้อผิดพลาดตอนเขียนโปรแกรม ใช้ `[]` ตอนส่งข้อสอบเพราะเร็วกว่า

### insert (แทรก): ระบุตำแหน่งด้วย iterator
```cpp
a.insert(a.begin(), 5);                 // แทรกหน้าสุด
a.insert(a.begin() + 2, 3, 0);          // แทรกเลข 0 จำนวน 3 ตัวที่ index 2
a.insert(a.end(), e.begin(), e.end());  // ต่อท้ายด้วยช่วงจาก vector อื่น
```
ตำแหน่ง index i เขียนเป็น `a.begin() + i` ค่าที่แทรกจะอยู่ **ก่อน** ตำแหน่งนั้น ใช้เวลา O(n) เพราะต้องเลื่อนสมาชิก

### erase (ลบ): ระบุตำแหน่งด้วย iterator
```cpp
a.erase(a.begin());                       // ลบตัวแรก
a.erase(a.begin() + 1, a.begin() + 4);    // ลบช่วง [1,4)  คือ index 1,2,3 (ไม่รวม 4)
```
ช่วง `[first, last)` ไม่รวม `last` เสมอ ใช้เวลา O(n)

### ลบตามค่าหรือเงื่อนไข: erase + remove
```cpp
f.erase(remove(f.begin(), f.end(), 3), f.end());   // ลบทุกตัวที่เป็น 3
g.erase(remove_if(g.begin(), g.end(),
        [](int x) { return x % 2 == 0; }), g.end());   // ลบเลขคู่ทั้งหมด
```
ต้องใช้ `remove` คู่กับ `erase` เสมอ (เหมือน `unique`) เพราะ `remove` อย่างเดียวไม่ลดขนาด vector

### ลบระหว่างวนลูป (จุดที่พลาดบ่อย)
```cpp
for (auto it = h.begin(); it != h.end();) {
    if (*it % 3 == 0) it = h.erase(it);   // erase คืน iterator ตัวถัดไป
    else ++it;                            // ไม่ลบจึงค่อยเลื่อน
}
```
- หลัง `erase` iterator เดิมใช้ไม่ได้ ต้องรับค่าที่ `erase` คืนมา
- ห้ามเขียน `for (...; ++it)` แล้ว `erase(it)` ในลูปเดียวกัน
- วิธีที่ง่ายกว่าและไม่ผิดพลาด: ใช้ `remove_if` ตามหัวข้อก่อนหน้า

### เปลี่ยนขนาด / ล้าง
| คำสั่ง | ความหมาย |
|---|---|
| `r.resize(5)` | ขยายเป็น 5 ช่อง ช่องใหม่เป็น 0 (ถ้าเล็กลงจะตัดท้ายทิ้ง) |
| `r.resize(5, 9)` | ขยายเป็น 5 ช่อง ช่องใหม่เป็น 9 |
| `r.assign(4, 9)` | ล้างแล้วใส่ 9 จำนวน 4 ตัว |
| `r.clear()` | ลบทุกตัว (size = 0) |
| `r.reserve(n)` | จองที่ไว้ล่วงหน้า ช่วยให้ `push_back` เร็วขึ้น ไม่เปลี่ยน size |

### วนอ่านและวนแก้ค่า
```cpp
for (int x : t) x *= 10;            // x เป็น "สำเนา" ไม่แก้ตัวจริง
for (int &x : t) x *= 10;           // x เป็น reference แก้ตัวจริง
for (int i = 0; i < (int)t.size(); i++) t[i] += 1;   // วนด้วย index
```
- อยากแก้ค่า ต้องมี `&` ตรง `int &x`
- ถ้าสมาชิกเป็น `string` หรือ struct ใหญ่ ให้ใช้ `const auto &x` เพื่อไม่ต้องคัดลอก

### คัดลอก เปรียบเทียบ สลับ
```cpp
vector<int> copy1 = t;     // คัดลอกทั้งหมด แก้ copy1 ไม่กระทบ t
t == copy1;                // เปรียบเทียบทีละตัว ได้ true/false
swap(p1, p2);              // สลับทั้ง vector (เร็ว O(1))
```

### ส่ง vector เข้าฟังก์ชัน
```cpp
void addOneRef(vector<int> &x);    // reference: แก้ตัวเดิมได้ ไม่คัดลอก
void addOneCopy(vector<int> x);    // ส่งค่า: คัดลอกทั้งหมด แก้แล้วไม่กระทบตัวเดิม
void printAll(const vector<int> &x);   // อ่านอย่างเดียว ไม่คัดลอก (แนะนำ)
```
vector ขนาดใหญ่ **ห้ามส่งแบบค่า** ถ้าไม่จำเป็น เพราะคัดลอกทั้งหมดทุกครั้งที่เรียกฟังก์ชัน ทำให้ช้าจนเกินเวลา

### vector 2 มิติ
```cpp
int R = 3, C = 4;
vector<vector<int>> grid(R, vector<int>(C, 0));   // R แถว C คอลัมน์ ค่า 0
grid[1][2] = 5;                                    // แถว 1 คอลัมน์ 2
grid.size();       // จำนวนแถว = 3
grid[0].size();    // จำนวนคอลัมน์ = 4
```
ใช้แทนตาราง/ตารางกริด (เช่น โจทย์ BFS ในบทที่ 5) แต่ละแถวเป็น `vector<int>` หนึ่งตัว

### เวลาที่ใช้ของ vector
| การทำงาน | เวลา |
|---|---|
| `v[i]`, `front`, `back`, `size` | O(1) |
| `push_back`, `pop_back` | O(1) (เฉลี่ย) |
| `insert`, `erase` กลาง/หน้า | O(n) |
| `find`, `count` | O(n) |
| `sort` | O(n log n) |
| `clear`, `resize` | O(n) |

---

## 1) sort

### sort แบบปกติ
```cpp
vector<int> v = {5, 2, 9, 1, 5, 6};
sort(v.begin(), v.end());   // น้อย -> มาก   ได้ 1 2 5 5 6 9
```
- `v.begin()` ชี้ที่ตัวแรก, `v.end()` ชี้ **หลังตัวสุดท้าย** (ช่วงที่เรียงคือ `[begin, end)`)
- เวลา O(n log n)
- ใช้กับอาร์เรย์ธรรมดาได้ด้วย: `sort(a, a + n);`

### เรียงมากไปน้อยแบบสั้นที่สุด
```cpp
sort(v.begin(), v.end(), greater<int>());
```
ถ้าเก็บเป็น `long long` ให้ใช้ `greater<long long>()`

### sort พร้อมฟังก์ชันเปรียบเทียบ (comparator)
```cpp
bool cmpDesc(int a, int b) { return a > b; }
sort(v.begin(), v.end(), cmpDesc);   // มาก -> น้อย
```
**กฎของ comparator:** คืน `true` เมื่อ "a ควรอยู่ก่อน b" เท่านั้น
- ถ้า a เท่ากับ b ต้องคืน `false` (ใช้ `>` หรือ `<` ไม่ใช่ `>=` หรือ `<=`) ถ้าใช้ `>=` โปรแกรมอาจพังหรือค้างได้
- เทียบแบบหลายเงื่อนไข: เทียบตัวแรกก่อน ถ้าเท่ากันค่อยเทียบตัวถัดไป

```cpp
// คะแนนมาก -> น้อย ถ้าคะแนนเท่ากันเรียงชื่อ ก -> ฮ
bool cmpScore(const pair<string,int>& a, const pair<string,int>& b) {
    if (a.second != b.second) return a.second > b.second;
    return a.first < b.first;
}
```

### lambda (เขียน comparator ในบรรทัดเดียว)
```cpp
sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
```

---

## 2) reverse, count, find
| ฟังก์ชัน | ความหมาย | ตัวอย่าง |
|---|---|---|
| `reverse(b, e)` | กลับลำดับ | `reverse(v.begin(), v.end());` |
| `count(b, e, x)` | นับจำนวน x | `count(v.begin(), v.end(), 5)` ได้ 2 |
| `find(b, e, x)` | หา x ตัวแรก คืน iterator | ดูด้านล่าง |

```cpp
auto it = find(v.begin(), v.end(), 9);
if (it != v.end())                        // เจอ
    cout << "index = " << (it - v.begin());
else                                      // ไม่เจอ it == v.end()
    cout << "ไม่เจอ";
```
- ถ้าไม่เจอ `find` คืน `v.end()` ห้ามใช้ `*it` ตอนนั้น
- ตำแหน่ง (index) หาได้จาก `it - v.begin()`
- `find` และ `count` ทำงานแบบไล่ทีละตัว O(n)

---

## 3) max, min, swap
```cpp
max(a, b);   min(a, b);   swap(a, b);
max({a, b, 7});    // หาค่ามากสุดของหลายค่า ใส่ปีกกาครอบ
min({a, b, 7});
*max_element(v.begin(), v.end());   // ค่ามากสุดใน vector
*min_element(v.begin(), v.end());   // ค่าน้อยสุดใน vector
max_element(v.begin(), v.end()) - v.begin();   // ตำแหน่งของค่ามากสุด
```
- `max_element` คืน iterator จึงต้องใส่ `*` หน้าเพื่อเอาค่า ถ้าต้องการตำแหน่งให้ลบด้วย `v.begin()`
- `max(a, b)` ต้องเป็น **ชนิดเดียวกัน** เช่น `max(1, 2LL)` คอมไพล์ไม่ผ่าน ให้เขียน `max(1LL, 2LL)`
- ถ้ามีค่าเท่ากันหลายตัว `max_element` คืนตัวที่อยู่ **แรกสุด**

---

## 4) gcd และ lcm
| ฟังก์ชัน | ความหมาย | ตัวอย่าง |
|---|---|---|
| `gcd(a, b)` | ตัวหารร่วมมาก | `gcd(12, 18)` ได้ 6 |
| `lcm(a, b)` | ตัวคูณร่วมน้อย | `lcm(12, 18)` ได้ 36 |

ความสัมพันธ์ที่ควรจำ: `gcd(a,b) × lcm(a,b) = a × b`

```cpp
gcd(0, 7);    // 7   (gcd ของ 0 กับ x คือ x)
```

### gcd / lcm ของหลายตัว: ไล่สะสมทีละตัว
```cpp
vector<long long> w = {12, 18, 30};
long long g = 0, l = 1;          // ค่าเริ่มต้น g = 0, l = 1
for (long long x : w) {
    g = gcd(g, x);
    l = lcm(l, x);
}
// g = 6, l = 180
```
เหตุผลที่ค่าเริ่มต้นเป็น 0 และ 1: `gcd(0, x) = x` และ `lcm(1, x) = x` จึงไม่รบกวนผลลัพธ์

### ⚠️ lcm ล้นช่วงของ int ได้ง่ายมาก
lcm ของเลขสองตัวอาจใหญ่กว่าเลขทั้งสองมาก `int` เก็บได้ไม่เกินประมาณ 2.1 × 10⁹ เท่านั้น
```cpp
long long p = 1000000000LL, q = 999999999LL;
lcm(p, q);              // 999999999000000000  (ต้องเป็น long long)
p / gcd(p, q) * q;      // ถ้าเขียนเอง ให้ "หารก่อนคูณ" เพื่อลดโอกาสล้น
```
- ใช้ `long long` กับทั้ง `gcd` และ `lcm` ถ้าค่าอาจใหญ่
- ถ้าเขียนสูตรเอง ห้ามเขียน `a * b / gcd(a, b)` เพราะ `a * b` ล้นก่อน ให้เขียน `a / gcd(a, b) * b`
- การล้นของ `int` ไม่ขึ้น error แต่ได้ค่าผิดเงียบ ๆ จึงตรวจเจอยาก

---

## 5) accumulate, fill, iota
```cpp
vector<int> big(3, 2000000000);                      // สามตัว ตัวละ 2 พันล้าน
long long sum = accumulate(big.begin(), big.end(), 0LL);   // 6000000000
```
- ค่าที่สามของ `accumulate` คือ **ค่าเริ่มต้นและกำหนดชนิดของผลรวม**
- ใส่ `0` (ชนิด `int`) ผลรวมจะล้น ต้องใส่ `0LL` เมื่อข้อมูลเยอะหรือค่าใหญ่

```cpp
vector<int> z(5);
fill(z.begin(), z.end(), 7);      // 7 7 7 7 7   เติมทุกช่องด้วยค่าเดียว
iota(z.begin(), z.end(), 1);      // 1 2 3 4 5   เติมเลขเรียง เริ่มที่ 1
```

---

## 6) ตัดค่าซ้ำด้วย sort + unique
```cpp
vector<int> d = {3, 1, 3, 2, 1, 9};
sort(d.begin(), d.end());                        // 1 1 2 3 3 9   ต้อง sort ก่อนเสมอ
d.erase(unique(d.begin(), d.end()), d.end());    // 1 2 3 9
```
- `unique` ลบเฉพาะค่าซ้ำที่ **ติดกัน** จึงต้อง `sort` ก่อน
- `unique` ไม่ลดขนาด vector จริง แค่ย้ายค่าที่ไม่ซ้ำมาไว้หน้า ต้องใช้ `erase` ต่อท้ายเสมอ
- จำนวนค่าที่ไม่ซ้ำ = `d.size()` หลัง `erase`

---

## 7) ค้นหาแบบทวิภาค (ใช้ได้เมื่อข้อมูลเรียงแล้วเท่านั้น)
```cpp
vector<int> s = {1, 2, 5, 5, 6, 9};
auto lo = lower_bound(s.begin(), s.end(), 5);   // ตัวแรกที่ >= 5  -> index 2
auto hi = upper_bound(s.begin(), s.end(), 5);   // ตัวแรกที่ >  5  -> index 4
hi - lo;                                         // จำนวนของ 5 = 2
binary_search(s.begin(), s.end(), 6);            // true/false ว่ามี 6 หรือไม่
```
| ฟังก์ชัน | ได้อะไร |
|---|---|
| `lower_bound(b,e,x)` | ตำแหน่งแรกที่ค่า **≥ x** |
| `upper_bound(b,e,x)` | ตำแหน่งแรกที่ค่า **> x** |
| `binary_search(b,e,x)` | มี x หรือไม่ (true/false) |

- เวลา O(log n) เร็วกว่า `find` ที่เป็น O(n) มาก
- **ข้อมูลต้องเรียงแล้ว** ถ้าไม่เรียง ผลลัพธ์ผิด
- ผลของ `lower_bound` อาจเป็น `end()` (ไม่มีค่าที่ ≥ x) ต้องเช็คก่อนใช้ `*`

---

## 8) next_permutation (ไล่การเรียงสับเปลี่ยน)
```cpp
vector<int> perm = {1, 2, 3};      // ต้องเริ่มจากเรียงน้อย -> มาก
do {
    // ใช้ perm ตรงนี้
} while (next_permutation(perm.begin(), perm.end()));
```
ได้ครบ 6 แบบ: `123, 132, 213, 231, 312, 321` และ **ต้องเริ่มจากลำดับที่เรียงน้อยไปมากก่อน** (ถ้าไม่เรียงจะข้ามบางแบบ)

---

## 9) ระวัง: `size()` เป็นเลขไม่มีเครื่องหมาย
```cpp
vector<int> empty;
empty.size() - 1;          // 18446744073709551615  (ไม่ใช่ -1 !)
(int)empty.size() - 1;     // -1
```
- `v.size()` คือชนิดไม่มีเครื่องหมาย ลบแล้วติดลบจะวนกลับไปเป็นเลขใหญ่มาก
- ลูป `for (int i = 0; i <= v.size() - 1; i++)` จะวนเกินขอบเมื่อ `v` ว่าง
- แก้โดยแปลงเป็น `int` ก่อน หรือเขียนเงื่อนไขเป็น `i + 1 < v.size()` / `i < (int)v.size()`

---

## 10) ฟังก์ชันคณิตศาสตร์ (`cmath`) สำหรับโจทย์ math
`#include <bits/stdc++.h>` รวม `<cmath>` ให้แล้ว ฟังก์ชันส่วนใหญ่ทำงานกับ `double` ถ้าเป็นโจทย์จำนวนเต็มต้องระวังความคลาดเคลื่อน (ดูหัวข้อ "เทคนิคจำนวนเต็ม")

### ตารางฟังก์ชันที่ใช้บ่อย
| งาน | คำสั่ง | ตัวอย่าง | หมายเหตุ |
|---|---|---|---|
| ค่าสัมบูรณ์ (จำนวนเต็ม) | `abs(x)` / `llabs(x)` | `abs(-5)` = 5 | `long long` ใช้ `llabs` |
| ค่าสัมบูรณ์ (ทศนิยม) | `fabs(x)` | `fabs(-2.5)` = 2.5 | |
| รากที่สอง | `sqrt(x)` | `sqrt(16.0)` = 4 | คืน `double` |
| รากที่สาม | `cbrt(x)` | `cbrt(27.0)` = 3 | |
| ยกกำลัง | `pow(a, b)` | `pow(2, 10)` = 1024 | คืน `double` ระวังจำนวนเต็มใหญ่ |
| ปัดลง | `floor(x)` | `floor(-2.5)` = -3 | ไปทางลบอนันต์ |
| ปัดขึ้น | `ceil(x)` | `ceil(-2.5)` = -2 | ไปทางบวกอนันต์ |
| ปัดใกล้สุด | `round(x)` | `round(2.5)` = 3, `round(-2.5)` = -3 | .5 ปัดออกจาก 0 |
| ตัดทศนิยมทิ้ง | `trunc(x)` | `trunc(-2.5)` = -2 | เข้าหา 0 |
| เศษของทศนิยม | `fmod(a, b)` | `fmod(7.5, 2)` = 1.5 | `%` ใช้กับ `double` ไม่ได้ |
| e ยกกำลัง | `exp(x)` | `exp(1)` = 2.7183 | |
| ลอการิทึม | `log(x)`, `log2(x)`, `log10(x)` | `log2(1024)` = 10 | |
| ด้านตรงข้ามมุมฉาก | `hypot(x, y)` | `hypot(3, 4)` = 5 | |
| ตรีโกณ | `sin`, `cos`, `tan`, `atan2(y,x)` | | หน่วยเป็น **เรเดียน** |
| ค่า π | `acos(-1.0)` | 3.14159... | |
| จำกัดช่วง | `clamp(x, lo, hi)` | `clamp(15, 0, 10)` = 10 | C++17 |

หมายเหตุ: ตรีโกณใช้เรเดียน แปลงองศา → เรเดียน: `องศา * π / 180`

### ปัดเศษ: เทียบกันให้ชัด
| x | floor | ceil | round | trunc |
|---|---|---|---|---|
| 2.5 | 2 | 3 | 3 | 2 |
| -2.5 | -3 | -2 | -3 | -2 |
| 2.4 | 2 | 3 | 2 | 2 |
| -2.4 | -3 | -2 | -2 | -2 |

- แปลง `double` เป็น `int` ด้วย `(int)x` คือ **trunc** (ตัดทิ้งเข้าหา 0) ไม่ใช่ปัดใกล้สุด `(int)2.9` = 2, `(int)-2.9` = -2
- ต้องการปัดใกล้สุดเป็นจำนวนเต็ม ให้ใช้ `(long long)round(x)`

### การหารและเศษของจำนวนเต็ม
```cpp
7 / 2        // 3     หารจำนวนเต็มได้จำนวนเต็ม (ตัดเศษทิ้ง)
7 / 2.0      // 3.5   ถ้ามีตัวใดเป็น double ผลเป็น double
(double)7 / 2   // 3.5
-7 / 2       // -3    ปัดเข้าหา 0 (ไม่ใช่ -4)
-7 % 2       // -1    เศษมีเครื่องหมายตามตัวตั้ง
```
**ค่าเฉลี่ยผิดบ่อย:** `sum / n` เมื่อทั้งสองเป็น `int` จะได้จำนวนเต็ม ให้เขียน `(double)sum / n`

### เทคนิคจำนวนเต็ม (ฟังก์ชันช่วยที่เตรียมไว้ในโค้ด)
| ฟังก์ชัน | ทำอะไร | ทำไมไม่ใช้ของสำเร็จรูป |
|---|---|---|
| `ipow(a, b)` | a ยกกำลัง b แบบจำนวนเต็ม | `pow` คืน `double` เก็บจำนวนเต็มแม่นยำได้ถึงประมาณ 9×10¹⁵ เท่านั้น |
| `powmod(a, b, m)` | (aᵇ) mod m แบบเร็ว O(log b) | ไม่มีใน STL |
| `isqrt(n)` | รากที่สองจำนวนเต็ม (ปัดลง) | `sqrt` ของค่าใหญ่ใกล้กำลังสองสมบูรณ์ปัดผิดได้ |
| `ceildiv(a, b)` | หารปัดขึ้น | เขียนสูตร `(a + b - 1) / b` ให้ถูกทุกครั้ง |
| `posmod(a, m)` | mod ที่ได้ 0..m-1 เสมอ | `%` ของค่าติดลบได้ค่าติดลบ |
| `isPrime(n)` | ตรวจจำนวนเฉพาะ O(√n) | ไม่มีใน STL |
| `digitSum(n)` | ผลบวกหลัก | ใช้ซ้ำบ่อย |
| `countDivisors(n)` | จำนวนตัวหาร O(√n) | ระวังนับซ้ำเมื่อ i·i = n |

```cpp
ipow(3, 5);                  // 243
isqrt(99);                   // 9      isqrt(100) = 10
ceildiv(7, 2);               // 4
posmod(-7, 3);               // 2      (-7 % 3 ได้ -1)
powmod(2, 10, 1000);         // 24     (1024 mod 1000)
powmod(3, 200, 1000000007);  // 136318165
```

**ตัวอย่างที่ `pow` / `sqrt` ให้ค่าผิดจริง (ทดสอบแล้ว)**
```cpp
(long long)pow(3, 35);                 // 50031545098999704   แต่ค่าจริง 50031545098999707
(long long)pow(7, 22);                 // 3909821048582988288 แต่ค่าจริง 3909821048582988049
(long long)sqrt((double)(1000000000000000000LL - 1));   // 1000000000  แต่ค่าจริง 999999999
```
`pow(10, 18)` บังเอิญได้ค่าถูก แต่ไม่ควรไว้ใจ ให้ใช้ `ipow` / `isqrt` กับจำนวนเต็มเสมอ

**ตัวอย่างที่ใช้บ่อย: ตรวจกำลังสองสมบูรณ์**
```cpp
long long r = isqrt(n);
bool ok = (r * r == n);      // ไม่ใช้ sqrt ตรง ๆ เพราะเทียบ double ไม่ปลอดภัย
```

### ทศนิยม: การเทียบและการแสดงผล
```cpp
0.1 + 0.2 == 0.3                 // false !  ทศนิยมเก็บแบบประมาณ
fabs(0.1 + 0.2 - 0.3) < 1e-9     // true     เทียบด้วยค่าคลาดเคลื่อนเล็ก ๆ (eps)
```
```cpp
cout << fixed << setprecision(2) << x;   // แสดงทศนิยม 2 ตำแหน่ง เช่น 3.14
printf("%.3f\n", x);                      // แบบ C   เช่น 0.667
```
- ห้ามใช้ `==` เทียบ `double` ให้ใช้ `fabs(a - b) < eps`
- `setprecision` ต้องใช้คู่กับ `fixed` ถึงจะนับเป็นจำนวนตำแหน่งทศนิยม
- ต้องการความแม่นยำสูงขึ้น ใช้ `long double`

### ขอบเขตของชนิดข้อมูลที่ต้องจำ
| ชนิด | ช่วงโดยประมาณ | ตัวอย่างค่าสูงสุด |
|---|---|---|
| `int` | ± 2.1 × 10⁹ | `INT_MAX` = 2147483647 |
| `long long` | ± 9.2 × 10¹⁸ | `LLONG_MAX` = 9223372036854775807 |

- ผลคูณของ `int` สองตัวต้องแปลงเป็น `long long` **ก่อนคูณ**: `(long long)a * b` (ไม่ใช่ `(long long)(a * b)` เพราะล้นไปแล้ว)
- 20! = 2432902008176640000 ยังใส่ `long long` ได้ แต่ 21! ล้น
- ผลบวก 1 ถึง n = `n * (n + 1) / 2` เมื่อ n = 10⁹ ได้ 500000000500000000 ต้องใช้ `long long`
- `abs(INT_MIN)` ล้น (ไม่มีค่าบวกที่ตรงกันใน `int`)

### บิตที่ใช้บ่อย
| คำสั่ง | ความหมาย | ตัวอย่าง |
|---|---|---|
| `1 << k` | 2 ยกกำลัง k | `1 << 10` = 1024 (ค่าใหญ่ใช้ `1LL << k`) |
| `a & b`, `a \| b`, `a ^ b` | AND, OR, XOR | `12 & 10` = 8, `12 \| 10` = 14, `12 ^ 10` = 6 |
| `n & 1` | ตรวจคู่/คี่ | `7 & 1` = 1 (คี่) |
| `__builtin_popcount(n)` | นับบิต 1 | `popcount(255)` = 8 |
| `__lg(n)` | ตำแหน่งบิตสูงสุด = ⌊log₂ n⌋ | `__lg(1000)` = 9 |

---

## 11) ทบทวน pair และ vector<pair>
```cpp
pair<string,int> p = {"Aom", 95};
cout << p.first << ' ' << p.second;     // Aom 95
```
- `pair` เทียบกันในตัว: เทียบ `first` ก่อน ถ้าเท่ากันค่อยเทียบ `second`
- จึง `sort` `vector<pair<int,int>>` ได้โดยไม่ต้องเขียน comparator

```cpp
vector<pair<int,int>> pt = {{3,1},{1,9},{3,0},{1,2}};
sort(pt.begin(), pt.end());     // (1,2) (1,9) (3,0) (3,1)
```
เคล็ดลับ: ถ้าต้องการเรียงตามค่า second ให้สลับเป็น `pair<second, first>` หรือเขียน comparator

---

## โค้ดเต็มของบทนี้
```cpp
// ============================================================
// บทที่ 1: STL Algorithm + vector + pair
// ทบทวน vector (push/pop/insert/erase/resize/2D), pair
// sort (comparator), reverse, count, find, max, min, swap, gcd, lcm
// เพิ่มเติม: sum, unique, binary search, next_permutation
// ฟังก์ชัน math (cmath): abs sqrt pow floor ceil round mod log ฯลฯ + ฟังก์ชันช่วยโจทย์ math
// หลักคิด: ใช้ไลบรารีแทนการเขียนเอง เพื่อลดข้อผิดพลาด
// คอมไพล์: g++ -std=c++17 -O2
// ============================================================
#include <bits/stdc++.h>
using namespace std;

// ---------- comparator ----------
// คืน true ถ้า a ควรอยู่ "ก่อน" b
bool cmpDesc(int a, int b) { return a > b; }

// เรียงตามคะแนนมากไปน้อย ถ้าคะแนนเท่ากันเรียงตามชื่อ
bool cmpScore(const pair<string, int> &a, const pair<string, int> &b) {
    if (a.second != b.second) return a.second > b.second;
    return a.first < b.first;
}

// พิมพ์ vector (ใช้ซ้ำหลายครั้ง)
void show(const string &label, const vector<int> &v) {
    cout << label;
    for (int x : v) cout << x << ' ';
    cout << '\n';
}

// ส่งแบบ reference: แก้ vector เดิมได้ และไม่ต้องคัดลอก (เร็ว)
void addOneRef(vector<int> &x) {
    for (int &e : x) e++;
}
// ส่งแบบค่า: คัดลอกทั้ง vector แก้แล้วไม่กระทบตัวเดิม (ช้าถ้า vector ใหญ่)
void addOneCopy(vector<int> x) {
    for (int &e : x) e++;
}

// ============================================================
// ทบทวน vector
// ============================================================
void vectorReview() {
    cout << "=== ทบทวน vector ===\n";

    // ---- สร้าง vector ----
    vector<int> a;                    // ว่าง
    vector<int> b(5);                 // 0 0 0 0 0   (ห้าตัว ค่าเริ่ม 0)
    vector<int> c(3, 7);              // 7 7 7       (สามตัว ค่า 7)
    vector<int> d = {4, 8, 15};       // กำหนดค่าตรง ๆ
    show("b : ", b);
    show("c : ", c);
    show("d : ", d);

    // ---- push_back / pop_back / front / back / size ----
    a.push_back(10);
    a.push_back(20);
    a.push_back(30);
    show("push_back : ", a);
    cout << "front=" << a.front() << " back=" << a.back()
         << " size=" << a.size() << " empty=" << a.empty() << '\n';
    a.pop_back();                     // ลบตัวท้าย (ไม่คืนค่า)
    show("pop_back  : ", a);

    // ---- [] กับ at ----
    a[0] = 99;                        // เร็ว แต่ไม่ตรวจขอบเขต
    try {
        a.at(5) = 1;                  // ตรวจขอบเขต ถ้าเกินจะ throw
    } catch (out_of_range &) {
        cout << "at(5) นอกขอบเขต -> out_of_range\n";
    }

    // ---- insert (ตำแหน่งระบุด้วย iterator) ----
    a.insert(a.begin(), 5);                   // แทรกหน้าสุด
    a.insert(a.begin() + 2, 3, 0);            // แทรกเลข 0 จำนวน 3 ตัวที่ index 2
    vector<int> e = {1, 2};
    a.insert(a.end(), e.begin(), e.end());    // ต่อท้ายด้วยช่วงจาก vector อื่น
    show("insert    : ", a);

    // ---- erase ----
    a.erase(a.begin());                       // ลบตัวแรก
    a.erase(a.begin() + 1, a.begin() + 4);    // ลบช่วง [1,4) (ไม่รวม index 4)
    show("erase     : ", a);

    // ---- ลบตามค่า: erase + remove ----
    vector<int> f = {3, 1, 3, 2, 3, 5};
    f.erase(remove(f.begin(), f.end(), 3), f.end());          // ลบทุกตัวที่เป็น 3
    show("ลบค่า 3   : ", f);
    vector<int> g = {1, 2, 3, 4, 5, 6};
    g.erase(remove_if(g.begin(), g.end(), [](int x) { return x % 2 == 0; }), g.end());
    show("ลบเลขคู่  : ", g);

    // ---- ลบระหว่างวนลูป (ต้องใช้ค่าที่ erase คืนมา) ----
    vector<int> h = {1, 2, 3, 4, 5, 6};
    for (auto it = h.begin(); it != h.end();) {
        if (*it % 3 == 0) it = h.erase(it);   // erase คืน iterator ตัวถัดไป
        else ++it;
    }
    show("ลบหาร 3 ลงตัว : ", h);

    // ---- resize / assign / clear ----
    vector<int> r = {1, 2, 3};
    r.resize(5);                              // ขยายเป็น 5 ช่อง เติม 0
    show("resize(5)  : ", r);
    r.resize(2);                              // หดเหลือ 2 ช่อง
    show("resize(2)  : ", r);
    r.assign(4, 9);                           // ล้างแล้วใส่ 9 จำนวน 4 ตัว
    show("assign     : ", r);
    r.clear();                                // ลบทุกตัว
    cout << "หลัง clear size=" << r.size() << " empty=" << r.empty() << '\n';

    // ---- วนอ่าน / วนแก้ค่า ----
    vector<int> t = {1, 2, 3};
    for (int x : t) x *= 10;                  // x เป็นสำเนา ไม่แก้ตัวจริง
    show("range-for ธรรมดา (ไม่เปลี่ยน) : ", t);
    for (int &x : t) x *= 10;                 // x เป็น reference แก้ตัวจริง
    show("range-for แบบ & (เปลี่ยน)     : ", t);
    for (int i = 0; i < (int)t.size(); i++) t[i] += 1;   // วนด้วย index
    show("วนด้วย index +1                : ", t);

    // ---- คัดลอก / เปรียบเทียบ / สลับ ----
    vector<int> copy1 = t;                    // คัดลอกทั้งหมด (ไม่ใช่การอ้างอิง)
    copy1[0] = -1;
    cout << "t[0]=" << t[0] << " copy1[0]=" << copy1[0]
         << " เท่ากันหรือไม่=" << (t == copy1) << '\n';
    vector<int> p1 = {1, 2}, p2 = {3, 4, 5};
    swap(p1, p2);                             // สลับทั้ง vector O(1)
    show("p1 หลัง swap : ", p1);
    show("p2 หลัง swap : ", p2);

    // ---- ส่งเข้าฟังก์ชัน ----
    vector<int> k = {1, 2, 3};
    addOneCopy(k);
    show("addOneCopy (ไม่เปลี่ยน) : ", k);
    addOneRef(k);
    show("addOneRef  (เปลี่ยน)    : ", k);

    // ---- vector 2 มิติ ----
    int R = 3, C = 4;
    vector<vector<int>> grid(R, vector<int>(C, 0));   // R แถว C คอลัมน์ ค่า 0
    grid[1][2] = 5;                                   // แถว 1 คอลัมน์ 2
    grid[2][0] = 7;
    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) cout << grid[i][j] << ' ';
        cout << '\n';
    }
    cout << "จำนวนแถว=" << grid.size() << " จำนวนคอลัมน์=" << grid[0].size() << '\n';
    cout << '\n';
}

// ============================================================
// ฟังก์ชันช่วยสำหรับโจทย์ math (เขียนเองเพราะ cmath ไม่มีให้ หรือใช้แล้วเสี่ยงผิดพลาด)
// ============================================================

// ยกกำลังจำนวนเต็ม (ไม่ใช้ pow เพราะ pow คืน double อาจคลาดเคลื่อน)
long long ipow(long long a, int b) {
    long long r = 1;
    for (int i = 0; i < b; i++) r *= a;
    return r;
}

// ยกกำลังแบบ mod: (a^b) mod m แบบเร็ว O(log b)  (m ไม่เกินประมาณ 3e9)
long long powmod(long long a, long long b, long long m) {
    long long r = 1 % m;
    a %= m;
    while (b > 0) {
        if (b & 1) r = r * a % m;   // บิตล่างสุดเป็น 1 -> คูณเข้าไป
        a = a * a % m;              // ยกกำลังสองทุกรอบ
        b >>= 1;
    }
    return r;
}

// รากที่สองจำนวนเต็ม (ปัดลง) ไม่พึ่งความแม่นยำของ double
long long isqrt(long long n) {
    long long r = (long long)sqrtl((long double)n);
    while (r * r > n) r--;
    while ((r + 1) * (r + 1) <= n) r++;
    return r;
}

// หารปัดขึ้น สำหรับจำนวนเต็มบวก
long long ceildiv(long long a, long long b) { return (a + b - 1) / b; }

// mod ที่ได้ค่า 0..m-1 เสมอ แม้ a เป็นลบ
long long posmod(long long a, long long m) { return ((a % m) + m) % m; }

// ตรวจจำนวนเฉพาะ O(sqrt n)
bool isPrime(long long n) {
    if (n < 2) return false;
    for (long long i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}

// ผลบวกหลักของจำนวนเต็ม
int digitSum(long long n) {
    int s = 0;
    for (; n > 0; n /= 10) s += n % 10;
    return s;
}

// จำนวนตัวหาร O(sqrt n)
int countDivisors(long long n) {
    int c = 0;
    for (long long i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            c++;
            if (i != n / i) c++;     // คู่ตัวหาร n/i (ระวังนับซ้ำเมื่อ i*i == n)
        }
    }
    return c;
}

void mathReview() {
    cout << "=== ฟังก์ชันคณิตศาสตร์ ===\n";
    cout << fixed << setprecision(4);               // แสดงทศนิยม 4 ตำแหน่ง

    // ---- ค่าสัมบูรณ์ / รากที่สอง / ยกกำลัง ----
    cout << "abs(-5)=" << abs(-5) << " fabs(-2.5)=" << fabs(-2.5)
         << " llabs=" << llabs(-9000000000LL) << '\n';
    cout << "sqrt(16)=" << sqrt(16.0) << " sqrt(2)=" << sqrt(2.0)
         << " cbrt(27)=" << cbrt(27.0) << '\n';
    cout << "pow(2,10)=" << pow(2, 10) << " pow(2,0.5)=" << pow(2, 0.5) << '\n';
    cout << "ipow(3,5)=" << ipow(3, 5) << " ipow(10,18)=" << ipow(10, 18) << '\n';
    cout << "isqrt(99)=" << isqrt(99) << " isqrt(100)=" << isqrt(100)
         << " isqrt(10^18)=" << isqrt(1000000000000000000LL) << '\n';

    // ---- ปัดเศษ ----
    cout << "\nปัดเศษ    x:  2.5  -2.5   2.4   -2.4\n";
    double xs[] = {2.5, -2.5, 2.4, -2.4};
    cout << setprecision(0);
    cout << "floor    : ";
    for (double x : xs) cout << floor(x) << ' ';
    cout << "\nceil     : ";
    for (double x : xs) cout << ceil(x) << ' ';
    cout << "\nround    : ";
    for (double x : xs) cout << round(x) << ' ';
    cout << "\ntrunc    : ";
    for (double x : xs) cout << trunc(x) << ' ';
    cout << setprecision(4) << '\n';
    cout << "(long long)round(2.6)=" << (long long)round(2.6)
         << " (int)2.9=" << (int)2.9 << " (int)-2.9=" << (int)-2.9 << '\n';

    // ---- หารและเศษ ----
    cout << "\n7/2=" << 7 / 2 << " 7/2.0=" << 7 / 2.0 << " (double)7/2=" << (double)7 / 2 << '\n';
    cout << "-7/2=" << -7 / 2 << " -7%2=" << -7 % 2 << " (ปัดเข้าหา 0 / เศษติดลบ)\n";
    cout << "posmod(-7,3)=" << posmod(-7, 3) << " ceildiv(7,2)=" << ceildiv(7, 2)
         << " fmod(7.5,2)=" << fmod(7.5, 2) << '\n';

    // ---- exp / log / ตรีโกณ ----
    cout << "\nexp(1)=" << exp(1.0) << " log(e)=" << log(exp(1.0))
         << " log2(1024)=" << log2(1024.0) << " log10(1000)=" << log10(1000.0) << '\n';
    cout << "hypot(3,4)=" << hypot(3.0, 4.0) << " PI=" << acos(-1.0)
         << " sin(PI/2)=" << sin(acos(-1.0) / 2)
         << " atan2(1,1)*180/PI=" << atan2(1.0, 1.0) * 180 / acos(-1.0) << '\n';

    // ---- เทียบทศนิยม / รูปแบบแสดงผล ----
    cout << setprecision(2);
    cout << "\nทศนิยม 2 ตำแหน่ง: " << 3.14159 << " " << 2.0 / 3 << '\n';
    printf("printf %%.3f: %.3f\n", 2.0 / 3);
    cout << "0.1+0.2==0.3 ? " << (0.1 + 0.2 == 0.3) << "   |diff|<1e-9 ? "
         << (fabs(0.1 + 0.2 - 0.3) < 1e-9) << '\n';
    cout << defaultfloat << setprecision(6);

    // ---- ขอบเขตของชนิดข้อมูล ----
    cout << "\nINT_MAX=" << INT_MAX << " INT_MIN=" << INT_MIN << '\n';
    cout << "LLONG_MAX=" << LLONG_MAX << '\n';
    long long fact = 1;
    for (int i = 1; i <= 20; i++) fact *= i;       // 20! ยังใส่ long long ได้
    cout << "20! = " << fact << " (21! ล้น long long)\n";
    long long n = 1000000000LL;
    cout << "1+2+...+1e9 = " << n * (n + 1) / 2 << " (ต้องใช้ long long)\n";
    cout << "clamp(15,0,10)=" << clamp(15, 0, 10) << " clamp(-3,0,10)=" << clamp(-3, 0, 10) << '\n';

    // ---- ทฤษฎีจำนวน ----
    cout << "\npowmod(2,10,1000)=" << powmod(2, 10, 1000)
         << " powmod(3,200,1e9+7)=" << powmod(3, 200, 1000000007LL) << '\n';
    cout << "isPrime(97)=" << isPrime(97) << " isPrime(91)=" << isPrime(91)
         << " isPrime(1)=" << isPrime(1) << '\n';
    cout << "digitSum(12345)=" << digitSum(12345)
         << " countDivisors(36)=" << countDivisors(36)
         << " countDivisors(37)=" << countDivisors(37) << '\n';
    long long sq = 144;
    cout << "144 เป็นกำลังสองสมบูรณ์? " << (isqrt(sq) * isqrt(sq) == sq) << '\n';

    // ---- บิต ----
    cout << "\n1<<10=" << (1 << 10) << " 1LL<<40=" << (1LL << 40)
         << " 12&10=" << (12 & 10) << " 12|10=" << (12 | 10) << " 12^10=" << (12 ^ 10)
         << " popcount(255)=" << __builtin_popcount(255)
         << " __lg(1000)=" << __lg(1000) << " (7&1)=" << (7 & 1) << '\n';
    cout << '\n';
}

int main() {
    vectorReview();
    mathReview();

    // ---------- 1) sort ----------
    vector<int> v = {5, 2, 9, 1, 5, 6};
    sort(v.begin(), v.end());                       // น้อย -> มาก
    show("sort asc : ", v);

    sort(v.begin(), v.end(), cmpDesc);              // มาก -> น้อย (ฟังก์ชันเปรียบเทียบ)
    show("sort desc: ", v);

    sort(v.begin(), v.end(), [](int a, int b) { return a < b; });  // lambda
    show("lambda   : ", v);

    sort(v.begin(), v.end(), greater<int>());       // มาก -> น้อย แบบสั้นที่สุด
    show("greater  : ", v);

    // ---------- 2) reverse ----------
    reverse(v.begin(), v.end());
    show("reverse  : ", v);

    // ---------- 3) count / find ----------
    cout << "count(5) = " << count(v.begin(), v.end(), 5) << '\n';
    auto it = find(v.begin(), v.end(), 9);
    if (it != v.end())
        cout << "find(9) เจอที่ index " << (it - v.begin()) << '\n';
    if (find(v.begin(), v.end(), 100) == v.end())
        cout << "find(100) ไม่เจอ\n";

    // ---------- 4) max / min / swap ----------
    int a = 12, b = 18;
    cout << "max=" << max(a, b) << " min=" << min(a, b) << '\n';
    cout << "max 3 ค่า = " << max({a, b, 7}) << " min 3 ค่า = " << min({a, b, 7}) << '\n';
    swap(a, b);
    cout << "หลัง swap a=" << a << " b=" << b << '\n';
    cout << "max_element=" << *max_element(v.begin(), v.end())
         << " min_element=" << *min_element(v.begin(), v.end()) << '\n';
    cout << "ตำแหน่งค่ามากสุด = "
         << (max_element(v.begin(), v.end()) - v.begin()) << '\n';

    // ---------- 5) gcd / lcm ----------
    cout << "\n=== gcd / lcm ===\n";
    cout << "gcd(12,18)=" << gcd(12, 18) << " lcm(12,18)=" << lcm(12, 18) << '\n';
    cout << "gcd(0,7)=" << gcd(0, 7) << " (gcd ของ 0 กับ x คือ x)\n";

    // gcd / lcm ของหลายตัว: ไล่สะสมทีละตัว
    vector<long long> w = {12, 18, 30};
    long long g = 0, l = 1;                          // ค่าเริ่มต้น: g=0, l=1
    for (long long x : w) {
        g = gcd(g, x);
        l = lcm(l, x);
    }
    cout << "gcd ของ 12 18 30 = " << g << ", lcm = " << l << '\n';

    // lcm ค่าใหญ่: ต้องใช้ long long (int จะล้น)
    long long p = 1000000000LL, q = 999999999LL;
    cout << "lcm(1e9, 999999999) = " << lcm(p, q) << '\n';
    // ถ้าเขียนเอง ให้หารก่อนคูณ เพื่อลดโอกาสล้น: a / gcd(a,b) * b
    cout << "หารก่อนคูณ = " << p / gcd(p, q) * q << '\n';

    // ---------- 6) ผลรวม / เติมค่า ----------
    cout << "\n=== accumulate / fill / iota ===\n";
    vector<int> big(3, 2000000000);                  // สามตัว ตัวละ 2 พันล้าน
    long long sum = accumulate(big.begin(), big.end(), 0LL);   // 0LL สำคัญมาก
    cout << "ผลรวม = " << sum << '\n';              // 6000000000

    vector<int> z(5);
    fill(z.begin(), z.end(), 7);                     // 7 7 7 7 7
    show("fill : ", z);
    iota(z.begin(), z.end(), 1);                     // 1 2 3 4 5
    show("iota : ", z);

    // ---------- 7) ตัดค่าซ้ำด้วย sort + unique ----------
    cout << "\n=== unique ===\n";
    vector<int> d = {3, 1, 3, 2, 1, 9};
    sort(d.begin(), d.end());                        // ต้อง sort ก่อนเสมอ
    d.erase(unique(d.begin(), d.end()), d.end());    // unique ต้องคู่กับ erase
    show("ไม่ซ้ำ : ", d);

    // ---------- 8) ค้นหาแบบทวิภาค (ต้องเรียงแล้ว) ----------
    cout << "\n=== binary search ===\n";
    vector<int> s = {1, 2, 5, 5, 6, 9};
    auto lo = lower_bound(s.begin(), s.end(), 5);    // ตัวแรกที่ >= 5
    auto hi = upper_bound(s.begin(), s.end(), 5);    // ตัวแรกที่ > 5
    cout << "lower_bound(5) index " << (lo - s.begin())
         << ", upper_bound(5) index " << (hi - s.begin())
         << ", จำนวน 5 = " << (hi - lo) << '\n';
    cout << "binary_search(6) = " << binary_search(s.begin(), s.end(), 6)
         << ", binary_search(7) = " << binary_search(s.begin(), s.end(), 7) << '\n';

    // ---------- 9) next_permutation ----------
    cout << "\n=== next_permutation ===\n";
    vector<int> perm = {1, 2, 3};                    // ต้องเริ่มจากเรียงน้อย->มาก
    do {
        show("", perm);
    } while (next_permutation(perm.begin(), perm.end()));

    // ---------- 10) ระวัง size() ----------
    cout << "\n=== size() เป็นเลขไม่มีเครื่องหมาย ===\n";
    vector<int> empty;
    cout << "empty.size()-1 (แบบ unsigned) = " << empty.size() - 1 << '\n';
    cout << "(int)empty.size()-1 = " << (int)empty.size() - 1 << '\n';

    // ---------- 11) ทบทวน pair + vector<pair> ----------
    vector<pair<string, int>> stu = {
        {"Somchai", 80}, {"Aom", 95}, {"Bee", 80}, {"Chai", 70}};
    sort(stu.begin(), stu.end(), cmpScore);
    cout << "\nคะแนนเรียงมาก->น้อย\n";
    for (auto &pr : stu) cout << pr.first << ' ' << pr.second << '\n';

    // pair เปรียบเทียบในตัว: เทียบ first ก่อน แล้วค่อย second
    vector<pair<int, int>> pt = {{3, 1}, {1, 9}, {3, 0}, {1, 2}};
    sort(pt.begin(), pt.end());
    cout << "\nsort pair: ";
    for (auto &pr : pt) cout << '(' << pr.first << ',' << pr.second << ") ";
    cout << '\n';
    return 0;
}
```

## ผลลัพธ์ที่ได้จากการรัน
```
=== ทบทวน vector ===
b : 0 0 0 0 0 
c : 7 7 7 
d : 4 8 15 
push_back : 10 20 30 
front=10 back=30 size=3 empty=0
pop_back  : 10 20 
at(5) นอกขอบเขต -> out_of_range
insert    : 5 99 0 0 0 20 1 2 
erase     : 99 20 1 2 
ลบค่า 3   : 1 2 5 
ลบเลขคู่  : 1 3 5 
ลบหาร 3 ลงตัว : 1 2 4 5 
resize(5)  : 1 2 3 0 0 
resize(2)  : 1 2 
assign     : 9 9 9 9 
หลัง clear size=0 empty=1
range-for ธรรมดา (ไม่เปลี่ยน) : 1 2 3 
range-for แบบ & (เปลี่ยน)     : 10 20 30 
วนด้วย index +1                : 11 21 31 
t[0]=11 copy1[0]=-1 เท่ากันหรือไม่=0
p1 หลัง swap : 3 4 5 
p2 หลัง swap : 1 2 
addOneCopy (ไม่เปลี่ยน) : 1 2 3 
addOneRef  (เปลี่ยน)    : 2 3 4 
0 0 0 0 
0 0 5 0 
7 0 0 0 
จำนวนแถว=3 จำนวนคอลัมน์=4

=== ฟังก์ชันคณิตศาสตร์ ===
abs(-5)=5 fabs(-2.5)=2.5000 llabs=9000000000
sqrt(16)=4.0000 sqrt(2)=1.4142 cbrt(27)=3.0000
pow(2,10)=1024.0000 pow(2,0.5)=1.4142
ipow(3,5)=243 ipow(10,18)=1000000000000000000
isqrt(99)=9 isqrt(100)=10 isqrt(10^18)=1000000000

ปัดเศษ    x:  2.5  -2.5   2.4   -2.4
floor    : 2 -3 2 -3 
ceil     : 3 -2 3 -2 
round    : 3 -3 2 -2 
trunc    : 2 -2 2 -2 
(long long)round(2.6)=3 (int)2.9=2 (int)-2.9=-2

7/2=3 7/2.0=3.5000 (double)7/2=3.5000
-7/2=-3 -7%2=-1 (ปัดเข้าหา 0 / เศษติดลบ)
posmod(-7,3)=2 ceildiv(7,2)=4 fmod(7.5,2)=1.5000

exp(1)=2.7183 log(e)=1.0000 log2(1024)=10.0000 log10(1000)=3.0000
hypot(3,4)=5.0000 PI=3.1416 sin(PI/2)=1.0000 atan2(1,1)*180/PI=45.0000

ทศนิยม 2 ตำแหน่ง: 3.14 0.67
printf %.3f: 0.667
0.1+0.2==0.3 ? 0   |diff|<1e-9 ? 1

INT_MAX=2147483647 INT_MIN=-2147483648
LLONG_MAX=9223372036854775807
20! = 2432902008176640000 (21! ล้น long long)
1+2+...+1e9 = 500000000500000000 (ต้องใช้ long long)
clamp(15,0,10)=10 clamp(-3,0,10)=0

powmod(2,10,1000)=24 powmod(3,200,1e9+7)=136318165
isPrime(97)=1 isPrime(91)=0 isPrime(1)=0
digitSum(12345)=15 countDivisors(36)=9 countDivisors(37)=2
144 เป็นกำลังสองสมบูรณ์? 1

1<<10=1024 1LL<<40=1099511627776 12&10=8 12|10=14 12^10=6 popcount(255)=8 __lg(1000)=9 (7&1)=1

sort asc : 1 2 5 5 6 9 
sort desc: 9 6 5 5 2 1 
lambda   : 1 2 5 5 6 9 
greater  : 9 6 5 5 2 1 
reverse  : 1 2 5 5 6 9 
count(5) = 2
find(9) เจอที่ index 5
find(100) ไม่เจอ
max=18 min=12
max 3 ค่า = 18 min 3 ค่า = 7
หลัง swap a=18 b=12
max_element=9 min_element=1
ตำแหน่งค่ามากสุด = 5

=== gcd / lcm ===
gcd(12,18)=6 lcm(12,18)=36
gcd(0,7)=7 (gcd ของ 0 กับ x คือ x)
gcd ของ 12 18 30 = 6, lcm = 180
lcm(1e9, 999999999) = 999999999000000000
หารก่อนคูณ = 999999999000000000

=== accumulate / fill / iota ===
ผลรวม = 6000000000
fill : 7 7 7 7 7 
iota : 1 2 3 4 5 

=== unique ===
ไม่ซ้ำ : 1 2 3 9 

=== binary search ===
lower_bound(5) index 2, upper_bound(5) index 4, จำนวน 5 = 2
binary_search(6) = 1, binary_search(7) = 0

=== next_permutation ===
1 2 3 
1 3 2 
2 1 3 
2 3 1 
3 1 2 
3 2 1 

=== size() เป็นเลขไม่มีเครื่องหมาย ===
empty.size()-1 (แบบ unsigned) = 18446744073709551615
(int)empty.size()-1 = -1

คะแนนเรียงมาก->น้อย
Aom 95
Bee 80
Somchai 80
Chai 70

sort pair: (1,2) (1,9) (3,0) (3,1) 
```
ข้อสังเกต
- บรรทัด `reverse` ได้ `1 2 5 5 6 9` เพราะก่อนหน้านั้น vector เรียงมากไปน้อยอยู่ แล้ว `reverse` กลับเป็นน้อยไปมาก (ลำดับการทำงานมีผลต่อผลลัพธ์)
- Bee และ Somchai คะแนนเท่ากัน (80) จึงเรียงตามชื่อ Bee มาก่อน Somchai

---

## ข้อควรระวัง (รวม)
1. comparator ใช้ `>=` หรือ `<=` ไม่ได้ ต้องเป็น `>` หรือ `<`
2. ใช้ `*it` กับ `find` ที่ไม่เจอ (`end()`) ทำให้โปรแกรมพัง
3. `sort(v.begin(), v.end())` ใช้กับ `list` ไม่ได้ (ดูบทที่ 3)
4. ลืม `-std=c++17` ทำให้ `gcd` / `lcm` คอมไพล์ไม่ผ่านในบางคอมไพเลอร์
5. `lcm` / ผลรวมของค่าใหญ่ต้องใช้ `long long` (และ `0LL` ใน `accumulate`)
6. เขียน lcm เองต้องเป็น `a / gcd(a,b) * b` ไม่ใช่ `a * b / gcd(a,b)`
7. `unique` ต้อง `sort` ก่อน และต้องคู่กับ `erase`
8. `lower_bound` / `upper_bound` / `binary_search` ใช้ได้กับข้อมูลที่ **เรียงแล้ว** เท่านั้น
9. `v.size() - 1` ตอน `v` ว่างจะได้เลขใหญ่มาก ไม่ใช่ -1
10. `max(a, b)` ต้องเป็นชนิดเดียวกัน (`int` กับ `long long` ปนกันไม่ได้)
11. `back()`, `front()`, `pop_back()` ตอน vector ว่างทำให้โปรแกรมพัง ต้องเช็ค `empty()` ก่อน
12. `v[i]` ไม่ตรวจขอบเขต index เกิน = ค่าผิด/โปรแกรมพัง (ใช้ `at()` ตอนดีบัก)
13. ลบสมาชิกระหว่างวนลูปต้องรับค่าที่ `erase` คืนมา หรือใช้ `remove_if`
14. `remove` / `remove_if` / `unique` ต้องคู่กับ `erase` เสมอ
15. `for (int x : v)` เป็นสำเนา แก้ค่าไม่ได้ ต้องใช้ `int &x`
16. ส่ง vector ใหญ่เข้าฟังก์ชันแบบค่า (ไม่มี `&`) ทำให้ช้า ให้ใช้ `const vector<int> &`
17. ห้ามใช้ `pow` กับจำนวนเต็มใหญ่ (คืน `double` อาจคลาดเคลื่อน) ให้ใช้ `ipow` หรือ `powmod`
18. ห้ามใช้ `==` เทียบ `double` ให้ใช้ `fabs(a - b) < 1e-9`
19. `%` ของจำนวนติดลบได้เศษติดลบ ใช้ `posmod` เมื่อต้องการ 0..m-1
20. `sum / n` แบบ `int` ได้จำนวนเต็ม ต้อง `(double)sum / n`
21. ผลคูณของ `int` ต้องแปลงเป็น `long long` ก่อนคูณ `(long long)a * b`
22. `(int)x` ตัดทศนิยมทิ้ง (trunc) ไม่ใช่ปัดใกล้สุด ใช้ `round` ถ้าต้องการปัดใกล้สุด
23. ตรีโกณใช้หน่วยเรเดียน ไม่ใช่องศา

## สรุปสิ่งสำคัญ
| งาน | เครื่องมือ | เวลา |
|---|---|---|
| เรียงข้อมูล | `sort(b, e)` / `sort(b, e, cmp)` | O(n log n) |
| กลับลำดับ | `reverse(b, e)` | O(n) |
| นับ / ค้นหา | `count`, `find` | O(n) |
| ค้นหาในข้อมูลที่เรียงแล้ว | `lower_bound`, `upper_bound`, `binary_search` | O(log n) |
| ค่ามาก/น้อย | `max`, `min`, `max_element`, `min_element` | O(1) / O(n) |
| ตัวหารร่วมมาก / ตัวคูณร่วมน้อย | `gcd(a, b)`, `lcm(a, b)` | O(log n) |
| ผลรวม | `accumulate(b, e, 0LL)` | O(n) |
| ตัดค่าซ้ำ | `sort` + `unique` + `erase` | O(n log n) |
| สลับค่า | `swap(a, b)` | O(1) |

## แบบฝึกหัด
1. อ่านจำนวนเต็ม n ตัว แล้วพิมพ์ค่าที่มากที่สุด ค่าที่น้อยที่สุด และผลต่างของสองค่านั้น (ห้ามเขียนลูปหาเอง)
2. เก็บ (ชื่อ, อายุ) ของนักเรียน n คน เรียงจากอายุมากไปน้อย ถ้าอายุเท่ากันให้เรียงชื่อ
3. อ่านจำนวนเต็ม n ตัว พิมพ์ว่าเลข 7 ปรากฏกี่ครั้ง และปรากฏครั้งแรกที่ตำแหน่งใด (ไม่เจอให้พิมพ์ -1)
4. อ่านจำนวนเต็ม n ตัว พิมพ์ gcd และ lcm ของทุกตัว (ใบ้: เริ่ม `g = 0`, `l = 1` แล้วสะสม)
5. อ่านจำนวนเต็ม n ตัว พิมพ์จำนวนค่าที่ไม่ซ้ำ (ใช้ `sort` + `unique`)
6. อ่านจำนวนเต็ม n ตัว (ไม่เรียง) แล้วตอบคำถาม q ข้อว่า "ค่า x ปรากฏกี่ครั้ง" (ใบ้: `sort` ครั้งเดียว แล้วใช้ `upper_bound - lower_bound`)
7. อ่านจำนวนเต็ม n ตัว (ค่าถึง 10⁹) พิมพ์ผลรวมทั้งหมด (ระวังชนิดของผลรวม)
8. อ่านจำนวนเต็มไปเรื่อย ๆ จนกว่าจะเจอ 0 เก็บใน vector (ใช้ `push_back`) แล้วพิมพ์ย้อนกลับ
9. อ่าน vector ขนาด n แล้วลบเลขซ้ำที่ติดกันออก โดยคงลำดับเดิม (ไม่ `sort`)
10. อ่านตาราง R×C ใส่ `vector<vector<int>>` พิมพ์ผลรวมของแต่ละแถวและแต่ละคอลัมน์
11. อ่าน vector ขนาด n แล้วลบทุกตัวที่น้อยกว่าค่าเฉลี่ย (ใช้ `remove_if`)
12. แทรกค่า x ลงใน vector ที่เรียงแล้ว ให้ยังเรียงอยู่ (ใบ้: `lower_bound` + `insert`)
13. อ่านจำนวนเต็ม n พิมพ์ว่าเป็นกำลังสองสมบูรณ์หรือไม่ (n ถึง 10¹⁸)
14. อ่านจำนวนเต็ม n พิมพ์จำนวนตัวหารของ n และผลบวกของตัวหารทั้งหมด (n ถึง 10¹²)
15. อ่านจำนวนเต็ม a, b, m พิมพ์ aᵇ mod m (b ถึง 10¹⁸)
16. อ่านจำนวนเต็ม n ตัว พิมพ์ค่าเฉลี่ยทศนิยม 2 ตำแหน่ง และจำนวนที่มากกว่าค่าเฉลี่ย
17. มี n คนต้องแบ่งขึ้นรถที่จุ k คน ต้องใช้รถอย่างน้อยกี่คัน (ใบ้: `ceildiv`)
18. อ่านรัศมี r พิมพ์พื้นที่และเส้นรอบวงของวงกลม ทศนิยม 3 ตำแหน่ง (ใช้ `acos(-1.0)` เป็น π)

**เฉลยแนวคิดข้อ 4:** ตั้ง `g = 0`, `l = 1` แล้ววนอ่านทีละตัว `g = gcd(g, x); l = lcm(l, x);` และใช้ `long long`
**เฉลยแนวคิดข้อ 13:** `r = isqrt(n); cout << (r * r == n ? "YES" : "NO");`
**เฉลยแนวคิดข้อ 15:** `cout << powmod(a, b, m);` (m ต้องไม่เกินประมาณ 3×10⁹ เพื่อไม่ให้ผลคูณล้น)
**เฉลยแนวคิดข้อ 17:** `ceildiv(n, k)`
**เฉลยแนวคิดข้อ 12:** `v.insert(lower_bound(v.begin(), v.end(), x), x);`
**เฉลยแนวคิดข้อ 9:** เก็บผลลัพธ์ในอีก vector โดย `push_back` เฉพาะตัวที่ไม่เท่ากับ `back()` ของผลลัพธ์ (อย่าลืมเช็ค `empty()`) หรือใช้ `unique` + `erase` โดยไม่ต้อง `sort` เพราะเป็นการลบซ้ำที่ติดกัน
**เฉลยแนวคิดข้อ 6:** หลัง `sort` แล้ว จำนวนของ x = `upper_bound(x) - lower_bound(x)` แต่ละคำถามใช้เวลา O(log n)
