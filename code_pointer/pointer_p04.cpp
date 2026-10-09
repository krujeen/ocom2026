#include "bits/stdc++.h"
using namespace std;

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int x = 42;
    char c = 'A';
    cout << sizeof(int) << "\n";       //  4 bytes
    cout << sizeof(char) << "\n";      //  1 byte
    cout << sizeof(long long) << "\n"; //  8 bytes
    cout << sizeof(double) << "\n";    //  8 bytes
    cout << sizeof(x) << "\n";         //  4 bytes

    return 0;
}