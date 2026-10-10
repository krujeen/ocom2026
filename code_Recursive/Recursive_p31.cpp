#include <bits/stdc++.h>
using namespace std;

int max_range(int a[], int l, int r) {
  if (l == r)
    return a[l];
  int m = (l + r) / 2;
  return max(max_range(a, l, m), max_range(a, m + 1, r));
}

int main() {

  int a[] = {3, 8, 1, 9, 4};
  cout << max_range(a, 0, 4) << "\n";

  return 0;
}