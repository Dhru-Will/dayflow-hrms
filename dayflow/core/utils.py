import random
import string
from django.contrib.auth.models import User

def generate_temp_password():
    return "Temp@" + "".join(random.choices("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", k=4))


def generate_login_id(first_name, last_name, year, company_code="DF"):
    fn = first_name[:2].upper()
    ln = last_name[:2].upper()

    serial = User.objects.filter(
        date_joined__year=year
    ).count() + 1

    return f"{company_code}{fn}{ln}{year}{str(serial).zfill(4)}"
