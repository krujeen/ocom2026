#include <bits/stdc++.h>
using namespace std;

int arr_sum(int a[], int i, int n) {
  if (i == n)
    return 0;
  return a[i] + arr_sum(a, i + 1, n);
}

int main() {

  int a[] = {3, 8, 1, 9, 4};
  cout << arr_sum(a, 0, 5) << "\n";

  return 0;
}