import math


PI = math.pi
OMEGA= 5.67*(10**-8)
radius_Sun = 6.957 * (10 ** 8)

Temperature_sun = 5780

Luminosity_Sun = 382.8 * (10 ** 24)


def lum(r,T):
    L=4*PI*(r**2)*OMEGA*(T**4)
    return L

ls= lum(radius_Sun,Temperature_sun)
print ls



