#include <bits/stdc++.h>
using namespace std;

long long power_fast(long long a, int b) {
  if (b == 0)
    return 1;
  long long h = power_fast(a, b / 2);
  if (b % 2 == 0)
    return h * h;
  return h * h * a;
}

int main() {

  long long a;
  int b;
  cin >> a >> b;
  cout << power_fast(a, b) << "\n";

  return 0;
}