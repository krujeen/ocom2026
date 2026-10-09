#include <iostream>
using namespace std;

int main()
{

    int *p;
    *p = 10;

    int arr[5] = {1, 2, 3, 4, 5};

    for (int *q = arr; q <= arr + 5; q++)
        cout << *q << " ";

    int *a, b;
    b = &arr[0];

    return 0;
}