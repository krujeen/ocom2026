#include "bits/stdc++.h"
using namespace std;

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int arr[5] = {10, 20, 30, 40, 50};
    int n = 5;

    // ใช้ array ปกติ
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << "\n";

    // แบบที่ 1: ใช้ pointer + offset
    for (int i = 0; i < n; i++)
        cout << *(arr + i) << " ";
    cout << "\n";

    // แบบที่ 2: เลื่อน pointer ไปเรื่อย ๆ
    for (int *p = arr; p < arr + n; p++)
        cout << *p << " ";
    cout << "\n";

    // แบบที่ 3: range-based for กับ reference (แก้ค่าในอาร์เรย์ได้)
    for (int &v : arr)
        v *= 2;

    return 0;
}