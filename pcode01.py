def fun(n: int):
    for i in range(n):
        print(i)
    return n - 1


def fibb(n):
    if n == 1 or n == 2:
        return 1
    return fibb(n - 1) + fibb(n - 2)



#  1 1 2 3 5 8 13 21 34 ...

for i in range(1, 20):
    print(fibb(i), end=' ')

print('\n-------------')

a = 11

while a > 0:
    print(a)
    a -= 2
    if a == 7:
        print('break')
        break
else:
    print('OK')


s = [1, '@', True, 0.2]
mat = []
for i in range(1, 4):
    t = []
    for j in range(1, 4):
        t.append((i - 1)*3 + j)
    mat.append(t)

for i in range(3):
    print(*mat[i])

for el in s:
    print(el)
