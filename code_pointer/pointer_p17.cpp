#include "bits/stdc++.h"
using namespace std;

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int x, n=5;
    int arr[5] = {10, 20, 30, 40, 50};


    sort(arr, arr + n);
    // arr+n คือ pointer ชี้ "เลยตัวสุดท้าย"

    scanf("%d", &x);
    // scanf ต้องการที่อยู่ จึงต้องใส่ &

    int idx = lower_bound(arr, arr + n, 30) - arr;
    // ลบ pointer คือ pointer - pointer = ระยะห่าง = ดัชนี

    cout << idx;
    return 0;
}