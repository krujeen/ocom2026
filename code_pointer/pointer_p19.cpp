#include <bits/stdc++.h>
using namespace std;

void byValue(int x) { x = 99; }      // แก้สำเนา ตัวจริงไม่เปลี่ยน
void byPointer(int *x) { *x = 99; }  // แก้ผ่านที่อยู่
void byReference(int &x) { x = 99; } // แก้ผ่านชื่อเล่น

int main() {
  int a = 1, b = 1, c = 1;
  byValue(a);     // a = 1
  byPointer(&b);  // b = 99  (สังเกต: ต้องส่ง &b)
  byReference(c); // c = 99
  cout << "a = " << a << "\n";
  cout << "b = " << b << "\n";
  cout << "c = " << c << "\n";
  return 0;
}
