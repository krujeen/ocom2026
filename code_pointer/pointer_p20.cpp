#include <iostream>
#include <vector>
using namespace std;

void fillzero(int a[], int n) {   // int a[] เท่ากับ int *a
    for (int i = 0; i < n; i++) a[i] = 0;
}

long long sum(const vector<int> &v) {
    long long total = 0;      // ใช้ long long กัน overflow
    for (int x : v) total += x;
    return total;
}

int main() {
    // ทดสอบ fillzero  ตั้งค่าอาร์เรย์เป็น 0 ทั้งหมด
    int a[5] = {7, 8, 9, 10, 11};
    fillzero(a, 5);
    for (int i = 0; i < 5; i++) cout << a[i] << " ";
    cout << "\n";

    // ทดสอบ sum  รวมค่าใน vector
    vector<int> v = {1, 2, 3, 4, 5};
    cout << sum(v) << "\n";

    return 0;
}