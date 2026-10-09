# ใบงาน เรื่อง ฟังก์ชันเวียนบังเกิด (Recursive)

Oct 10, 2026 · @Krujeen

**ชื่อ-สกุล   เลขที่   คะแนน**  

**คำชี้แจง**

- ใบงานนี้มี 5 ตอน รวม 22 ข้อ ทำตามลำดับได้ ใช้ใบความรู้ช่วยได้
- ตอน 1–3 ตอบออนไลน์ ตอน 4–5 เขียนโค้ด C++ แล้วรันทดสอบในเครื่อง
- ทุกโค้ดในใบงานใช้ using namespace std; และ #include bits/stdc++.h>

## ตอนที่ 1 ประกอบความเข้าใจ 

**1.1** กรณีฐานของ int gcdrec(int a, int b) { ... return gcdrec(b, a % b); } คือข้อใด

- ก) if (a == 0) return b;
- ข) if (b == 0) return a;
- ค) if (a == b) return 1;
- ง) if (b == 1) return 0;

**1.2** เรียก fib(5) แบบไม่จำคำตอบ (fib(0)=0, fib(1)=1) ฟังก์ชัน fib จะถูกเรียกทั้งหมดกี่ครั้ง (รวมครั้งแรก)

- ก) 5
- ข) 8
- ค) 11
- ง) 15

**1.3** powerfast(2, 10) แบ่ง b ครึ่งทุกครั้ง สถานะลึกสุดของ call stack (นับทุกชั้นที่ยังค้างอยู่ตอน b = 0) มีกี่ชั้น

- ก) 3
- ข) 4
- ค) 5
- ง) 10

**1.4** สาเหตุหลักที่ทำให้โปรแกรม recursive เกิด stack overflow คือ

- ก) ตัวแปรชื่อยาวเกินไป
- ข) ไม่มีกรณีฐาน หรือการเรียกไม่เข้าใกล้กรณีฐาน
- ค) ใช้ long long แทน int
- ง) เขียน return หลายบรรทัด

**1.5** ทำไม tobase(int n, int b) จึงต้องเขียน cout หลัง การเรียกตัวเอง

- ก) เพราะ C++ บังคับ
- ข) เพื่อให้พิมพ์จากหลักสูงไปหลักต่ำ ซึ่งเศษที่หารได้ออกมาเป็นหลักท้ายก่อน
- ค) เพื่อประหยัดหน่วยความจำ
- ง) ไม่ต้องเขียนกรณีฐาน



## ตอน 2 trace และทำนายผล 

**2.1** sumto(4) ได้ค่าเท่าไร เมื่อ

```typescript
int sum_to(int n) 
{ 
    if (n == 0) return 0; 
    return n + sum_to(n - 1); 
}
```

**2.2** gcdrec(84, 36) ได้ค่าเท่าไร เมื่อ

```typescript
int gcd_rec(int a, int b) 
{ 
    if (b == 0) return a; 
    return gcd_rec(b, a % b); 
}
```

**2.3** powerfast(3, 5) ได้ค่าเท่าไร เมื่อ

```cpp
long long power_fast(long long a, int b) {
    if (b == 0) return 1;
    long long h = power_fast(a, b / 2);
    if (b % 2 == 0) return h * h;
    return h * h * a;
}
```

**2.4** tobase(10, 2) พิมพ์อะไรออกมา เมื่อ

```cpp
void to_base(int n, int b) {
    if (n >= b) to_base(n / b, b);
    cout << "0123456789ABCDEF"[n % b];
}
```

**2.5** เรียก f(3) พิมพ์อะไรออกมา (คั่นด้วยช่องว่าง)

```cpp
void f(int n) {
    if (n == 0) return;
    f(n - 1);
    cout << n << " ";
    f(n - 1);
}
```



## ตอน 3 หาจุดบกพร่อง 

แต่ละข้อบอกว่าผิดที่ไหน เกิดผลอะไร และแก้อย่างไร

**3.1** ต้องการผลรวม 1 ถึง n แต่เรียก sumbad(0)

```cpp
int sum_bad(int n) {
    if (n == 1) return 1;
    return n + sum_bad(n - 1);
}
```

**3.2** ต้องการ a^b แบบเร็ว ได้คำตอบถูก แต่ powerbad(2, 16) ช้า เพราะอะไร (ฟังก์ชันถูกเรียกกี่ครั้งรวม)

```cpp
long long power_bad(long long a, int b) {
    if (b == 0) return 1;
    long long h = power_bad(a, b / 2) * power_bad(a, b / 2);
    if (b % 2 == 1) h *= a;
    return h;
}
```

**3.3** ต้องการแปลง 13 เป็นฐานสอง แต่ tobasebad(13, 2) พิมพ์อะไร

```cpp
void to_base_bad(int n, int b) {
    cout << "0123456789ABCDEF"[n % b];
    if (n >= b) to_base_bad(n / b, b);
}
```

**3.4** เพิ่ม memo แล้ว แต่ main ไม่ได้เรียก memset(memo, -1, sizeof memo) ก่อน (memo เป็นตัวแปร global จึงเป็น 0 ทั้งหมด) fibm(10) ได้ค่าใด และควรได้ค่าใด

```cpp
long long memo[100];
long long fibm(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fibm(n - 1) + fibm(n - 2);
}
```



## ตอน 4 เขียนโค้ด C++ 

เขียนฟังก์ชันแบบ recursive เท่านั้น (ห้ามใช้ loop) แล้วรันทดสอบ

**4.1** int digitsum(int n) คืนผลรวมของทุกหลัก เช่น digitsum(9875) = 29

**4.2** int popcountrec(int n) นับจำนวนบิต 1 ในฐานสองของ n เช่น popcountrec(13) = 3 (13 = 1101)

**4.3** string tobasestr(int n, int b) คืนสตริงเลขฐาน b (b ไม่เกิน 16 ใช้ A–F) เช่น tobasestr(255, 16) = "FF" และ tobasestr(0, 2) = "0"

**4.4** บันได n ขั้น ก้าวได้ครั้งละ 1 หรือ 2 ขั้น เป็นไปได้กี่แบบ long long stairs(int n) (1 ≤ n ≤ 90) ใช้ memo เช่น stairs(5) = 8 และ stairs(10) = ?

**4.5** หาเลข 3 หลักท้ายของ 7^2025 ด้วย long long powermod(long long a, long long b, long long m) และบอกคำตอบที่ได้จากการรัน

**4.6** long long hanoicount(int n) คืนจำนวนครั้งที่ต้องย้ายหอยสามเหลี่ยม n แผ่น โดยไม่ต้องพิมพ์การย้าย hanoicount(20) ได้เท่าไร

## ตอน 5 ท้าทาย 

**5.1** เขียน void gen(int n, string s) ที่พิมพ์สตริงไบนารียาว n ทุกแบบเรียงจากน้อยไปมาก เช่น gen(3, "") พิมพ์ 000 001 010 ... 111 (รวม 8 สตริง) ใบ้: เติมอักษรต่อท้าย s แล้วเรียก gen(n−1, ...)

**5.2** เขียน maxrange(int a, int l, int r) หาค่าสูงสุดในช่วง l, r โดย **แบ่งช่วงครึ่ง** แล้วบอกว่า stack ลึกประมาณกี่ชั้นเมื่อ n = 1,000,000 และค่าสูงสุดของ {3, 8, 1, 9, 4} คือเท่าไร