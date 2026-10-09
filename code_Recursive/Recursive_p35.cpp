#include "bits/stdc++.h"
using namespace std;

void hanoi(int n, char from, char to, char via)
{
    if (n == 0)
        return;
    hanoi(n - 1, from, via, to);
    cout << from << "->" << to << " ";
    hanoi(n - 1, via, to, from);
}

long long hanoi_count(int n)
{
    if (n == 0)
        return 0;
    return 2 * hanoi_count(n - 1) + 1;
}

int main()
{

    hanoi(3, 'A', 'C', 'B');
    cout << "\n";
    cout << hanoi_count(3) << "\n";
    return 0;
}