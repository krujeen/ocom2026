#include <bits/stdc++.h>
using namespace std;

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);

  int x = 10;
  int &r = x; //  r คือชื่อเล่นของ x (ต้องกำหนดค่าตอนประกาศเสมอ)
  r = 20;
  cout << x;  //  20
  cout << &r; //  ที่อยู่เดียวกับ &x
  int &bad;   //  error! ต้องกำหนดค่าทันที

  return 0;
}