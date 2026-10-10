#include <bits/stdc++.h>
using namespace std;

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);

  // ข้อที่ 1: ชื่ออาร์เรย์ใช้แทนที่อยู่ของสมาชิกตัวแรกได้
  int arr[5] = {10, 20, 30, 40, 50};
  int *p = arr;       // เหมือน p = &arr[0];
  cout << *p << "\n"; // 10

  // ข้อที่ 2: Pointer ขยับทีละ "สมาชิก" ไม่ใช่ทีละไบต์
  cout << *(p + 1) << "\n"; // 20
  cout << *(p + 3) << "\n"; // 40

  return 0;
}