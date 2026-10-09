#include "bits/stdc++.h"
using namespace std;

int gcd_rec(int a, int b)
{
    if (b == 0)
        return a;
    return gcd_rec(b, a % b);
}

int main()
{
    int a, b;
    cin >> a >> b;
    cout << gcd_rec(a, b) << "\n";

    return 0;
}