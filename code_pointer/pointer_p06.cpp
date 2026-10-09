#include "bits/stdc++.h"
using namespace std;

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int x = 42;
    cout << x << "\n";  //  42
    cout << &x << "\n"; //  0x7ffd5c1a (ที่อยู่)
    int *p = &x;        //  p เก็บที่อยู่ของ x
    cout << *p << "\n"; //  42 (ไปดูค่าในช่องที่ p ชี้)
    *p = 100;           //  แก้ค่าผ่าน pointer
    cout << x << "\n";  //  100
    cout << p << "\n";  //  0x7ffd5c1a (ที่อยู่)

    return 0;
}