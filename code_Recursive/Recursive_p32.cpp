#include <bits/stdc++.h>
using namespace std;

int bsearch_rec(int a[], int l, int r, int x) {
  if (l > r)
    return -1;
  int m = (l + r) / 2;
  if (a[m] == x)
    return m;
  if (a[m] < x)
    return bsearch_rec(a, m + 1, r, x);
  return bsearch_rec(a, l, m - 1, x);
}

int main() {

  int a[] = {1, 3, 5, 7, 9};
  cout << bsearch_rec(a, 0, 4, 7) << "\n";
  cout << bsearch_rec(a, 0, 4, 4) << "\n";

  return 0;
}