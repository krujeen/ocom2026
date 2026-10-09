#include <iostream>
#include <algorithm> // swap
using namespace std;

// กลับลำดับอาร์เรย์ด้วยสอง pointer
void reverseArr(int *l, int *r) // r ชี้ตัวสุดท้าย
{
    while (l < r)
    {
        swap(*l, *r);
        l++;
        r--;
    }
}

int main()
{
    int n;
    cin >> n;
    int *arr = new int[n];

    for (int i = 0; i < n; i++)
        cin >> arr[i];

    if (n > 0)
        reverseArr(arr, arr + n - 1);

    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << "\n";

    delete[] arr; //คืนหน่วยความจำ
    return 0;
}