#include "bits/stdc++.h"
using namespace std;

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int a = 10, b = 20;
    int *p = &a;      //  ชี้ไปที่ a
    int *q = nullptr; //  ยังไม่ชี้ไปไหน (ปลอดภัยกว่าปล่อยว่าง)
    double d = 3.14;
    double *pd = &d; //  ชนิดของ pointer ต้องตรงกับตัวแปรที่ชี้
    p = &b;          //  เปลี่ยนไปชี้ b
    cout << *p;      //  20

    return 0;
}