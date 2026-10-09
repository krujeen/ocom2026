#include <iostream>
#include <algorithm> // min, max
using namespace std;

void minMax(int a[], int n, int &mn, int &mx)
{
    mn = mx = a[0];
    for (int i = 1; i < n; i++)
    {
        mn = min(mn, a[i]);
        mx = max(mx, a[i]);
    }
}

int main()
{
    int n;
    cin >> n;
    int *arr = new int[n];

    for (int i = 0; i < n; i++)
        cin >> arr[i];

    int lo, hi;
    minMax(arr, n, lo, hi);

    cout << lo << "\n";
    cout <<  hi << "\n";

    delete[] arr; // คืนหน่วยความจำ
    return 0;
}