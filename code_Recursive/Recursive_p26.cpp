#include "bits/stdc++.h"
using namespace std;

long long power_mod(long long a, long long b, long long m)
{
    if (b == 0)
        return 1 % m;
    long long h = power_mod(a, b / 2, m);
    h = h * h % m;
    if (b % 2 == 1)
        h = h * (a % m) % m;
    return h;
}

int main()
{

    long long a, b, m;
    cin >> a >> b >> m;
    cout << power_mod(a, b, m) << "\n";

    return 0;
}