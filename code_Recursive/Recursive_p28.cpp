#include <bits/stdc++.h>
using namespace std;

void to_base(int n, int b) {
  if (n >= b)
    to_base(n / b, b);
  cout << "0123456789ABCDEF"[n % b];
}

string to_base_str(int n, int b) {
  const string D = "0123456789ABCDEF";
  if (n < b)
    return string(1, D[n]);
  return to_base_str(n / b, b) + D[n % b];
}

int main() {

  int a, b;
  cin >> a >> b;
  to_base(a, b);
  cout << "\n";
  cout << to_base_str(a, b) << "\n";
  return 0;
}