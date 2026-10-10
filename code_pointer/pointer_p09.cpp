#include <bits/stdc++.h>
using namespace std;

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);

  int x = 5;
  int *p = &x;
  int **pp = &p;        //  pointer ที่ชี้ไปที่ pointer
  cout << **pp << "\n"; //  5

  return 0;
}