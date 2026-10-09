#include <iostream>
#include <string>
using namespace std;

struct Student
{
    string name;
    int score;
};

int main()
{
    Student s = {"Jin", 85};
    Student *p = &s;

    cout << (*p).score << "\n"; // 85
    cout << p->score << "\n";   // 85 (เขียนสั้นกว่า)

    // แก้ค่าผ่าน pointer ก็ได้
    p->score = 90;
    cout << s.name << " = " << s.score << "\n"; // Jin = 90

    // pointer ไปยัง struct ที่จองด้วย new
    Student *q = new Student{"Krujeen", 100};
    cout << q->name << " = " << q->score << "\n";
    delete q;

    return 0;
}