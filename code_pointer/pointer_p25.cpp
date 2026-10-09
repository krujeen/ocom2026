#include <iostream>
using namespace std;

int main()
{
    int n;
    cin >> n;

    int *a = new int[n](); // จองและตั้งทุกช่องเป็น 0

    // แสดงค่าก่อนรับข้อมูล เป็น 0 ทุกช่อง
    for (int i = 0; i < n; i++)
        cout << a[i] << " ";
    cout << "\n";

    for (int i = 0; i < n; i++)
        cin >> a[i];

    long long sum = 0;
    for (int i = 0; i < n; i++)
        sum += a[i];

    for (int i = 0; i < n; i++)
        cout << a[i] << " ";
    cout << "\n";
    cout << sum << "\n";

    delete[] a;  // คืนหน่วยความจำ
    a = nullptr; // กัน dangling pointer

    return 0;
}