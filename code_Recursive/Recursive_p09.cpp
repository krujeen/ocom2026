#include "bits/stdc++.h"
using namespace std;

long long factorial(int n)
{
    if (n <= 1)
        return 1;                // กรณีฐาน
    return n * factorial(n - 1); // กรณีเวียนเกิด
}

int main()
{
    int n;
    cin >> n;
    cout << factorial(n) << "\n";
    return 0;
}