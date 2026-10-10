#include <bits/stdc++.h>
using namespace std;

int sum_to(int n) {
  if (n == 0)
    return 0;
  return n + sum_to(n - 1);
}

int main() {
  int n;
  cin >> n;
  cout << sum_to(n) << "\n";

  return 0;
}