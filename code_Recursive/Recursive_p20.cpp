#include "bits/stdc++.h"
using namespace std;

// ก่อนเรียก: memset(memo, -1, sizeof memo);
long long memo[100];
long long fibm(int n)
{
    if (n <= 1)
        return n;
    if (memo[n] != -1)
        return memo[n];
    return memo[n] = fibm(n - 1) + fibm(n - 2);
}

int main()
{
    memset(memo, -1, sizeof memo);

    int a;
    cin >> a;
    cout << fibm(a) << "\n";

    return 0;
}