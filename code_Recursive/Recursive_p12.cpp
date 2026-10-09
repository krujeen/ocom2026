#include "bits/stdc++.h"
using namespace std;

void down(int n)
{ // down(3) พิมพ์ 3 2 1
    if (n == 0)
        return;
    cout << n << " ";
    down(n - 1);
}
void up(int n)
{ // up(3) พิมพ์ 1 2 3
    if (n == 0)
        return;
    up(n - 1);
    cout << n << " ";
}

int main()
{
    int n;
    cin >> n;
    down(n);
    cout << "\n";
    up(n);
    cout << "\n";
    return 0;
}