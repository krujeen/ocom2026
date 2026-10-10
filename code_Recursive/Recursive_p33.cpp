#include <bits/stdc++.h>
using namespace std;

void rev(string &s, int l, int r) {
  if (l >= r)
    return;
  swap(s[l], s[r]);
  rev(s, l + 1, r - 1);
}

bool is_pal(const string &s, int l, int r) {
  if (l >= r)
    return true;
  if (s[l] != s[r])
    return false;
  return is_pal(s, l + 1, r - 1);
}

int main() {

  string s1 = "abcdef";
  string s2 = "level";

  rev(s1, 0, 4);
  cout << s1 << "\n";
  cout << is_pal(s2, 0, 4) << "\n";

  return 0;
}